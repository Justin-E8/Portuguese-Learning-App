import {
  contentReviewStatuses,
  type LearningLibrary,
  type ReviewMetadata,
} from '@/content/types';

const ptBrTermsToFlag = [
  { term: 'ônibus', preferred: 'autocarro' },
  { term: 'trem', preferred: 'comboio' },
  { term: 'celular', preferred: 'telemóvel' },
  { term: 'banheiro', preferred: 'casa de banho' },
  { term: 'café da manhã', preferred: 'pequeno-almoço' },
  { term: 'suco', preferred: 'sumo' },
] as const;

function duplicateValues(values: readonly string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return [...duplicates];
}

function validateReview(review: ReviewMetadata, owner: string) {
  const issues: string[] = [];
  const statusIndex = contentReviewStatuses.indexOf(review.status);

  if (statusIndex < 0) {
    issues.push(`${owner} has an unknown review status.`);
  }

  if (review.status !== 'draft' && (!review.reviewer || !review.reviewedAt)) {
    issues.push(`${owner} must record a reviewer and review date after draft status.`);
  }

  return issues;
}

function includesFlaggedTerm(text: string, term: string) {
  const normalizeForSearch = (value: string) =>
    value
      .normalize('NFC')
      .toLocaleLowerCase('pt-PT')
      .replace(/[^a-záàâãéêíóôõúüç-]+/g, ' ')
      .trim();
  const normalizedText = ` ${normalizeForSearch(text)} `;
  const normalizedTerm = ` ${normalizeForSearch(term)} `;

  return normalizedText.includes(normalizedTerm);
}

export function collectLibraryIssues(library: LearningLibrary) {
  const issues: string[] = [];
  const itemIds = library.items.map((item) => item.id);
  const packIds = library.packs.map((pack) => pack.id);
  const activityIds = library.activities.map((activity) => activity.id);
  const itemIdSet = new Set(itemIds);

  for (const duplicate of duplicateValues(itemIds)) {
    issues.push(`Duplicate learning item id: ${duplicate}.`);
  }
  for (const duplicate of duplicateValues(packIds)) {
    issues.push(`Duplicate topic pack id: ${duplicate}.`);
  }
  for (const duplicate of duplicateValues(activityIds)) {
    issues.push(`Duplicate activity id: ${duplicate}.`);
  }

  for (const item of library.items) {
    const owner = `Learning item ${item.id}`;
    issues.push(...validateReview(item.review, owner));

    if (item.locale !== 'pt-PT' || item.region !== 'Portugal') {
      issues.push(`${owner} must explicitly use the pt-PT locale and Portugal region.`);
    }
    if (!item.portuguese.trim() || !item.english.trim()) {
      issues.push(`${owner} must include Portuguese text and an English meaning.`);
    }
    if (!item.communicativeGoal.trim() || !item.situation.trim()) {
      issues.push(`${owner} must include a communicative goal and situation.`);
    }
    if (item.chunks.length === 0) {
      issues.push(`${owner} must include at least one reusable chunk.`);
    }
    if (item.audio && (item.audio.locale !== 'pt-PT' || !item.audio.provisional)) {
      issues.push(`${owner} prototype audio must be provisional and use pt-PT.`);
    }

    const learnerFacingPortuguese = [
      item.portuguese,
      ...item.chunks.map((chunk) => chunk.portuguese),
      ...item.acceptableResponses,
    ];

    for (const warning of ptBrTermsToFlag) {
      if (learnerFacingPortuguese.some((text) => includesFlaggedTerm(text, warning.term))) {
        issues.push(
          `${owner} contains “${warning.term}”; confirm that this is intentional instead of pt-PT “${warning.preferred}”.`,
        );
      }
    }
  }

  for (const pack of library.packs) {
    const owner = `Topic pack ${pack.id}`;
    issues.push(...validateReview(pack.review, owner));

    if (pack.itemIds.length === 0) {
      issues.push(`${owner} must reference at least one learning item.`);
    }
    for (const itemId of pack.itemIds) {
      if (!itemIdSet.has(itemId)) {
        issues.push(`${owner} references missing learning item ${itemId}.`);
      }
    }
  }

  for (const activity of library.activities) {
    const owner = `Activity ${activity.id}`;
    issues.push(...validateReview(activity.review, owner));

    if (!itemIdSet.has(activity.itemId)) {
      issues.push(`${owner} references missing learning item ${activity.itemId}.`);
    }
    if (activity.options.length < 2) {
      issues.push(`${owner} must provide at least two answer options.`);
    }
    if (!activity.options.some((option) => option.id === activity.correctOptionId)) {
      issues.push(`${owner} has a correct option id that is not present in its options.`);
    }
    for (const duplicate of duplicateValues(activity.options.map((option) => option.id))) {
      issues.push(`${owner} has duplicate answer option id ${duplicate}.`);
    }
    if (activity.estimatedSeconds < 30 || activity.estimatedSeconds > 300) {
      issues.push(`${owner} should take between 30 seconds and five minutes.`);
    }
    if (activity.assistedSpeechRate >= activity.naturalSpeechRate) {
      issues.push(`${owner} assisted playback must be slower than natural playback.`);
    }
  }

  return issues;
}

export function assertValidLibrary<TLibrary extends LearningLibrary>(library: TLibrary) {
  const issues = collectLibraryIssues(library);

  if (issues.length > 0) {
    throw new Error(`Learning content validation failed:\n- ${issues.join('\n- ')}`);
  }

  return library;
}
