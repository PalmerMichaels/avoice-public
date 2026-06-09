import assert from "node:assert/strict";
import test from "node:test";
import { seedProjects } from "../src/seed.js";
import { buildWorkspaceSummaries, buildWorkspaceSummary } from "../src/triage.js";

test("workspace summary captures onboarding and document screens", () => {
  const result = buildWorkspaceSummary(seedProjects[0]);

  assert.equal(result.projectId, "AV-101");
  assert.equal(result.onboardingPercent, 80);
  assert.ok(result.documentScreens.some((screen) => screen.lane === "client_review"));
  assert.ok(result.nextActions.some((action) => action.includes("Unblock task")));
});

test("summaries sort least-ready architecture workspace first", () => {
  const results = buildWorkspaceSummaries(seedProjects);

  assert.equal(results[0].projectId, "AV-101");
  assert.ok(results[0].readinessScore < results[1].readinessScore);
});

test("mocked integrations needing attention become next actions", () => {
  const result = buildWorkspaceSummary(seedProjects[0]);

  assert.ok(result.integrationHealth.some((integration) => integration.needsAttention));
  assert.ok(result.nextActions.some((action) => action.includes("Mock Document Vault")));
});
