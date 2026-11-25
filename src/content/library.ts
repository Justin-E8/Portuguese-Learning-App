import type {
  LearningItem,
  LearningLibrary,
  ListeningChoiceActivity,
  TopicPack,
} from '@/content/types';
import { assertValidLibrary } from '@/content/validate-library';

const cafeOrderItem = {
  id: 'cafe.order-coffee-water',
  kind: 'sentence',
  topicId: 'cafe-basics',
  locale: 'pt-PT',
  region: 'Portugal',
  level: 'A1',
  register: 'neutral',
  communicativeGoal: 'Politely order a coffee and a glass of water.',
  situation: 'A customer orders at a café counter in Portugal.',
  speakerRelationship: 'Customer speaking to café staff they do not know.',
  portuguese: 'Queria um café e um copo de água, por favor.',
  english: 'I’d like an espresso and a glass of water, please.',
  chunks: [
    {
      portuguese: 'Queria…',
      english: 'I’d like…',
      note: 'A common polite way to ask for something in a café.',
    },
    {
      portuguese: 'um café',
      english: 'an espresso',
      note: 'In Portugal, asking for “um café” normally means an espresso.',
    },
    {
      portuguese: 'um copo de água',
      english: 'a glass of water',
    },
    {
      portuguese: 'por favor',
      english: 'please',
    },
  ],
  acceptableResponses: [],
  commonMisunderstandings: [
    'Interpreting “um café” as a large filter coffee rather than an espresso in this setting.',
    'Missing “um copo de água” in connected speech.',
  ],
  source: {
    kind: 'original-project-draft',
    attribution: 'Portuguese Learning App project draft',
    license: 'Project-owned original teaching content',
    notes: 'AI-assisted draft; do not publish before human review.',
  },
  review: {
    status: 'draft',
    notes: [
      'Requires native European Portuguese review.',
      'Requires teaching review before publication.',
    ],
  },
  audio: {
    kind: 'device-tts',
    locale: 'pt-PT',
    status: 'prototype',
    provisional: true,
    source: 'device',
    usageRights: 'Generated at playback time by the learner’s device.',
  },
} satisfies LearningItem;

const cafeBasicsPack = {
  id: 'pack.cafe-basics',
  slug: 'cafe-basics',
  title: 'No café',
  description: 'Useful language for ordering simply and politely in a café in Portugal.',
  level: 'A1',
  itemIds: [cafeOrderItem.id],
  review: {
    status: 'draft',
    notes: ['Prototype pack containing one AI-assisted draft item.'],
  },
} satisfies TopicPack;

const cafeOrderListeningBite = {
  id: 'listening.cafe-order-meaning',
  kind: 'listening-choice',
  title: 'A quick café order',
  itemId: cafeOrderItem.id,
  prompt: 'What does the customer ask for?',
  options: [
    { id: 'coffee-water', label: 'An espresso and a glass of water' },
    { id: 'tea-bottle', label: 'A tea and a bottle of water' },
    { id: 'coffee-juice', label: 'An espresso and orange juice' },
  ],
  correctOptionId: 'coffee-water',
  correctFeedback: 'Exactly — you caught both “um café” and “um copo de água”.',
  incorrectFeedback: 'Not quite. Listen again for the two things joined by “e”.',
  estimatedSeconds: 90,
  naturalSpeechRate: 0.92,
  assistedSpeechRate: 0.72,
  review: {
    status: 'draft',
    notes: ['Answer choices and teaching feedback require human review.'],
  },
} satisfies ListeningChoiceActivity;

export const learningLibrary = assertValidLibrary({
  items: [cafeOrderItem],
  packs: [cafeBasicsPack],
  activities: [cafeOrderListeningBite],
} satisfies LearningLibrary);

export function getLearningItem(itemId: string) {
  const item = learningLibrary.items.find((candidate) => candidate.id === itemId);

  if (!item) {
    throw new Error(`Unknown learning item: ${itemId}`);
  }

  return item;
}

export const firstListeningBite = learningLibrary.activities[0];
export const firstTopicPack = learningLibrary.packs[0];
