# avoice

`avoice` is a lightweight TypeScript CLI that demonstrates a clean-room architecture workflow studio. It walks through fictional onboarding, workspace/project setup, architectural document screens, role/task/status flows, and mocked integrations using synthetic data.

## Clean-Room Disclaimer

This is an original clean-room public demo. It is not affiliated with any real company, accelerator, or YC. All projects, clients, names, documents, tasks, and integration states are synthetic and fictional.

Do not use this tool for real architecture, engineering, construction, permitting, safety, legal, procurement, compliance, financial, or professional-services decisions. The readiness rules are simple deterministic heuristics intended for local demonstration only.

## What It Does

- Reads local synthetic architecture project data from `src/seed.ts`.
- Shows onboarding progress for fictional workspace members and client reviewers.
- Builds workspace/project setup summaries with role coverage and readiness scoring.
- Renders architectural document workflow screens for briefs, concepts, schematic notes, review packets, and permit-style packages.
- Tracks role/task/status flow across blocked, in-progress, review, and complete work.
- Reports mocked integrations such as a local issue board, document vault, calendar, rendering queue, and client portal.
- Prints clean-room and non-regulated-use disclaimers in CLI output.

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
avoice synthetic architecture workflow studio
Clean-room synthetic architecture workflow demo: not affiliated with any real company, accelerator, or YC; not architecture, engineering, legal, permitting, safety, or professional advice.

AV-101 | Canal House Adaptive Reuse
Workspace: North Loop Studio | Synthetic client: Fictional Canal Arts Trust
Onboarding: 80% | Readiness: 46/100
Document workflow screens:
- Code Path Narrative [schematic/coordination] lane=documents owner=Rina Cho blockers=egress load assumptions
```

## Validation

The test suite uses TypeScript compilation plus Node's built-in test runner:

```bash
npm test
```

No credentials, external APIs, scraped data, or network services are required.
