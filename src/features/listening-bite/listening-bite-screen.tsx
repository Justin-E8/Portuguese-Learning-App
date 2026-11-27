import { useRouter } from 'expo-router';
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
import { TileMark } from '@/components/tile-mark';
import { firstListeningBite, getLearningItem } from '@/content/library';
import type { ListeningChoiceOption } from '@/content/types';
import { Fonts, MaxPracticeWidth, Spacing } from '@/constants/theme';
import { evaluateListeningChoice } from '@/domain/listening-choice';
import { useTheme } from '@/hooks/use-theme';
import {
  EuropeanPortugueseVoiceUnavailableError,
  speakEuropeanPortuguese,
  stopSpeaking,
} from '@/services/pt-pt-speech';

const activity = firstListeningBite;
const item = getLearningItem(activity.itemId);
const waveformHeights = [18, 30, 44, 25, 54, 35, 21, 46, 28, 51, 33, 19, 40, 24];

type PlaybackMode = 'natural' | 'assisted';

export function ListeningBiteScreen() {
  const router = useRouter();
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const compact = width < 700;
  const wide = width >= 900;
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

  const leaveActivity = () => {
    void stopSpeaking();
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace('/');
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: compact ? 12 : Spacing.four,
              paddingLeft: safeAreaInsets.left + (compact ? 18 : Spacing.four),
              paddingRight: safeAreaInsets.right + (compact ? 18 : Spacing.four),
              paddingBottom: safeAreaInsets.bottom + Spacing.five,
            },
          ]}>
          <View style={styles.page}>
            <View style={[styles.masthead, { borderColor: theme.border }]}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Back to all activities"
                onPress={leaveActivity}
                style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
                <ThemedText style={[styles.backArrow, { color: theme.accent }]}>←</ThemedText>
                <ThemedText type="smallBold">ALL ACTIVITIES</ThemedText>
              </Pressable>

              <View style={styles.mastheadBrand}>
                <TileMark size={30} />
                {!compact && (
                  <View>
                    <ThemedText type="smallBold" style={styles.brandName}>
                      PORTUGUÊS
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary" style={styles.brandCaption}>
                      PT-PT
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.intro}>
              <View style={styles.introMeta}>
                <ThemedText type="smallBold" style={[styles.kicker, { color: theme.primary }]}>
                  ESCUTA · LISTENING
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  01 / 01 · ABOUT 90 SECONDS
                </ThemedText>
              </View>
              <ThemedText
                accessibilityRole="header"
                style={[
                  styles.pageTitle,
                  compact && styles.pageTitleCompact,
                  { fontFamily: Fonts.serif },
                ]}>
                Listen before you look.
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.pageDescription}>
                Hear one useful café order. You do not need to catch every word the first time.
              </ThemedText>
            </View>

            <View
              style={[
                styles.practiceFrame,
                wide && styles.practiceFrameWide,
                { borderColor: theme.border, backgroundColor: theme.surfaceRaised },
              ]}>
              <View
                style={[
                  styles.audioStage,
                  wide && styles.audioStageWide,
                  { backgroundColor: theme.primary },
                ]}>
                <View style={styles.audioHeading}>
                  <View style={styles.audioHeadingCopy}>
                    <ThemedText type="smallBold" style={{ color: theme.primaryContrast }}>
                      AT A CAFÉ · PORTUGAL
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.activityTitle,
                        { color: theme.primaryContrast, fontFamily: Fonts.serif },
                      ]}>
                      {activity.title}
                    </ThemedText>
                  </View>
                  <View style={[styles.draftLabel, { borderColor: theme.primaryContrast }]}>
                    <ThemedText type="smallBold" style={{ color: theme.primaryContrast }}>
                      DRAFT
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.soundPrompt}>
                  <View>
                    <ThemedText type="smallBold" style={{ color: theme.primaryContrast }}>
                      HEAR THE CUSTOMER’S ORDER
                    </ThemedText>
                    <ThemedText type="small" style={{ color: theme.primaryContrast }}>
                      Start at natural speed
                    </ThemedText>
                  </View>
                  <View
                    accessible={false}
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants"
                    style={styles.waveform}>
                    {waveformHeights.map((height, index) => (
                      <View
                        key={`${height}-${index}`}
                        style={[
                          styles.waveBar,
                          {
                            height,
                            backgroundColor: isSpeaking ? theme.accent : theme.primaryContrast,
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
                    helper="Assisted speed"
                    isActive={isSpeaking && playbackMode === 'assisted'}
                    onPress={() => void play('assisted')}
                  />
                </View>

                <View style={[styles.audioFootnote, { borderColor: theme.primaryContrast }]}>
                  <ThemedText type="small" style={{ color: theme.primaryContrast }}>
                    Prototype device voice · exact European Portuguese voice requested
                    {Platform.OS === 'ios' ? ' · turn silent mode off' : ''}
                  </ThemedText>
                </View>

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

              <View style={[styles.questionStage, wide && styles.questionStageWide]}>
                <View style={styles.questionHeading}>
                  <ThemedText type="smallBold" style={{ color: theme.accent }}>
                    YOUR TURN
                  </ThemedText>
                  <ThemedText
                    accessibilityRole="header"
                    style={[styles.question, { fontFamily: Fonts.serif }]}>
                    {activity.prompt}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    Choose the closest meaning.
                  </ThemedText>
                </View>

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
                      { backgroundColor: theme.accent },
                      !selectedOptionId && styles.disabledButton,
                      pressed && selectedOptionId && styles.pressed,
                    ]}>
                    <ThemedText type="smallBold" style={{ color: theme.accentContrast }}>
                      CHECK ANSWER
                    </ThemedText>
                  </Pressable>
                ) : (
                  <View style={styles.resultSection}>
                    <View
                      accessibilityLiveRegion="polite"
                      style={[
                        styles.feedback,
                        {
                          borderColor: result?.isCorrect ? theme.success : theme.error,
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

                    <View style={[styles.transcript, { borderColor: theme.border }]}>
                      <ThemedText type="smallBold" style={{ color: theme.accent }}>
                        NOW LOOK · TRANSCRIPT
                      </ThemedText>
                      <ThemedText style={[styles.portugueseText, { fontFamily: Fonts.serif }]}>
                        {item.portuguese}
                      </ThemedText>
                      <ThemedText themeColor="textSecondary">{item.english}</ThemedText>

                      <View style={[styles.chunkList, { borderColor: theme.border }]}>
                        <ThemedText
                          type="smallBold"
                          themeColor="textSecondary"
                          style={styles.chunkTitle}>
                          USEFUL CHUNKS
                        </ThemedText>
                        {item.chunks.map((chunk) => (
                          <View
                            key={chunk.portuguese}
                            style={[styles.chunkRow, { borderColor: theme.borderSubtle }]}>
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
                      <ThemedText type="smallBold">TRY AGAIN</ThemedText>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>

            <View style={[styles.prototypeNote, { borderColor: theme.borderSubtle }]}>
              <ThemedText type="smallBold" style={{ color: theme.warning }}>
                PROTOTYPE CONTENT
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.prototypeCopy}>
                This Portuguese, its teaching notes, and synthetic audio are still awaiting native
                European Portuguese and teaching review.
              </ThemedText>
            </View>
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
  const foreground = isActive ? theme.accentContrast : theme.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${helper}`}
      accessibilityState={{ busy: isActive }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.playbackButton,
        {
          backgroundColor: isActive ? theme.accent : theme.surfaceRaised,
          borderColor: isActive ? theme.accent : theme.primaryContrast,
        },
        pressed && styles.pressed,
      ]}>
      <View
        style={[
          styles.playIcon,
          { backgroundColor: isActive ? theme.accentContrast : theme.primary },
        ]}>
        {isActive ? (
          <ActivityIndicator size="small" color={theme.accent} />
        ) : (
          <ThemedText style={[styles.playTriangle, { color: theme.primaryContrast }]}>▶</ThemedText>
        )}
      </View>
      <View style={styles.playbackCopy}>
        <ThemedText type="smallBold" style={{ color: foreground }}>
          {label}
        </ThemedText>
        <ThemedText
          type="small"
          style={{ color: isActive ? theme.accentContrast : theme.textSecondary }}>
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
        : theme.borderSubtle;
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
          style={[
            styles.answerMark,
            { color: revealCorrect ? theme.success : theme.error },
          ]}>
          {revealCorrect ? '✓' : '×'}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: { alignItems: 'center' },
  page: { width: '100%', maxWidth: MaxPracticeWidth, gap: Spacing.four },
  masthead: {
    minHeight: 54,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  backButton: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 9 },
  backArrow: { fontSize: 24, lineHeight: 28 },
  mastheadBrand: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandName: { fontSize: 11, lineHeight: 13, letterSpacing: 1.1 },
  brandCaption: { fontSize: 10, lineHeight: 12, letterSpacing: 0.8 },
  intro: { gap: Spacing.two, paddingVertical: Spacing.four },
  introMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  kicker: { letterSpacing: 1.2 },
  pageTitle: {
    maxWidth: 760,
    fontSize: 62,
    lineHeight: 67,
    fontWeight: '600',
    letterSpacing: -1.5,
  },
  pageTitleCompact: { fontSize: 44, lineHeight: 49, letterSpacing: -0.8 },
  pageDescription: { maxWidth: 660, fontSize: 18, lineHeight: 27 },
  practiceFrame: { borderWidth: 2 },
  practiceFrameWide: { flexDirection: 'row', alignItems: 'stretch' },
  audioStage: { padding: Spacing.four, gap: Spacing.four },
  audioStageWide: { flex: 0.85 },
  audioHeading: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  audioHeadingCopy: { flex: 1, gap: Spacing.one },
  activityTitle: { fontSize: 35, lineHeight: 41, fontWeight: '600' },
  draftLabel: { borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4 },
  soundPrompt: { minHeight: 130, justifyContent: 'space-between', gap: Spacing.three },
  waveform: { height: 56, flexDirection: 'row', alignItems: 'center', gap: 4 },
  waveBar: { width: 4 },
  playbackButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  playbackButton: {
    minHeight: 68,
    minWidth: 130,
    flexGrow: 1,
    flexBasis: 150,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playIcon: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  playTriangle: { fontSize: 14, lineHeight: 18, marginLeft: 2 },
  playbackCopy: { flex: 1 },
  audioFootnote: { borderTopWidth: 1, paddingTop: 12, opacity: 0.88 },
  speechNotice: { padding: 12 },
  questionStage: { padding: Spacing.four, gap: Spacing.three },
  questionStageWide: { flex: 1.15 },
  questionHeading: { gap: 4 },
  question: { fontSize: 27, lineHeight: 34, fontWeight: '600' },
  options: { gap: 10 },
  option: {
    minHeight: 66,
    borderWidth: 1.5,
    padding: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionNumber: {
    width: 36,
    height: 36,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: { flex: 1 },
  answerMark: { fontSize: 22, lineHeight: 26, fontWeight: '700' },
  primaryButton: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.one,
  },
  disabledButton: { opacity: 0.35 },
  secondaryButton: {
    minHeight: 52,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.72 },
  resultSection: { gap: Spacing.three },
  feedback: { borderLeftWidth: 4, padding: Spacing.three, gap: Spacing.one },
  transcript: { borderTopWidth: 2, paddingTop: Spacing.three, gap: Spacing.two },
  portugueseText: { fontSize: 27, lineHeight: 35, fontWeight: '600' },
  chunkList: { borderTopWidth: 1, marginTop: Spacing.two },
  chunkTitle: { paddingVertical: 9 },
  chunkRow: { borderTopWidth: 1, paddingVertical: 9, gap: 1 },
  chunkPortuguese: { fontWeight: '700' },
  prototypeNote: {
    borderTopWidth: 1,
    paddingVertical: Spacing.three,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  prototypeCopy: { flex: 1, minWidth: 240 },
});
