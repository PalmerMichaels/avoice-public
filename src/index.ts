#!/usr/bin/env node
import { seedFeedback } from "./seed.js";
import { triageSignals } from "./triage.js";

export { seedFeedback } from "./seed.js";
export type { FeedbackChannel, FeedbackSignal } from "./seed.js";
export { triageSignal, triageSignals } from "./triage.js";
export type { Owner, Topic, TriagedSignal, Urgency } from "./triage.js";

export const CLI_DISCLAIMER =
  "Clean-room synthetic demo: not affiliated with any real company, accelerator, or YC; not for regulated or production decisions.";

export function renderTriageReport(): string {
  const triaged = triageSignals(seedFeedback);
  const lines = ["avoice synthetic VOC triage", CLI_DISCLAIMER, ""];

  for (const signal of triaged) {
    lines.push(
      `${signal.id} | ${signal.urgency.toUpperCase()} ${signal.urgencyScore}/100 | ${signal.topic} | owner: ${signal.owner}`,
      `Customer: ${signal.customer} (${signal.segment}, ${signal.channel}, ${signal.minutesAgo}m ago)`,
      `Signal: ${signal.transcript}`,
      `Reasons: ${signal.reasons.join(", ") || "baseline signal"}`,
      ""
    );
  }

  return lines.join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(renderTriageReport());
}
