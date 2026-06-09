import assert from "node:assert/strict";
import { test } from "node:test";

import { syntheticAgents, syntheticQueue } from "../src/data.ts";
import { routeQueue, scoreQueueItem, summarizeRoutes } from "../src/router.ts";

test("scores queue items from wait time, tier, and sentiment", () => {
  assert.equal(scoreQueueItem(syntheticQueue[0]), 29);
  assert.equal(scoreQueueItem(syntheticQueue[4]), 4);
});

test("routes higher priority items first", () => {
  const decisions = routeQueue(syntheticQueue, syntheticAgents);
  assert.deepEqual(
    decisions.map((decision) => decision.queueId),
    ["q-1001", "q-1004", "q-1003", "q-1002", "q-1005"]
  );
});

test("keeps assignments within agent capacity", () => {
  const decisions = routeQueue(syntheticQueue, syntheticAgents);
  const assignmentCounts = new Map<string, number>();

  for (const decision of decisions) {
    if (decision.agentId) {
      assignmentCounts.set(decision.agentId, (assignmentCounts.get(decision.agentId) ?? 0) + 1);
    }
  }

  for (const agent of syntheticAgents) {
    const newAssignments = assignmentCounts.get(agent.id) ?? 0;
    assert.ok(agent.activeCalls + newAssignments <= agent.maxLoad, `${agent.id} exceeded capacity`);
  }
});

test("renders a readable routing summary", () => {
  const summary = summarizeRoutes(routeQueue(syntheticQueue, syntheticAgents));
  assert.match(summary, /Synthetic queue routing plan/);
  assert.match(summary, /Priority \| Queue \| Caller \| Intent \| Assignment/);
});
