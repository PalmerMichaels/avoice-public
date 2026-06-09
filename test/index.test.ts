import assert from "node:assert/strict";
import test from "node:test";
import { renderArchitectureWorkflowReport, seedProjects } from "../src/index.js";

test("CLI report shows onboarding, workflow screens, tasks, and mocked integrations", () => {
  const report = renderArchitectureWorkflowReport();

  assert.match(report, /Onboarding: 80%/);
  assert.match(report, /Document workflow screens:/);
  assert.match(report, /Role\/task\/status flow:/);
  assert.match(report, /Mock BIM Issue Board/);
  assert.equal(seedProjects.every((project) => !project.client.includes("Avoice")), true);
});
