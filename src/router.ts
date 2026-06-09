import type { Agent, QueueItem } from "./data.ts";

export type RouteDecision = {
  queueId: string;
  callerName: string;
  intent: string;
  priority: number;
  agentId: string | null;
  agentName: string | null;
  reason: string;
};

const tierBoost = {
  starter: 0,
  growth: 4,
  enterprise: 8
} as const;

const sentimentBoost = {
  calm: 0,
  uncertain: 3,
  frustrated: 7
} as const;

export function scoreQueueItem(item: QueueItem): number {
  return item.minutesWaiting + tierBoost[item.accountTier] + sentimentBoost[item.sentiment];
}

export function routeQueue(queue: QueueItem[], agents: Agent[]): RouteDecision[] {
  const loads = new Map(agents.map((agent) => [agent.id, agent.activeCalls]));
  const orderedQueue = [...queue].sort((left, right) => {
    const scoreDiff = scoreQueueItem(right) - scoreQueueItem(left);
    return scoreDiff || left.id.localeCompare(right.id);
  });

  return orderedQueue.map((item) => {
    const priority = scoreQueueItem(item);
    const eligibleAgents = agents
      .filter((agent) => agent.skills.includes(item.intent) && (loads.get(agent.id) ?? 0) < agent.maxLoad)
      .sort((left, right) => {
        const loadDiff = (loads.get(left.id) ?? 0) - (loads.get(right.id) ?? 0);
        return loadDiff || left.displayName.localeCompare(right.displayName);
      });

    const selected = eligibleAgents[0];
    if (!selected) {
      return {
        queueId: item.id,
        callerName: item.callerName,
        intent: item.intent,
        priority,
        agentId: null,
        agentName: null,
        reason: `No available synthetic agent has capacity for ${item.intent}`
      };
    }

    loads.set(selected.id, (loads.get(selected.id) ?? 0) + 1);

    return {
      queueId: item.id,
      callerName: item.callerName,
      intent: item.intent,
      priority,
      agentId: selected.id,
      agentName: selected.displayName,
      reason: `Matched ${item.intent} intent to lowest-load skilled synthetic agent`
    };
  });
}

export function summarizeRoutes(decisions: RouteDecision[]): string {
  const assigned = decisions.filter((decision) => decision.agentId !== null).length;
  const held = decisions.length - assigned;
  const lines = [
    `Synthetic queue routing plan: ${assigned} assigned, ${held} held`,
    "",
    "Priority | Queue | Caller | Intent | Assignment",
    "--- | --- | --- | --- | ---"
  ];

  for (const decision of decisions) {
    const assignment = decision.agentName ?? "Hold for capacity";
    lines.push(`${decision.priority} | ${decision.queueId} | ${decision.callerName} | ${decision.intent} | ${assignment}`);
  }

  return lines.join("\n");
}
