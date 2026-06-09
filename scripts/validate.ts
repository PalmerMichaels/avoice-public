import assert from "node:assert/strict";

import { syntheticAgents, syntheticQueue } from "../src/data.ts";
import { routeQueue } from "../src/router.ts";

const queueIds = new Set(syntheticQueue.map((item) => item.id));
const agentIds = new Set(syntheticAgents.map((agent) => agent.id));

assert.equal(queueIds.size, syntheticQueue.length, "queue IDs must be unique");
assert.equal(agentIds.size, syntheticAgents.length, "agent IDs must be unique");
assert.ok(syntheticQueue.length >= 5, "seed queue should include at least five synthetic callers");
assert.ok(syntheticAgents.length >= 3, "seed agents should include at least three synthetic agents");

for (const item of syntheticQueue) {
  assert.ok(item.minutesWaiting >= 0, `${item.id} has invalid wait time`);
  assert.ok(item.callerName.trim().length > 0, `${item.id} must have a synthetic caller name`);
}

for (const agent of syntheticAgents) {
  assert.ok(agent.maxLoad > 0, `${agent.id} must have positive capacity`);
  assert.ok(agent.activeCalls <= agent.maxLoad, `${agent.id} active calls exceed capacity`);
  assert.ok(agent.skills.length > 0, `${agent.id} must have at least one skill`);
}

const decisions = routeQueue(syntheticQueue, syntheticAgents);
assert.equal(decisions.length, syntheticQueue.length, "every queue item must produce a decision");

console.log("Validation passed: synthetic seed data and routing decisions are consistent.");
