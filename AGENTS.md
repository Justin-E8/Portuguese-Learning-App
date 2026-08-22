# Project Instructions

These instructions apply to every change in this repository.

## Read Before Changing Code

1. Read `docs/PRODUCT.md` for product intent and scope.
2. Read `docs/ARCHITECTURE.md` for technical boundaries.
3. Read `docs/STATUS.md` for the current state and known blockers.
4. Read the relevant file in `docs/features/` when one exists.
5. For learner-facing Portuguese, read `docs/content/PT_PT_STYLE_GUIDE.md`.

Do not rely on chat history as the only source of truth. Update the relevant reference file when a decision changes.

## Non-Negotiable Product Rules

- The teaching language is European Portuguese (`pt-PT`), not Brazilian Portuguese (`pt-BR`).
- Never silently treat a Brazilian Portuguese expression, vocabulary item, pronunciation, or grammar pattern as the default.
- AI-generated learning content is a draft until it has passed the review workflow in the content style guide.
- The product teaches usable conversation through listening, response practice, phrase groups, reading, and short writing—not a traditional grammar-first course.
- Conversation Missions and Quick Practice must draw from the same reviewed content rather than creating disconnected libraries.
- Do not introduce a paid service, metered API, or dependency that requires a commercial account without explicit user approval.

## Git Rules

- `main` must remain stable.
- Never do feature work directly on `main`.
- Start each feature from an up-to-date `main` on a branch named `codex/<type>-<short-name>`.
- Keep one feature or tightly related setup concern per branch.
- Keep commits small and logically focused. Avoid combining unrelated code, content, formatting, and refactors.
- Push checkpoints to the feature branch. Do not merge into `main` until the feature is complete, checks pass, and the user approves the merge.
- Do not rewrite shared branch history or force-push unless explicitly requested.

See `docs/WORKFLOW.md` for the complete workflow.

## Implementation Rules

- Inspect existing code and authoritative documentation before using an unfamiliar API.
- State uncertain assumptions in the feature specification or decision record.
- Prefer the smallest end-to-end implementation that can be tested on both iOS and web.
- Keep business logic and content models independent of platform UI where practical.
- Use platform-specific files only when the user experience or native API genuinely differs.
- Add or update tests for important behavior and regressions.
- Keep dependencies minimal and commit the lockfile.
- Never commit secrets, private keys, credentials, or production user data.

## Definition of Done

A feature is complete only when:

- Its acceptance criteria are met.
- Formatting, linting, type checking, and relevant tests pass.
- The web build succeeds.
- iOS is checked when the local environment supports it; otherwise the limitation is documented.
- Learner-facing `pt-PT` content has the required review status.
- Relevant reference and status documentation is updated.
- The work is committed and pushed to its feature branch.

