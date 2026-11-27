# Feature 0001: First Listening Bite

- Status: Visual and navigation revision in progress; content review and merge approval pending
- Branch: `codex/feature-content-activity-model`
- First drafted: 2026-11-24

## Goal

Deliver the smallest useful end-to-end practice loop: a learner hears one short European Portuguese sentence, chooses what it means, receives focused feedback, and can reveal the transcript and useful chunks.

The same structured content must be reusable by later phrase, vocabulary, sentence, response, and review activities.

## Initial Learner Assumption

For this prototype, assume an English-speaking beginner around pre-A1/A1 who may know a few Portuguese words but cannot yet reliably understand natural connected speech.

This is a reversible product assumption for the first vertical slice, not a final audience decision.

## Prototype Content

- Topic: ordering at a café in Portugal.
- Communicative goal: politely order an espresso and a glass of water.
- Register: neutral and polite.
- Activity duration: about one to two minutes.
- Audio: device text-to-speech explicitly configured for `pt-PT` and labeled provisional.
- Content review status: `draft` until a qualified European Portuguese reviewer approves it.

## In Scope

- A shared typed model for learning items, topic packs, review metadata, prototype audio, and listening-choice activities.
- Runtime validation for references and core content-quality rules.
- One café learning item and one listening-choice activity.
- Natural and assisted playback controls.
- Answer selection, submission, feedback, transcript reveal, and retry.
- A mobile-first responsive screen that works with touch, keyboard, light mode, and dark mode.
- An activity-hub entry point that opens Listening as its own activity-specific flow and labels
  unfinished activity families honestly.
- Automated tests for content validation, answer evaluation, and `pt-PT` voice selection.

## Out of Scope

- Native voice recording or production-approved audio.
- Accounts, cloud progress, spaced repetition, or a backend.
- Multiple exercises or a complete café pack.
- Pronunciation scoring.
- Final branding.

## Acceptance Criteria

1. The learner can play the prompt at natural or assisted speed using a `pt-PT` device voice.
2. The app does not silently select a `pt-BR` voice; an unavailable `pt-PT` voice produces a useful message.
3. The learner can select one answer, submit it, and see correct or corrective feedback.
4. The transcript, English meaning, and useful chunks appear only after submission.
5. The learner can retry the activity without reloading the app.
6. Content and activity data live outside the presentation component and pass runtime validation.
7. Draft and synthetic-audio status are visible in the prototype.
8. Linting, type checking, automated tests, and the web export pass.
9. The flow is manually checked at a phone-sized web viewport.
10. The app opens on an activity menu rather than dropping the learner directly into the exercise.
11. The Listening interface has a purposeful activity-specific composition and uses the shared
    visual foundation without reverting to a generic dashboard-card layout.

## Known Limitations

- Available synthetic voices depend on the operating system and browser. The prototype will require an exact Portuguese (Portugal) voice instead of silently falling back to another Portuguese variant.
- Full iOS Simulator verification remains blocked until Xcode is installed.
- The draft Portuguese and English teaching notes require native European Portuguese and teaching review before production publication.

## Validation Record

- `npm run check` passes, including linting, strict type checking, ten automated tests, and the static web export.
- The practice and library screens were checked at a 390 × 844 mobile-web viewport.
- Natural and assisted playback controls, correct and incorrect answers, transcript reveal, retry, and tab navigation were exercised manually.
- Browser console inspection found no application errors after the final reload.
- iOS Simulator validation was not run because full Xcode is not installed.
