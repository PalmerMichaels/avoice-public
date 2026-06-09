# avoice

`avoice` is a clean-room TypeScript CLI that routes a synthetic voice-support queue to synthetic agents. It is intended as a small public demo/tool for deterministic queue-priority experiments.

## Requirements

- Node.js 22 or newer
- No runtime npm dependencies

## Usage

Run the CLI:

```sh
npm start
```

Run tests:

```sh
npm test
```

Run validation checks:

```sh
npm run validate
```

## What It Does

- Scores synthetic callers by wait time, account tier, and sentiment.
- Assigns callers to synthetic agents with matching skills and remaining capacity.
- Prints a deterministic routing summary for local inspection.

## Synthetic Data Statement

All queue entries, caller names, agent names, skills, tiers, and routing examples are synthetic seed data created for this repository. They do not represent real callers, customers, agents, companies, or operational data.

## Clean-Room Disclaimer

This implementation is original clean-room code. It does not use proprietary materials, private product behavior, confidential datasets, or non-public implementation details from any company or project.

## Non-Regulated Disclaimer

This tool is a local demonstration utility only. It does not provide medical, legal, financial, emergency, telecommunications compliance, staffing, labor, or other regulated advice.

## No-Affiliation Statement

This repository is not affiliated with, endorsed by, sponsored by, or officially connected to any company, product, accelerator, or organization with a similar name.
