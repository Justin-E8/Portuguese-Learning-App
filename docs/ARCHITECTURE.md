# Architecture

## Current Direction

Use a universal Expo and React Native application written in TypeScript, with Expo Router for navigation. The same project should target iOS and web.

This direction is recorded in `docs/decisions/0001-universal-expo-app.md` and should be revisited if product requirements reveal a strong native-only or SEO-heavy need.

## Architectural Principles

- Build mobile-first, but verify web compatibility with every completed feature.
- Share content models, domain logic, validation, and design tokens across platforms.
- Share UI where it produces a good experience; use platform-specific components where interaction patterns differ.
- Keep learning content separate from presentation code.
- Store early content in version-controlled structured data so changes are reviewable.
- Derive Missions, Phrase Packs, Listening Bites, and Response Sprints from common approved content entities.
- Start local-first and avoid accounts or a backend until a validated feature requires them.
- Keep external services behind small interfaces so providers can be changed.

## Intended Source Structure

```text
src/
  app/             Expo Router routes and layouts
  components/      Reusable visual components
  features/        Feature-specific UI and behavior
  content/         Structured learning content and schemas
  domain/          Platform-independent learning logic
  hooks/           Shared React hooks
  services/        Storage, audio, and future external adapters
  theme/           Tokens and visual foundations
  utils/           Small shared utilities
assets/            App-owned images, fonts, and initial audio
docs/              Product, architecture, workflow, and feature specifications
```

The generated scaffold may differ temporarily. Structural changes should be made incrementally and documented.

## Quality Boundaries

- TypeScript strict mode is required.
- Learner-facing content must conform to the content schema and review states.
- Domain logic should be testable without rendering a screen.
- A feature is not complete until it builds for web and is checked on iOS when the environment supports it.
- Accessibility, responsive layout, reduced-motion behavior, and usable touch targets are design requirements.

## Current Constraints

- Development should remain free unless the user explicitly approves a cost.
- Full Xcode is not currently installed, so iOS Simulator verification is blocked until it is installed.
- The first release should avoid a backend and production AI API unless requirements change.

