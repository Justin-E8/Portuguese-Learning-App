# Project Status

## Current Phase

First microlearning vertical slice.

## Completed

- GitHub repository connected with `main` tracking `origin/main`.
- Initial product direction agreed.
- Universal Expo architecture selected provisionally.
- Git, content-quality, and European Portuguese rules documented.
- Expo SDK 57 TypeScript application scaffolded for iOS and web.
- Local linting, strict type checking, web export, and all Expo Doctor checks pass.
- GitHub CI configured to run the baseline checks on feature branches and pull requests.
- Product direction revised from immersive Conversation Missions to short, independent microlearning activities.
- The completed project foundation was merged into `main`.
- A typed shared content model now covers learning items, topic packs, review metadata, prototype audio, and listening-choice activities.
- Runtime validation checks content references, review metadata, activity timing, and common Brazilian Portuguese defaults.
- The first draft café pack and one complete Listening Bite are implemented on `codex/feature-content-activity-model`.
- The activity supports strict `pt-PT` device-voice selection, natural and assisted playback, answer feedback, transcript reveal, useful chunks, and retry.
- Ten automated content and domain tests pass, along with linting, strict type checking, and the web export.
- Expo SDK 57 dependencies are on their current compatible patch releases, and all 21 Expo Doctor checks pass.
- The practice flow and shared library were manually checked at a 390 × 844 mobile-web viewport.

## In Progress

- Review the first Listening Bite implementation and draft café content before merging the feature branch.
- Arrange native European Portuguese and teaching review for the prototype content.

## Next

1. Confirm or revise the provisional English-speaking pre-A1/A1 target learner.
2. Review and approve the first Listening Bite branch for merging.
3. Select the other two prototype topic packs.
4. Expand the café pack only after the first content and practice loop is reviewed.
5. Replace prototype text-to-speech with approved native European Portuguese audio before production.

## Known Blockers and Risks

- Full Xcode is not installed. Web work can proceed, but the iOS Simulator and local iOS compilation require Xcode.
- A native European Portuguese content reviewer and voice-recording plan have not yet been selected; the current café content remains visibly marked `draft`.
- The initial target audience remains open. The first slice provisionally assumes an English-speaking pre-A1/A1 learner so implementation can be tested without silently settling the broader product decision.
- Prototype playback depends on an exact Portuguese (Portugal) system voice. The app will show an availability message instead of silently falling back to Brazilian Portuguese.
- Testing a locally compiled app on a personal iPhone can remain free, but it requires full Xcode and periodic reprovisioning with a free Apple Account.
- After applying all compatible Expo SDK 57 patch updates, the current npm advisory database reports eight findings in non-development dependency paths (3 moderate, 4 high, and 1 critical), through Expo, Expo Router, and React Native dependency trees. The remaining automated fixes propose incompatible SDK changes. Treat a compatible future Expo/React Native dependency upgrade and a clean audit as a release blocker; do not use `npm audit fix --force` on this feature branch.
