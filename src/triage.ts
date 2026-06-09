import type { FeedbackSignal } from "./seed.js";

export type Topic = "billing" | "onboarding" | "performance" | "feature_request" | "access_control" | "general";
export type Owner = "Support" | "Customer Success" | "Product" | "Engineering" | "Security Review";
export type Urgency = "critical" | "high" | "medium" | "low";

export type TriagedSignal = FeedbackSignal & {
  topic: Topic;
  owner: Owner;
  urgency: Urgency;
  urgencyScore: number;
  reasons: string[];
};

const topicRules: Array<{ topic: Topic; owner: Owner; terms: string[] }> = [
  { topic: "access_control", owner: "Security Review", terms: ["permissions", "access", "sensitive", "control"] },
  { topic: "billing", owner: "Support", terms: ["invoice", "checkout", "finance", "billing", "export"] },
  { topic: "performance", owner: "Engineering", terms: ["latency", "spike", "interrupt", "slow", "failed", "bug"] },
  { topic: "onboarding", owner: "Customer Success", terms: ["onboarding", "guide", "invite", "copy", "confusing"] },
  { topic: "feature_request", owner: "Product", terms: ["could you", "add", "filter", "request", "love"] }
];

const urgencyTerms: Array<{ terms: string[]; score: number; reason: string }> = [
  { terms: ["blocked", "failed", "bug", "not fixed", "pause"], score: 35, reason: "business workflow at risk" },
  { terms: ["tomorrow", "today", "this week", "morning"], score: 20, reason: "time-sensitive language" },
  { terms: ["permissions", "access", "sensitive"], score: 25, reason: "access-control concern" },
  { terms: ["confusing", "unclear"], score: 10, reason: "friction signal" },
  { terms: ["love", "could you", "filter"], score: 5, reason: "enhancement opportunity" }
];

export function triageSignals(signals: FeedbackSignal[]): TriagedSignal[] {
  return signals.map(triageSignal).sort((left, right) => right.urgencyScore - left.urgencyScore);
}

export function triageSignal(signal: FeedbackSignal): TriagedSignal {
  const text = signal.transcript.toLowerCase();
  const matchedTopic = topicRules.find((rule) => rule.terms.some((term) => text.includes(term)));
  const reasons: string[] = [];
  let score = 20;

  for (const rule of urgencyTerms) {
    if (rule.terms.some((term) => text.includes(term))) {
      score += rule.score;
      reasons.push(rule.reason);
    }
  }

  if (signal.channel === "call") {
    score += 8;
    reasons.push("live call escalation");
  }

  if (signal.segment === "enterprise") {
    score += 12;
    reasons.push("enterprise segment impact");
  }

  if (signal.minutesAgo <= 60) {
    score += 10;
    reasons.push("fresh signal");
  }

  const urgencyScore = Math.min(score, 100);

  return {
    ...signal,
    topic: matchedTopic?.topic ?? "general",
    owner: matchedTopic?.owner ?? "Customer Success",
    urgency: toUrgency(urgencyScore),
    urgencyScore,
    reasons: [...new Set(reasons)]
  };
}

function toUrgency(score: number): Urgency {
  if (score >= 80) return "critical";
  if (score >= 60) return "high";
  if (score >= 35) return "medium";
  return "low";
}
