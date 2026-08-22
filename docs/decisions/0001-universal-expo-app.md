# ADR 0001: Universal Expo Application

- Status: Accepted provisionally
- Date: 2026-08-22

## Context

The product should launch on iOS and also be available on the web. Development should remain free where possible, the initial team is small, and duplicating product logic and content across two applications would slow validation.

## Decision

Build one TypeScript project with Expo, React Native, and Expo Router, targeting iOS and web from the beginning.

Develop mobile-first while validating web compatibility for each completed feature. Use platform-specific components only when they materially improve the experience or provide required native behavior.

## Consequences

- Most application logic, content, navigation concepts, and UI can be shared.
- Each feature must be tested responsively rather than assuming mobile layouts automatically work on the web.
- Some native capabilities may require Expo development builds or platform-specific modules.
- A separate SEO-focused website may still be added later if the public content strategy requires it.

## Revisit When

- A core requirement depends on native iOS capabilities that are impractical through Expo.
- The website becomes primarily a document- and search-oriented publishing product.
- Platform-specific experiences diverge enough that shared UI causes more complexity than value.

