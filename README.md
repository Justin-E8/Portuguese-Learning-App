# Portuguese Learning App

A listening-first European Portuguese (`pt-PT`) conversation rehearsal app for iOS and web.

The project is in its foundation phase. Read these files before contributing:

- `AGENTS.md`
- `docs/PRODUCT.md`
- `docs/ARCHITECTURE.md`
- `docs/STATUS.md`
- `docs/WORKFLOW.md`

## Local Development

Requirements:

- Node.js and npm
- Xcode for the iOS Simulator and local iOS builds

Install dependencies and start Expo:

```bash
npm install
npm start
```

Run the web app directly:

```bash
npm run web
```

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run export:web
```

Feature work belongs on focused `codex/<type>-<short-name>` branches. Do not merge into `main` until the feature is complete, checks pass, and the user approves it.
