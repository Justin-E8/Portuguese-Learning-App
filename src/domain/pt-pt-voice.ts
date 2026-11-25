export type SpeechVoiceInfo = {
  identifier: string;
  language: string;
  name: string;
  quality?: string;
};

function normalizeLocale(locale: string) {
  return locale.trim().replaceAll('_', '-').toLocaleLowerCase('en');
}

function isEuropeanPortugueseLocale(locale: string) {
  const normalized = normalizeLocale(locale);
  return normalized === 'pt-pt' || normalized.startsWith('pt-pt-');
}

export function selectEuropeanPortugueseVoice<TVoice extends SpeechVoiceInfo>(
  voices: readonly TVoice[],
) {
  const ptPtVoices = voices.filter((voice) => isEuropeanPortugueseLocale(voice.language));

  return ptPtVoices.sort((left, right) => {
    const leftEnhanced = left.quality?.toLocaleLowerCase('en') === 'enhanced' ? 1 : 0;
    const rightEnhanced = right.quality?.toLocaleLowerCase('en') === 'enhanced' ? 1 : 0;

    if (leftEnhanced !== rightEnhanced) {
      return rightEnhanced - leftEnhanced;
    }

    return left.name.localeCompare(right.name);
  })[0];
}
