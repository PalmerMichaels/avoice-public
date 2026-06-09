import type { ArchitectureDocument, ArchitectureProject, MockIntegration, Role, WorkflowTask } from "./seed.js";

export type WorkflowLane = "onboarding" | "documents" | "coordination" | "client_review" | "integrations";

export type WorkspaceSummary = {
  projectId: string;
  projectName: string;
  workspace: string;
  client: string;
  onboardingPercent: number;
  readinessScore: number;
  roleCoverage: Record<Role, number>;
  documentScreens: DocumentScreen[];
  taskFlow: TaskFlowItem[];
  integrationHealth: IntegrationHealth[];
  nextActions: string[];
};

export type DocumentScreen = ArchitectureDocument & {
  ownerName: string;
  lane: WorkflowLane;
  ready: boolean;
};

export type TaskFlowItem = WorkflowTask & {
  ownerName: string;
  lane: WorkflowLane;
  risk: "blocked" | "due_now" | "watch" | "normal" | "complete";
};

export type IntegrationHealth = MockIntegration & {
  lane: WorkflowLane;
  needsAttention: boolean;
};

export function buildWorkspaceSummaries(projects: ArchitectureProject[]): WorkspaceSummary[] {
  return projects.map(buildWorkspaceSummary).sort((left, right) => left.readinessScore - right.readinessScore);
}

export function buildWorkspaceSummary(project: ArchitectureProject): WorkspaceSummary {
  const memberById = new Map(project.members.map((member) => [member.id, member]));
  const documentScreens = project.documents.map((document) => ({
    ...document,
    ownerName: memberById.get(document.ownerId)?.name ?? "Unassigned",
    lane: document.status === "ready_for_review" ? "client_review" : "documents",
    ready: document.status === "ready_for_review" || document.status === "issued"
  } satisfies DocumentScreen));
  const taskFlow = project.tasks.map((task) => ({
    ...task,
    ownerName: memberById.get(task.ownerId)?.name ?? "Unassigned",
    lane: laneForTask(task),
    risk: riskForTask(task)
  } satisfies TaskFlowItem));
  const integrationHealth = project.integrations.map((integration) => ({
    ...integration,
    lane: "integrations" as const,
    needsAttention: integration.status === "attention" || integration.lastMockSyncHoursAgo > 12
  }));
  const onboardingPercent = Math.round(
    (project.members.filter((member) => member.onboardingComplete).length / project.members.length) * 100
  );
  const readinessScore = scoreReadiness(onboardingPercent, documentScreens, taskFlow, integrationHealth);

  return {
    projectId: project.id,
    projectName: project.name,
    workspace: project.workspace,
    client: project.client,
    onboardingPercent,
    readinessScore,
    roleCoverage: countRoles(project.members.map((member) => member.role)),
    documentScreens,
    taskFlow,
    integrationHealth,
    nextActions: nextActions(documentScreens, taskFlow, integrationHealth)
  };
}

function laneForTask(task: WorkflowTask): WorkflowLane {
  if (task.title.toLowerCase().includes("client")) return "client_review";
  if (task.status === "blocked") return "coordination";
  if (task.status === "done") return "documents";
  return "coordination";
}

function riskForTask(task: WorkflowTask): TaskFlowItem["risk"] {
  if (task.status === "done") return "complete";
  if (task.status === "blocked") return "blocked";
  if (task.dueInDays <= 1) return "due_now";
  if (task.dueInDays <= 3) return "watch";
  return "normal";
}

function scoreReadiness(
  onboardingPercent: number,
  documents: DocumentScreen[],
  tasks: TaskFlowItem[],
  integrations: IntegrationHealth[]
): number {
  const readyDocuments = documents.filter((document) => document.ready).length / documents.length;
  const completedTasks = tasks.filter((task) => task.status === "done" || task.status === "review").length / tasks.length;
  const healthyIntegrations = integrations.filter((integration) => !integration.needsAttention).length / integrations.length;
  const blockers = documents.reduce((sum, document) => sum + document.blockers.length, 0) + tasks.filter((task) => task.risk === "blocked").length;
  const weighted = onboardingPercent * 0.25 + readyDocuments * 30 + completedTasks * 25 + healthyIntegrations * 20 - blockers * 5;
  return Math.max(0, Math.min(100, Math.round(weighted)));
}

function countRoles(roles: Role[]): Record<Role, number> {
  return roles.reduce<Record<Role, number>>(
    (coverage, role) => ({ ...coverage, [role]: coverage[role] + 1 }),
    { principal: 0, designer: 0, project_manager: 0, client_reviewer: 0, consultant: 0 }
  );
}

function nextActions(documents: DocumentScreen[], tasks: TaskFlowItem[], integrations: IntegrationHealth[]): string[] {
  const actions: string[] = [];
  const blockedTask = tasks.find((task) => task.risk === "blocked");
  const blockedDocument = documents.find((document) => document.blockers.length > 0);
  const staleIntegration = integrations.find((integration) => integration.needsAttention);

  if (blockedTask) actions.push(`Unblock task: ${blockedTask.title} (${blockedTask.ownerName})`);
  if (blockedDocument) actions.push(`Resolve document blocker: ${blockedDocument.title} - ${blockedDocument.blockers.join(", ")}`);
  if (staleIntegration) actions.push(`Review mocked integration: ${staleIntegration.name} - ${staleIntegration.note}`);

  return actions.length > 0 ? actions : ["Move reviewed architecture workflow items into issued package"];
}
