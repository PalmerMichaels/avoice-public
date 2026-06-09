# avoice

`avoice` is a lightweight TypeScript CLI that triages synthetic voice-of-customer call and chat feedback. It scores fictional feedback by urgency, identifies a topic, and suggests a follow-up owner.

## Clean-Room Disclaimer

This is an original clean-room public demo. It is not affiliated with any real company, accelerator, or YC. All feedback entries are synthetic and fictional.

Do not use this tool for regulated, production, legal, medical, financial, safety-critical, or employment decisions. The scoring rules are simple deterministic heuristics intended for local demonstration only.

## What It Does

- Reads local synthetic seed feedback from `src/seed.ts`.
- Scores each signal from 0 to 100 based on urgency cues, recency, segment, and channel.
- Assigns a topic such as `billing`, `performance`, `onboarding`, `feature_request`, or `access_control`.
- Suggests a follow-up owner such as `Support`, `Engineering`, `Product`, `Customer Success`, or `Security Review`.
- Prints a clean-room and non-regulated-use disclaimer in CLI output.

## Requirements

- Node.js 20 or newer recommended.
- npm.

## Run Locally

```bash
npm install
npm start
```

## Scripts

```bash
npm run build
npm test
npm run validate
```

## Example Output

```text
avoice synthetic VOC triage
Clean-room synthetic demo: not affiliated with any real company, accelerator, or YC; not for regulated or production decisions.

VOC-003 | CRITICAL 100/100 | performance | owner: Engineering
Customer: Cedar Fleet Labs (enterprise, call, 12m ago)
Signal: Latency spikes keep interrupting dispatch reviews...
Reasons: business workflow at risk, time-sensitive language, live call escalation, enterprise segment impact, fresh signal
```

## Validation

The test suite uses TypeScript compilation plus Node's built-in test runner:

```bash
npm test
```

No credentials, external APIs, scraped data, or network services are required.
