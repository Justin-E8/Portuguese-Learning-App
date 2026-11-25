import assert from 'node:assert/strict';
import test from 'node:test';

import { firstListeningBite } from '@/content/library';
import { evaluateListeningChoice } from '@/domain/listening-choice';

test('evaluates the correct listening choice', () => {
  const result = evaluateListeningChoice(firstListeningBite, firstListeningBite.correctOptionId);

  assert.equal(result.isCorrect, true);
  assert.equal(result.feedback, firstListeningBite.correctFeedback);
});

test('returns corrective feedback for an incorrect listening choice', () => {
  const incorrectOption = firstListeningBite.options.find(
    (option) => option.id !== firstListeningBite.correctOptionId,
  );

  if (!incorrectOption) {
    throw new Error('Expected the activity to include an incorrect option.');
  }
  const result = evaluateListeningChoice(firstListeningBite, incorrectOption.id);

  assert.equal(result.isCorrect, false);
  assert.equal(result.feedback, firstListeningBite.incorrectFeedback);
});

test('rejects an option that does not belong to the activity', () => {
  assert.throws(
    () => evaluateListeningChoice(firstListeningBite, 'missing-option'),
    /Unknown option/,
  );
});
