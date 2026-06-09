export type Intent = "billing" | "setup" | "quality" | "retention" | "general";

export type QueueItem = {
  id: string;
  callerName: string;
  intent: Intent;
  sentiment: "calm" | "uncertain" | "frustrated";
  minutesWaiting: number;
  accountTier: "starter" | "growth" | "enterprise";
};

export type Agent = {
  id: string;
  displayName: string;
  skills: Intent[];
  maxLoad: number;
  activeCalls: number;
};

export const syntheticQueue: QueueItem[] = [
  {
    id: "q-1001",
    callerName: "River Finch",
    intent: "quality",
    sentiment: "frustrated",
    minutesWaiting: 18,
    accountTier: "growth"
  },
  {
    id: "q-1002",
    callerName: "Morgan Vale",
    intent: "setup",
    sentiment: "uncertain",
    minutesWaiting: 9,
    accountTier: "starter"
  },
  {
    id: "q-1003",
    callerName: "Ari Chen",
    intent: "retention",
    sentiment: "calm",
    minutesWaiting: 12,
    accountTier: "enterprise"
  },
  {
    id: "q-1004",
    callerName: "Samira Holt",
    intent: "billing",
    sentiment: "frustrated",
    minutesWaiting: 6,
    accountTier: "enterprise"
  },
  {
    id: "q-1005",
    callerName: "Noah Park",
    intent: "general",
    sentiment: "calm",
    minutesWaiting: 4,
    accountTier: "starter"
  }
];

export const syntheticAgents: Agent[] = [
  {
    id: "a-201",
    displayName: "Lin Support",
    skills: ["billing", "retention", "general"],
    maxLoad: 3,
    activeCalls: 1
  },
  {
    id: "a-202",
    displayName: "Kai Onboarding",
    skills: ["setup", "quality", "general"],
    maxLoad: 2,
    activeCalls: 1
  },
  {
    id: "a-203",
    displayName: "Mina Escalations",
    skills: ["quality", "retention", "billing"],
    maxLoad: 2,
    activeCalls: 0
  }
];
