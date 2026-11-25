import type { ListeningChoiceActivity } from '@/content/types';

export type ListeningChoiceResult = {
  isCorrect: boolean;
  selectedOptionId: string;
  correctOptionId: string;
  feedback: string;
};

export function evaluateListeningChoice(
  activity: ListeningChoiceActivity,
  selectedOptionId: string,
): ListeningChoiceResult {
  const optionExists = activity.options.some((option) => option.id === selectedOptionId);

  if (!optionExists) {
    throw new Error(`Unknown option ${selectedOptionId} for activity ${activity.id}.`);
  }

  const isCorrect = selectedOptionId === activity.correctOptionId;

  return {
    isCorrect,
    selectedOptionId,
    correctOptionId: activity.correctOptionId,
    feedback: isCorrect ? activity.correctFeedback : activity.incorrectFeedback,
  };
}
