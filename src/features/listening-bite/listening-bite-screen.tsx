import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { firstListeningBite, getLearningItem } from '@/content/library';
import type { ListeningChoiceOption } from '@/content/types';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { evaluateListeningChoice } from '@/domain/listening-choice';
import { useTheme } from '@/hooks/use-theme';
import {
  EuropeanPortugueseVoiceUnavailableError,
  speakEuropeanPortuguese,
  stopSpeaking,
} from '@/services/pt-pt-speech';

const activity = firstListeningBite;
const item = getLearningItem(activity.itemId);
const waveformHeights = [16, 26, 38, 22, 46, 30, 18, 36, 24, 42, 28, 16];

type PlaybackMode = 'natural' | 'assisted';

export function ListeningBiteScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const compactWeb = Platform.OS === 'web' && width < 700;
  const [selectedOptionId, setSelectedOptionId] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>();
  const [speechMessage, setSpeechMessage] = useState<string>();

  const result = useMemo(() => {
    if (!submitted || !selectedOptionId) {
      return undefined;
    }

    return evaluateListeningChoice(activity, selectedOptionId);
  }, [selectedOptionId, submitted]);

  useEffect(() => {
    return () => {
      void stopSpeaking();
    };
  }, []);

  const play = async (mode: PlaybackMode) => {
    setSpeechMessage(undefined);
    setPlaybackMode(mode);
    setIsSpeaking(true);

    try {
      await speakEuropeanPortuguese({
        text: item.portuguese,
        rate: mode === 'natural' ? activity.naturalSpeechRate : activity.assistedSpeechRate,
        onStart: () => setIsSpeaking(true),
        onDone: () => setIsSpeaking(false),
        onError: () => {
          setIsSpeaking(false);
          setSpeechMessage('Playback failed. Check your device audio settings and try again.');
        },
      });
    } catch (error) {
      setIsSpeaking(false);
      if (error instanceof EuropeanPortugueseVoiceUnavailableError) {
        setSpeechMessage(
          'A Portuguese (Portugal) voice is not installed or available in this browser. Add a pt-PT system voice, then try again.',
        );
        return;
      }
      setSpeechMessage('Playback failed. Check your device audio settings and try again.');
    }
  };

  const submitAnswer = () => {
    if (selectedOptionId) {
      setSubmitted(true);
    }
  };

  const retry = () => {
    setSelectedOptionId(undefined);
    setSubmitted(false);
    setSpeechMessage(undefined);
  };

  const webChromePadding = Platform.select({
    web: compactWeb
      ? { paddingTop: Spacing.four, paddingBottom: 104 }
      : { paddingTop: 112, paddingBottom: Spacing.six },
  });

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingLeft: safeAreaInsets.left + Spacing.four,
              paddingRight: safeAreaInsets.right + Spacing.four,
              paddingBottom: safeAreaInsets.bottom + BottomTabInset + Spacing.five,
            },
            webChromePadding,
          ]}>
          <View style={styles.page}>
            <View style={styles.header}>
              <View style={styles.eyebrowRow}>
                <View style={[styles.localeBadge, { backgroundColor: theme.backgroundSelected }]}>
                  <ThemedText type="smallBold" style={{ color: theme.primary }}>
                    PT · PORTUGAL
                  </ThemedText>
                </View>
                <ThemedText type="small" themeColor="textSecondary">
                  About 90 seconds
                </ThemedText>
              </View>
              <ThemedText accessibilityRole="header" style={styles.pageTitle}>
                Train your ear, one useful phrase at a time.
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.pageDescription}>
                Listen first. Don’t worry about catching every word.
              </ThemedText>
            </View>

            <ThemedView
              type="surfaceRaised"
              style={[styles.activityCard, { borderColor: theme.border }]}>
              <View style={styles.activityMeta}>
                <View>
                  <ThemedText type="smallBold" style={{ color: theme.accent }}>
                    LISTENING BITE · 1 OF 1
                  </ThemedText>
                  <ThemedText accessibilityRole="header" style={styles.activityTitle}>
                    {activity.title}
                  </ThemedText>
                </View>
                <View style={[styles.draftBadge, { backgroundColor: theme.warningBackground }]}>
                  <ThemedText type="smallBold" style={{ color: theme.warning }}>
                    DRAFT
                  </ThemedText>
                </View>
              </View>

              <View style={[styles.audioPanel, { backgroundColor: theme.backgroundSelected }]}>
                <View style={styles.audioPromptRow}>
                  <View>
                    <ThemedText type="smallBold" style={{ color: theme.primary }}>
                      AT A CAFÉ
                    </ThemedText>
                    <ThemedText style={styles.audioPrompt}>Hear the customer’s order</ThemedText>
                  </View>
                  <View
                    accessible={false}
                    style={styles.waveform}
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants">
                    {waveformHeights.map((height, index) => (
                      <View
                        key={`${height}-${index}`}
                        style={[
                          styles.waveBar,
                          {
                            height,
                            backgroundColor: isSpeaking ? theme.accent : theme.primary,
                            opacity: isSpeaking ? 1 : 0.65,
                          },
                        ]}
                      />
                    ))}
                  </View>
                </View>

                <View style={styles.playbackButtons}>
                  <PlaybackButton
                    label="Play"
                    helper="Natural speed"
                    isActive={isSpeaking && playbackMode === 'natural'}
                    onPress={() => void play('natural')}
                  />
                  <PlaybackButton
                    label="Slower"
                    helper="Assisted"
                    isActive={isSpeaking && playbackMode === 'assisted'}
                    onPress={() => void play('assisted')}
                  />
                </View>

                <ThemedText type="small" themeColor="textSecondary">
                  Prototype device voice · European Portuguese requested
                  {Platform.OS === 'ios' ? ' · Turn silent mode off' : ''}
                </ThemedText>
                {speechMessage && (
                  <View
                    accessibilityLiveRegion="polite"
                    style={[styles.speechNotice, { backgroundColor: theme.warningBackground }]}>
                    <ThemedText type="small" style={{ color: theme.warning }}>
                      {speechMessage}
                    </ThemedText>
                  </View>
                )}
              </View>

              <View style={styles.questionSection}>
                <ThemedText accessibilityRole="header" style={styles.question}>
                  {activity.prompt}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  Choose the closest meaning.
                </ThemedText>

                <View accessibilityRole="radiogroup" style={styles.options}>
                  {activity.options.map((option, index) => (
                    <AnswerOption
                      key={option.id}
                      option={option}
                      number={index + 1}
                      selected={selectedOptionId === option.id}
                      submitted={submitted}
                      correct={option.id === activity.correctOptionId}
                      onSelect={() => setSelectedOptionId(option.id)}
                    />
                  ))}
                </View>

                {!submitted ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ disabled: !selectedOptionId }}
                    disabled={!selectedOptionId}
                    onPress={submitAnswer}
                    style={({ pressed }) => [
                      styles.primaryButton,
                      { backgroundColor: theme.primary },
                      !selectedOptionId && styles.disabledButton,
                      pressed && selectedOptionId && styles.pressed,
                    ]}>
                    <ThemedText type="smallBold" style={{ color: theme.primaryContrast }}>
                      Check answer
                    </ThemedText>
                  </Pressable>
                ) : (
                  <View style={styles.resultSection}>
                    <View
                      accessibilityLiveRegion="polite"
                      style={[
                        styles.feedbackCard,
                        {
                          backgroundColor: result?.isCorrect
                            ? theme.successBackground
                            : theme.errorBackground,
                        },
                      ]}>
                      <ThemedText
                        type="smallBold"
                        style={{ color: result?.isCorrect ? theme.success : theme.error }}>
                        {result?.isCorrect ? 'NICE LISTENING' : 'TRY THAT SOUND AGAIN'}
                      </ThemedText>
                      <ThemedText
                        style={{ color: result?.isCorrect ? theme.success : theme.error }}>
                        {result?.feedback}
                      </ThemedText>
                    </View>

                    <View style={[styles.transcriptCard, { borderColor: theme.border }]}>
                      <ThemedText type="smallBold" themeColor="textSecondary">
                        TRANSCRIPT
                      </ThemedText>
                      <ThemedText style={styles.portugueseText}>{item.portuguese}</ThemedText>
                      <ThemedText themeColor="textSecondary">{item.english}</ThemedText>

                      <View style={[styles.divider, { backgroundColor: theme.border }]} />

                      <ThemedText type="smallBold" themeColor="textSecondary">
                        USEFUL CHUNKS
                      </ThemedText>
                      <View style={styles.chunkList}>
                        {item.chunks.map((chunk) => (
                          <View key={chunk.portuguese} style={styles.chunkRow}>
                            <ThemedText style={styles.chunkPortuguese}>{chunk.portuguese}</ThemedText>
                            <ThemedText type="small" themeColor="textSecondary">
                              {chunk.english}
                            </ThemedText>
                          </View>
                        ))}
                      </View>
                    </View>

                    <Pressable
                      accessibilityRole="button"
                      onPress={retry}
                      style={({ pressed }) => [
                        styles.secondaryButton,
                        { borderColor: theme.border },
                        pressed && styles.pressed,
                      ]}>
                      <ThemedText type="smallBold">Try again</ThemedText>
                    </Pressable>
                  </View>
                )}
              </View>
            </ThemedView>

            <ThemedText type="small" themeColor="textSecondary" style={styles.prototypeNote}>
              Prototype content: this Portuguese and its teaching notes are still awaiting native
              European Portuguese and teaching review.
            </ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function PlaybackButton({
  label,
  helper,
  isActive,
  onPress,
}: {
  label: string;
  helper: string;
  isActive: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${helper}`}
      accessibilityState={{ busy: isActive }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.playbackButton,
        {
          backgroundColor: isActive ? theme.primary : theme.surfaceRaised,
          borderColor: isActive ? theme.primary : theme.border,
        },
        pressed && styles.pressed,
      ]}>
      <View
        style={[
          styles.playIcon,
          { backgroundColor: isActive ? theme.primaryContrast : theme.primary },
        ]}>
        {isActive ? (
          <ActivityIndicator size="small" color={theme.primary} />
        ) : (
          <ThemedText style={[styles.playTriangle, { color: theme.primaryContrast }]}>▶</ThemedText>
        )}
      </View>
      <View>
        <ThemedText
          type="smallBold"
          style={{ color: isActive ? theme.primaryContrast : theme.text }}>
          {label}
        </ThemedText>
        <ThemedText
          type="small"
          style={{ color: isActive ? theme.primaryContrast : theme.textSecondary }}>
          {helper}
        </ThemedText>
      </View>
    </Pressable>
  );
}

function AnswerOption({
  option,
  number,
  selected,
  submitted,
  correct,
  onSelect,
}: {
  option: ListeningChoiceOption;
  number: number;
  selected: boolean;
  submitted: boolean;
  correct: boolean;
  onSelect: () => void;
}) {
  const theme = useTheme();
  const revealCorrect = submitted && correct;
  const revealIncorrect = submitted && selected && !correct;
  const borderColor = revealCorrect
    ? theme.success
    : revealIncorrect
      ? theme.error
      : selected
        ? theme.primary
        : theme.border;
  const backgroundColor = revealCorrect
    ? theme.successBackground
    : revealIncorrect
      ? theme.errorBackground
      : selected
        ? theme.backgroundSelected
        : theme.surfaceRaised;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled: submitted }}
      disabled={submitted}
      onPress={onSelect}
      style={({ pressed }) => [
        styles.option,
        { borderColor, backgroundColor },
        pressed && !submitted && styles.pressed,
      ]}>
      <View style={[styles.optionNumber, { borderColor }]}>
        <ThemedText type="smallBold" style={{ color: borderColor }}>
          {number}
        </ThemedText>
      </View>
      <ThemedText style={styles.optionLabel}>{option.label}</ThemedText>
      {(revealCorrect || revealIncorrect) && (
        <ThemedText
          accessibilityLabel={revealCorrect ? 'Correct answer' : 'Incorrect selection'}
          style={{ color: revealCorrect ? theme.success : theme.error }}>
          {revealCorrect ? '✓' : '×'}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: Spacing.four,
  },
  page: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  localeBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pageTitle: {
    fontSize: 38,
    lineHeight: 43,
    fontWeight: '700',
    maxWidth: 680,
  },
  pageDescription: {
    fontSize: 17,
    lineHeight: 25,
  },
  activityCard: {
    borderWidth: 1,
    borderRadius: 28,
    padding: Spacing.four,
    gap: Spacing.four,
    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.07)',
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.three,
  },
  activityTitle: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
    marginTop: Spacing.one,
  },
  draftBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  audioPanel: {
    borderRadius: 22,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  audioPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  audioPrompt: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '700',
    marginTop: 2,
  },
  waveform: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  waveBar: {
    width: 3,
    borderRadius: 999,
  },
  playbackButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  playbackButton: {
    minHeight: 64,
    minWidth: 150,
    flexGrow: 1,
    flexBasis: 180,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playTriangle: {
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 2,
  },
  speechNotice: {
    borderRadius: 12,
    padding: 12,
  },
  questionSection: {
    gap: Spacing.two,
  },
  question: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
  },
  options: {
    gap: 10,
    marginTop: Spacing.two,
  },
  option: {
    minHeight: 64,
    borderWidth: 1.5,
    borderRadius: 17,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionNumber: {
    width: 36,
    height: 36,
    borderWidth: 1.5,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: {
    flex: 1,
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  disabledButton: {
    opacity: 0.35,
  },
  secondaryButton: {
    minHeight: 52,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.99 }],
  },
  resultSection: {
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  feedbackCard: {
    borderRadius: 17,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  transcriptCard: {
    borderWidth: 1,
    borderRadius: 17,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  portugueseText: {
    fontSize: 22,
    lineHeight: 31,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: Spacing.one,
  },
  chunkList: {
    gap: 10,
  },
  chunkRow: {
    gap: 1,
  },
  chunkPortuguese: {
    fontWeight: '700',
  },
  prototypeNote: {
    textAlign: 'center',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
  },
});
