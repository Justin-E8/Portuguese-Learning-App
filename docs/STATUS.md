# Project Status

## Current Phase

Project foundation and universal application setup.

## Completed

- GitHub repository connected with `main` tracking `origin/main`.
- Initial product direction agreed.
- Universal Expo architecture selected provisionally.
- Git, content-quality, and European Portuguese rules documented.
- Expo SDK 57 TypeScript application scaffolded for iOS and web.
- Local linting, strict type checking, web export, and all Expo Doctor checks pass.
- GitHub CI configured to run the baseline checks on feature branches and pull requests.

## In Progress

- Complete and review the project-foundation branch before merging.

## Next

1. Choose the first target learner.
2. Select three prototype Conversation Missions.
3. Define the shared content schema.
4. Create the first reviewed content pack.
5. Build the smallest end-to-end mission and quick-practice slice.

## Known Blockers and Risks

- Full Xcode is not installed. Web work can proceed, but the iOS Simulator and local iOS compilation require Xcode.
- A native European Portuguese content reviewer and voice-recording plan have not yet been selected.
- The initial target audience remains open, which affects scenario priorities and assumed proficiency.
- `npm audit` reports a moderate advisory in `uuid@7.0.3` through Expo's native-project build tooling (`xcode`). Expo Doctor passes and npm offers no non-breaking automatic fix; monitor Expo for a compatible upstream update rather than forcing a downgrade.
