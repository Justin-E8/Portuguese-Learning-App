import assert from 'node:assert/strict';
import test from 'node:test';

import { selectEuropeanPortugueseVoice } from '@/domain/pt-pt-voice';

const voices = [
  { identifier: 'br', language: 'pt-BR', name: 'Brazilian voice', quality: 'Enhanced' },
  { identifier: 'pt-default', language: 'pt_PT', name: 'Portugal default', quality: 'Default' },
  { identifier: 'pt-enhanced', language: 'pt-PT', name: 'Portugal enhanced', quality: 'Enhanced' },
];

test('selects an exact European Portuguese voice and prefers enhanced quality', () => {
  assert.equal(selectEuropeanPortugueseVoice(voices)?.identifier, 'pt-enhanced');
});

test('never treats a Brazilian Portuguese voice as a pt-PT fallback', () => {
  assert.equal(selectEuropeanPortugueseVoice([voices[0]]), undefined);
});

test('accepts a pt-PT locale with an additional BCP 47 variant', () => {
  const voice = { identifier: 'pt-variant', language: 'pt-PT-x-test', name: 'Variant' };

  assert.equal(selectEuropeanPortugueseVoice([voice]), voice);
});
