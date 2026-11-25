export const contentReviewStatuses = [
  'draft',
  'pt-PT-reviewed',
  'teaching-reviewed',
  'audio-approved',
  'published',
] as const;

export type ContentReviewStatus = (typeof contentReviewStatuses)[number];
export type LearnerLevel = 'pre-A1' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type Register = 'casual' | 'neutral' | 'formal';
export type LearningItemKind = 'word' | 'chunk' | 'phrase' | 'sentence' | 'response';

export type ReviewMetadata = {
  status: ContentReviewStatus;
  reviewer?: string;
  reviewedAt?: string;
  notes: readonly string[];
};

export type ContentSource = {
  kind: 'original-project-draft' | 'licensed-source';
  attribution: string;
  license: string;
  notes?: string;
};

export type PrototypeAudio = {
  kind: 'device-tts';
  locale: 'pt-PT';
  status: 'prototype';
  provisional: true;
  source: 'device';
  usageRights: string;
};

export type LearningChunk = {
  portuguese: string;
  english: string;
  note?: string;
};

export type LearningItem = {
  id: string;
  kind: LearningItemKind;
  topicId: string;
  locale: 'pt-PT';
  region: 'Portugal';
  level: LearnerLevel;
  register: Register;
  communicativeGoal: string;
  situation: string;
  speakerRelationship: string;
  portuguese: string;
  english: string;
  chunks: readonly LearningChunk[];
  acceptableResponses: readonly string[];
  commonMisunderstandings: readonly string[];
  source: ContentSource;
  review: ReviewMetadata;
  audio?: PrototypeAudio;
};

export type TopicPack = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: LearnerLevel;
  itemIds: readonly string[];
  review: ReviewMetadata;
};

export type ListeningChoiceOption = {
  id: string;
  label: string;
};

export type ListeningChoiceActivity = {
  id: string;
  kind: 'listening-choice';
  title: string;
  itemId: string;
  prompt: string;
  options: readonly ListeningChoiceOption[];
  correctOptionId: string;
  correctFeedback: string;
  incorrectFeedback: string;
  estimatedSeconds: number;
  naturalSpeechRate: number;
  assistedSpeechRate: number;
  review: ReviewMetadata;
};

export type LearningLibrary = {
  items: readonly LearningItem[];
  packs: readonly TopicPack[];
  activities: readonly ListeningChoiceActivity[];
};
