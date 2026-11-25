# Portuguese Learning App

A microlearning-first European Portuguese (`pt-PT`) practice app for iOS and web, built around short listening, phrase, vocabulary, sentence, and response activities.

The project is building its first complete microlearning activity. Read these files before contributing:

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
npm run check
```

Or run checks individually:

```bash
npm run lint
npm run typecheck
npm test
npm run export:web
```

Feature work belongs on focused `codex/<type>-<short-name>` branches. Do not merge into `main` until the feature is complete, checks pass, and the user approves it.
