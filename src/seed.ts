export type Role = "principal" | "designer" | "project_manager" | "client_reviewer" | "consultant";
export type TaskStatus = "todo" | "in_progress" | "blocked" | "review" | "done";
export type DocumentStatus = "draft" | "coordination" | "ready_for_review" | "issued";
export type IntegrationStatus = "mocked" | "synced" | "attention";

export type TeamMember = {
  id: string;
  name: string;
  role: Role;
  onboardingComplete: boolean;
};

export type ArchitectureDocument = {
  id: string;
  title: string;
  stage: "brief" | "concept" | "schematic" | "review" | "permit_packet";
  status: DocumentStatus;
  ownerId: string;
  blockers: string[];
};

export type WorkflowTask = {
  id: string;
  title: string;
  status: TaskStatus;
  ownerId: string;
  dueInDays: number;
};

export type MockIntegration = {
  id: string;
  name: string;
  status: IntegrationStatus;
  lastMockSyncHoursAgo: number;
  note: string;
};

export type ArchitectureProject = {
  id: string;
  name: string;
  workspace: string;
  client: string;
  phase: "onboarding" | "concept" | "schematic" | "coordination";
  members: TeamMember[];
  documents: ArchitectureDocument[];
  tasks: WorkflowTask[];
  integrations: MockIntegration[];
};

export const seedProjects: ArchitectureProject[] = [
  {
    id: "AV-101",
    name: "Canal House Adaptive Reuse",
    workspace: "North Loop Studio",
    client: "Fictional Canal Arts Trust",
    phase: "schematic",
    members: [
      { id: "tm-1", name: "Rina Cho", role: "principal", onboardingComplete: true },
      { id: "tm-2", name: "Mateo Ives", role: "designer", onboardingComplete: true },
      { id: "tm-3", name: "Priya Shah", role: "project_manager", onboardingComplete: true },
      { id: "tm-4", name: "Owen Bell", role: "client_reviewer", onboardingComplete: false },
      { id: "tm-5", name: "June Arroyo", role: "consultant", onboardingComplete: true }
    ],
    documents: [
      { id: "doc-1", title: "Owner Project Requirements", stage: "brief", status: "issued", ownerId: "tm-3", blockers: [] },
      { id: "doc-2", title: "Massing Options Matrix", stage: "concept", status: "ready_for_review", ownerId: "tm-2", blockers: [] },
      { id: "doc-3", title: "Code Path Narrative", stage: "schematic", status: "coordination", ownerId: "tm-1", blockers: ["egress load assumptions"] },
      { id: "doc-4", title: "Client Review Packet", stage: "review", status: "draft", ownerId: "tm-3", blockers: ["client reviewer onboarding"] }
    ],
    tasks: [
      { id: "task-1", title: "Invite client reviewer and confirm review lane", status: "blocked", ownerId: "tm-3", dueInDays: 1 },
      { id: "task-2", title: "Resolve egress load assumption note", status: "in_progress", ownerId: "tm-1", dueInDays: 2 },
      { id: "task-3", title: "Prepare massing option comparison", status: "review", ownerId: "tm-2", dueInDays: 3 },
      { id: "task-4", title: "Archive issued brief in workspace library", status: "done", ownerId: "tm-5", dueInDays: -1 }
    ],
    integrations: [
      { id: "int-1", name: "Mock BIM Issue Board", status: "synced", lastMockSyncHoursAgo: 2, note: "4 fictional coordination comments mirrored" },
      { id: "int-2", name: "Mock Document Vault", status: "attention", lastMockSyncHoursAgo: 18, note: "review packet missing client access tag" },
      { id: "int-3", name: "Mock Calendar", status: "mocked", lastMockSyncHoursAgo: 5, note: "schematic review hold generated locally" }
    ]
  },
  {
    id: "AV-202",
    name: "Harbor Library Micro-Branch",
    workspace: "Civic Interiors Lab",
    client: "Imaginary Harbor District",
    phase: "concept",
    members: [
      { id: "tm-6", name: "Ada Finch", role: "principal", onboardingComplete: true },
      { id: "tm-7", name: "Noel Park", role: "designer", onboardingComplete: true },
      { id: "tm-8", name: "Samir Wynn", role: "project_manager", onboardingComplete: true },
      { id: "tm-9", name: "Lena Moss", role: "client_reviewer", onboardingComplete: true }
    ],
    documents: [
      { id: "doc-5", title: "Community Program Brief", stage: "brief", status: "issued", ownerId: "tm-8", blockers: [] },
      { id: "doc-6", title: "Furniture Kit Workflow", stage: "concept", status: "ready_for_review", ownerId: "tm-7", blockers: [] },
      { id: "doc-7", title: "Accessibility Checklist", stage: "schematic", status: "draft", ownerId: "tm-6", blockers: [] }
    ],
    tasks: [
      { id: "task-5", title: "Route furniture kit to client review", status: "review", ownerId: "tm-8", dueInDays: 2 },
      { id: "task-6", title: "Confirm mock accessibility comments", status: "todo", ownerId: "tm-6", dueInDays: 5 },
      { id: "task-7", title: "Publish concept board snapshot", status: "in_progress", ownerId: "tm-7", dueInDays: 1 }
    ],
    integrations: [
      { id: "int-4", name: "Mock Rendering Queue", status: "synced", lastMockSyncHoursAgo: 1, note: "2 synthetic views queued" },
      { id: "int-5", name: "Mock Client Portal", status: "synced", lastMockSyncHoursAgo: 3, note: "review link generated locally" }
    ]
  }
];
