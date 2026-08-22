# Development Workflow

## Branches

- `main` contains stable, completed work.
- Feature branches start from an up-to-date `main`.
- Branch names follow `codex/<type>-<short-name>`.
- Common types are `feature`, `fix`, `content`, `docs`, and `chore`.
- One feature or tightly related setup concern belongs on each branch.

Examples:

```text
codex/feature-phrase-packs
codex/content-cafe-mission
codex/fix-audio-replay
```

## Before Implementation

1. Confirm the working tree is clean and the correct branch is checked out.
2. Read the project reference files listed in `AGENTS.md`.
3. Create or update a feature specification in `docs/features/`.
4. Record acceptance criteria, assumptions, exclusions, and validation steps.

## Commits

- Make a commit after each coherent, verified checkpoint.
- Use concise imperative messages such as `Add phrase pack content model`.
- Do not mix unrelated refactoring with feature behavior.
- Keep generated dependency changes in the same commit as the dependency that requires them.
- Push checkpoints to the feature branch so work is recoverable and reviewable.

## Validation

Run the checks relevant to the change, including:

- Formatting or formatting verification.
- Linting.
- Type checking.
- Unit and integration tests.
- Web export/build.
- iOS verification when available.
- Structured content validation for learning content.

Run the complete baseline suite with:

```bash
npm run check
```

## Merge Policy

- Do not merge incomplete work.
- Do not merge when required checks fail.
- Do not merge learner-facing content that lacks its required review status.
- Do not merge into `main` until the user has reviewed and approved the completed branch.
- Prefer squash merge for a focused feature branch unless preserving individual commits adds value.
- After merging, update local `main` and delete the completed feature branch when appropriate.
