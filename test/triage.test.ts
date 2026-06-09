import assert from "node:assert/strict";
import test from "node:test";
import { seedFeedback } from "../src/seed.js";
import { triageSignal, triageSignals } from "../src/triage.js";

test("triage assigns critical urgency to blocked billing workflow", () => {
  const result = triageSignal(seedFeedback[0]);

  assert.equal(result.topic, "billing");
  assert.equal(result.owner, "Support");
  assert.equal(result.urgency, "critical");
  assert.ok(result.urgencyScore >= 80);
});

test("triage prioritizes enterprise performance risk above low-friction requests", () => {
  const results = triageSignals(seedFeedback);

  assert.equal(results[0].id, "VOC-003");
  assert.equal(results[0].urgency, "critical");
  assert.equal(results.at(-1)?.topic, "feature_request");
});

test("access-control language routes to security review", () => {
  const accessSignal = seedFeedback.find((signal) => signal.id === "VOC-005");
  assert.ok(accessSignal);

  const result = triageSignal(accessSignal);
  assert.equal(result.topic, "access_control");
  assert.equal(result.owner, "Security Review");
  assert.ok(result.reasons.includes("access-control concern"));
});
