import assert from "node:assert/strict";
import test from "node:test";
import { CLI_DISCLAIMER, buildWorkspaceSummary, renderArchitectureWorkflowReport, seedProjects } from "../src/index.js";

test("seed data is synthetic and complete enough for architecture workflows", () => {
  assert.ok(seedProjects.length >= 2);
  assert.ok(seedProjects.every((project) => project.id.startsWith("AV-")));
  assert.ok(seedProjects.every((project) => project.documents.length >= 3));
  assert.ok(seedProjects.every((project) => project.tasks.length >= 3));
});

test("role coverage includes architecture workflow roles", () => {
  const result = buildWorkspaceSummary(seedProjects[0]);

  assert.equal(result.roleCoverage.principal, 1);
  assert.equal(result.roleCoverage.designer, 1);
  assert.equal(result.roleCoverage.project_manager, 1);
  assert.equal(result.roleCoverage.client_reviewer, 1);
});

test("rendered report includes clean-room and non-regulated disclaimer", () => {
  const report = renderArchitectureWorkflowReport();

  assert.match(report, /avoice synthetic architecture workflow studio/);
  assert.equal(report.includes(CLI_DISCLAIMER), true);
  assert.match(report, /not architecture, engineering, legal, permitting, safety, or professional advice/i);
  assert.match(report, /Mocked integrations/);
});
