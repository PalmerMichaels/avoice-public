export type FeedbackChannel = "call" | "chat";

export type FeedbackSignal = {
  id: string;
  channel: FeedbackChannel;
  customer: string;
  segment: "starter" | "growth" | "enterprise";
  transcript: string;
  minutesAgo: number;
};

export const seedFeedback: FeedbackSignal[] = [
  {
    id: "VOC-001",
    channel: "call",
    customer: "Northstar Bakery Collective",
    segment: "growth",
    transcript:
      "Our checkout export failed twice today and the finance team says invoices are blocked. We need a workaround before tomorrow morning.",
    minutesAgo: 38
  },
  {
    id: "VOC-002",
    channel: "chat",
    customer: "Lumen Field Studio",
    segment: "starter",
    transcript:
      "The onboarding guide is confusing around team invites. I eventually figured it out, but the copy could be clearer.",
    minutesAgo: 145
  },
  {
    id: "VOC-003",
    channel: "call",
    customer: "Cedar Fleet Labs",
    segment: "enterprise",
    transcript:
      "Latency spikes keep interrupting dispatch reviews. If this is not fixed this week our rollout owner will pause expansion.",
    minutesAgo: 12
  },
  {
    id: "VOC-004",
    channel: "chat",
    customer: "Paper Kite Health Foods",
    segment: "growth",
    transcript:
      "We love the weekly digest. Could you add a simple way to filter feedback by region and product line?",
    minutesAgo: 260
  },
  {
    id: "VOC-005",
    channel: "call",
    customer: "Harborline Supply",
    segment: "enterprise",
    transcript:
      "A permissions bug let a manager see another team's notes. No sensitive data was present in this synthetic scenario, but access controls need review.",
    minutesAgo: 64
  }
];
