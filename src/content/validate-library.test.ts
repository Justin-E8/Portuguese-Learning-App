import assert from 'node:assert/strict';
import test from 'node:test';

import { learningLibrary } from '@/content/library';
import type { LearningLibrary } from '@/content/types';
import { collectLibraryIssues } from '@/content/validate-library';

test('the prototype learning library passes validation', () => {
  assert.deepEqual(collectLibraryIssues(learningLibrary), []);
});

test('validation catches an activity that references missing content', () => {
  const invalidLibrary = {
    ...learningLibrary,
    activities: [{ ...learningLibrary.activities[0], itemId: 'missing-item' }],
  } satisfies LearningLibrary;

  assert.ok(
    collectLibraryIssues(invalidLibrary).some((issue) =>
      issue.includes('references missing learning item missing-item'),
    ),
  );
});

test('validation flags common pt-BR defaults in learner-facing text', () => {
  const invalidLibrary = {
    ...learningLibrary,
    items: [{ ...learningLibrary.items[0], portuguese: 'Queria um suco, por favor.' }],
  } satisfies LearningLibrary;

  assert.ok(
    collectLibraryIssues(invalidLibrary).some((issue) =>
      issue.includes('contains “suco”'),
    ),
  );
});

test('variant checks match whole terms instead of letter sequences', () => {
  const validLibrary = {
    ...learningLibrary,
    items: [{ ...learningLibrary.items[0], portuguese: 'Falo extremamente devagar.' }],
  } satisfies LearningLibrary;

  assert.equal(
    collectLibraryIssues(validLibrary).some((issue) => issue.includes('contains “trem”')),
    false,
  );
});
