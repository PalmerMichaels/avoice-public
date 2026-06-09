import assert from "node:assert/strict";
import test from "node:test";
import { seedFeedback, triageSignal } from "../src/index.js";

test("access-control language routes to security review", () => {
  const accessSignal = seedFeedback.find((signal) => signal.id === "VOC-005");
  assert.ok(accessSignal);

  const result = triageSignal(accessSignal);
  assert.equal(result.topic, "access_control");
  assert.equal(result.owner, "Security Review");
  assert.ok(result.reasons.includes("access-control concern"));
});
