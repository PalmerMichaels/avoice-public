import assert from "node:assert/strict";
import test from "node:test";
import { CLI_DISCLAIMER, renderTriageReport, seedFeedback, triageSignal, triageSignals } from "../src/index.js";

test("seed data is synthetic and complete enough for triage", () => {
  assert.ok(seedFeedback.length >= 5);
  assert.ok(seedFeedback.every((signal) => signal.id.startsWith("VOC-")));
  assert.ok(seedFeedback.every((signal) => signal.transcript.length > 20));
});

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

test("rendered report includes clean-room and non-regulated disclaimer", () => {
  const report = renderTriageReport();

  assert.match(report, /avoice synthetic VOC triage/);
  assert.equal(report.includes(CLI_DISCLAIMER), true);
  assert.match(report, /not for regulated or production decisions/i);
});
