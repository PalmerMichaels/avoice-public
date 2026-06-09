#!/usr/bin/env node
import { seedProjects } from "./seed.js";
import { buildWorkspaceSummaries } from "./workflow.js";

export { seedProjects } from "./seed.js";
export type { ArchitectureDocument, ArchitectureProject, MockIntegration, Role, TeamMember, WorkflowTask } from "./seed.js";
export { buildWorkspaceSummaries, buildWorkspaceSummary } from "./workflow.js";
export type { DocumentScreen, IntegrationHealth, TaskFlowItem, WorkflowLane, WorkspaceSummary } from "./workflow.js";

export const CLI_DISCLAIMER =
  "Clean-room synthetic architecture workflow demo: not affiliated with any real company, accelerator, or YC; not architecture, engineering, legal, permitting, safety, or professional advice.";

export function renderArchitectureWorkflowReport(): string {
  const summaries = buildWorkspaceSummaries(seedProjects);
  const lines = ["avoice synthetic architecture workflow studio", CLI_DISCLAIMER, ""];

  for (const summary of summaries) {
    lines.push(
      `${summary.projectId} | ${summary.projectName}`,
      `Workspace: ${summary.workspace} | Synthetic client: ${summary.client}`,
      `Onboarding: ${summary.onboardingPercent}% | Readiness: ${summary.readinessScore}/100`,
      `Role coverage: principal ${summary.roleCoverage.principal}, designer ${summary.roleCoverage.designer}, PM ${summary.roleCoverage.project_manager}, client reviewer ${summary.roleCoverage.client_reviewer}, consultant ${summary.roleCoverage.consultant}`,
      "Document workflow screens:"
    );

    for (const document of summary.documentScreens) {
      lines.push(
        `- ${document.title} [${document.stage}/${document.status}] lane=${document.lane} owner=${document.ownerName}${document.blockers.length > 0 ? ` blockers=${document.blockers.join(", ")}` : ""}`
      );
    }

    lines.push("Role/task/status flow:");
    for (const task of summary.taskFlow) {
      lines.push(`- ${task.title} [${task.status}] lane=${task.lane} risk=${task.risk} owner=${task.ownerName} due=${task.dueInDays}d`);
    }

    lines.push("Mocked integrations:");
    for (const integration of summary.integrationHealth) {
      lines.push(
        `- ${integration.name} [${integration.status}] lastMockSync=${integration.lastMockSyncHoursAgo}h attention=${integration.needsAttention ? "yes" : "no"} note=${integration.note}`
      );
    }

    lines.push(
      "Next actions:",
      ...summary.nextActions.map((action) => `- ${action}`),
      ""
    );
  }

  return lines.join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(renderArchitectureWorkflowReport());
}
