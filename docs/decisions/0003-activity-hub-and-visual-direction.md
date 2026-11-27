# Decision 0003: Activity Hub and Visual Direction

- Status: Accepted provisionally
- Date: 2026-11-27

## Context

The first Listening Bite proved the technical and content flow, but its interface reads as a
generic prototype and does not provide a path to the other planned forms of practice. The product
needs a recognizable identity and a navigation model that can grow without presenting every
activity through the same screen.

## Decision

Make the home screen an activity hub. It will introduce Listening, Phrases and Vocabulary,
Sentence Practice, Response Practice, and Quick Review as distinct destinations. Only completed
destinations are interactive; future activities are visibly marked as planned.

Use an editorial "Portuguese pocket guide" direction for the first visual foundation:

- Warm paper-like backgrounds, deep azulejo blue, ink, and a restrained terracotta accent.
- Expressive serif display type paired with a highly readable sans-serif interface type.
- Flatter, sharper compositions with visible rules and numbered sections instead of repeated
  floating rounded cards.
- Small code-native tile and print motifs rather than stock illustrations or copied cultural
  imagery.
- Shared design tokens and navigation, with activity-specific working areas and controls.

This is a direction for product review, not a final brand identity or app name.

## Consequences

- The Listening Bite moves to its own route rather than acting as the home screen.
- Navigation needs a root stack around the persistent Home and Library tabs.
- The activity hub can communicate the roadmap without shipping fake or empty exercises.
- Future activity specifications must describe their own interaction pattern instead of inheriting
  a universal card layout.
- Visual approval remains a required part of completing the first vertical slice.

## Revisit When

- The user rejects the direction after reviewing it on phone and desktop.
- Learner testing finds that the activity labels or navigation are unclear.
- A formal name, identity system, or professional brand package is selected.
