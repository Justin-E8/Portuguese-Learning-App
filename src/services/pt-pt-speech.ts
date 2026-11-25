import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

import { selectEuropeanPortugueseVoice } from '@/domain/pt-pt-voice';

const ptPtLocale = 'pt-PT';

export class EuropeanPortugueseVoiceUnavailableError extends Error {
  constructor() {
    super('No Portuguese (Portugal) voice is available on this device.');
    this.name = 'EuropeanPortugueseVoiceUnavailableError';
  }
}

type SpeakOptions = {
  text: string;
  rate: number;
  onStart?: () => void;
  onDone?: () => void;
  onError?: () => void;
};

function waitForVoices() {
  return new Promise((resolve) => setTimeout(resolve, 250));
}

async function getAvailableVoices() {
  let voices = await Speech.getAvailableVoicesAsync();

  if (Platform.OS === 'web' && voices.length === 0) {
    await waitForVoices();
    voices = await Speech.getAvailableVoicesAsync();
  }

  return voices;
}

export async function speakEuropeanPortuguese({
  text,
  rate,
  onStart,
  onDone,
  onError,
}: SpeakOptions) {
  const voices = await getAvailableVoices();
  const voice = selectEuropeanPortugueseVoice(voices);

  if (!voice) {
    throw new EuropeanPortugueseVoiceUnavailableError();
  }

  await Speech.stop();
  Speech.speak(text, {
    language: ptPtLocale,
    voice: voice.identifier,
    rate,
    pitch: 1,
    onStart,
    onDone,
    onStopped: onDone,
    onError,
  });

  return voice.name;
}

export function stopSpeaking() {
  return Speech.stop();
}
