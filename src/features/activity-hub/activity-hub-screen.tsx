import { Link, type Href } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TileMark } from '@/components/tile-mark';
import { BottomTabInset, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ActivitySummary = {
  number: string;
  portugueseName: string;
  englishName: string;
  description: string;
  duration: string;
  href?: '/listening';
};

const activities: ActivitySummary[] = [
  {
    number: '01',
    portugueseName: 'Escuta',
    englishName: 'Listening',
    description: 'Catch a useful phrase at natural speed, then listen again with support.',
    duration: '1–2 min',
    href: '/listening',
  },
  {
    number: '02',
    portugueseName: 'Palavras',
    englishName: 'Phrases & vocabulary',
    description: 'Recall connected words, short phrases, and everyday chunks by topic.',
    duration: '1–3 min',
  },
  {
    number: '03',
    portugueseName: 'Frases',
    englishName: 'Sentence practice',
    description: 'Build and understand short sentences without turning practice into a grammar lecture.',
    duration: '2–4 min',
  },
  {
    number: '04',
    portugueseName: 'Responde',
    englishName: 'Response practice',
    description: 'Choose what you would naturally say next in a small everyday exchange.',
    duration: '2–4 min',
  },
  {
    number: '05',
    portugueseName: 'Revisão',
    englishName: 'Quick review',
    description: 'Mix saved, difficult, and recently seen language into one short session.',
    duration: '1 / 3 / 5 min',
  },
];

export function ActivityHubScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const compact = width < 700;
  const wide = width >= 900;
  const compactWeb = Platform.OS === 'web' && compact;
  const webChromePadding = Platform.select({
    web: compactWeb
      ? { paddingTop: Spacing.four, paddingBottom: 112 }
      : { paddingTop: 112, paddingBottom: Spacing.six },
  });

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingLeft: safeAreaInsets.left + (compact ? 18 : Spacing.four),
              paddingRight: safeAreaInsets.right + (compact ? 18 : Spacing.four),
              paddingBottom: safeAreaInsets.bottom + BottomTabInset + Spacing.five,
            },
            webChromePadding,
          ]}>
          <View style={styles.page}>
            <View style={[styles.hero, wide && styles.heroWide]}>
              <View style={styles.heroCopy}>
                <View style={styles.kickerRow}>
                  <View style={[styles.kickerRule, { backgroundColor: theme.accent }]} />
                  <ThemedText type="smallBold" style={[styles.kicker, { color: theme.primary }]}>
                    EUROPEAN PORTUGUESE · PT-PT
                  </ThemedText>
                </View>

                <ThemedText
                  accessibilityRole="header"
                  style={[
                    styles.heroTitle,
                    compact && styles.heroTitleCompact,
                    { fontFamily: Fonts.serif },
                  ]}>
                  A few minutes.{compact ? '\n' : ' '}Real Portuguese.
                </ThemedText>
                <ThemedText themeColor="textSecondary" style={styles.heroDescription}>
                  Pick one skill, practise something useful, and leave when you need to. No long
                  lesson required.
                </ThemedText>

                <View style={[styles.timeNote, { borderColor: theme.border }]}>
                  <ThemedText type="smallBold" style={{ color: theme.accent }}>
                    START SMALL
                  </ThemedText>
                  <ThemedText style={styles.timeNoteText}>
                    The first Listening Bite takes about 90 seconds.
                  </ThemedText>
                </View>
              </View>

              <View style={[styles.tilePanel, { backgroundColor: theme.primary }]}>
                <View style={styles.tileGrid}>
                  {Array.from({ length: 6 }, (_, index) => (
                    <TileMark key={index} size={compact ? 54 : 64} inverted />
                  ))}
                </View>
                <View style={[styles.tileCaption, { borderColor: theme.primaryContrast }]}>
                  <ThemedText type="smallBold" style={{ color: theme.primaryContrast }}>
                    PORTUGUÊS
                  </ThemedText>
                  <ThemedText type="small" style={{ color: theme.primaryContrast }}>
                    useful language, little by little
                  </ThemedText>
                </View>
              </View>
            </View>

            <View style={styles.activitiesSection}>
              <View style={[styles.sectionHeading, compact && styles.sectionHeadingCompact]}>
                <View>
                  <ThemedText type="smallBold" style={{ color: theme.accent }}>
                    CHOOSE YOUR PRACTICE
                  </ThemedText>
                  <ThemedText
                    accessibilityRole="header"
                    style={[styles.sectionTitle, { fontFamily: Fonts.serif }]}>
                    What do you want to train?
                  </ThemedText>
                </View>
                <ThemedText type="small" themeColor="textSecondary" style={styles.sectionNote}>
                  One content library · five ways to practise
                </ThemedText>
              </View>

              <View style={[styles.activityList, { borderColor: theme.border }]}>
                {activities.map((activity) => (
                  <ActivityRow key={activity.number} activity={activity} compact={compact} />
                ))}
              </View>
            </View>

            <View style={[styles.prototypeNote, { borderColor: theme.borderSubtle }]}>
              <ThemedText type="smallBold" style={{ color: theme.primary }}>
                EARLY PROTOTYPE
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.prototypeCopy}>
                Listening is ready to try. The other activity families are shown now so the app’s
                structure is clear, but they will open only when their own practice flow is built.
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function ActivityRow({ activity, compact }: { activity: ActivitySummary; compact: boolean }) {
  const theme = useTheme();
  const available = Boolean(activity.href);
  const content = (
    <View
      accessible={!available}
      accessibilityLabel={
        available
          ? undefined
          : `${activity.englishName}, ${activity.duration}, planned activity not available yet`
      }
      style={[
        styles.activityRow,
        compact && styles.activityRowCompact,
        { borderColor: theme.border },
      ]}>
      <ThemedText
        style={[
          styles.activityNumber,
          compact && styles.activityNumberCompact,
          { color: available ? theme.accent : theme.textSecondary, fontFamily: Fonts.serif },
        ]}>
        {activity.number}
      </ThemedText>

      <View style={styles.activityCopy}>
        <View style={styles.activityTitleRow}>
          <ThemedText
            style={[
              styles.activityName,
              compact && styles.activityNameCompact,
              { fontFamily: Fonts.serif },
            ]}>
            {activity.portugueseName}
          </ThemedText>
          <ThemedText type="smallBold" style={{ color: theme.primary }}>
            {activity.englishName.toLocaleUpperCase('en')}
          </ThemedText>
        </View>
        <ThemedText type={compact ? 'small' : 'default'} themeColor="textSecondary">
          {activity.description}
        </ThemedText>
      </View>

      <View style={[styles.activityState, compact && styles.activityStateCompact]}>
        <ThemedText type="smallBold" themeColor="textSecondary">
          {activity.duration}
        </ThemedText>
        {available ? (
          <View style={[styles.startMark, { backgroundColor: theme.accent }]}>
            <ThemedText
              accessibilityLabel="Open activity"
              style={[styles.startArrow, { color: theme.accentContrast }]}>
              →
            </ThemedText>
          </View>
        ) : (
          <ThemedText type="smallBold" style={[styles.plannedLabel, { color: theme.textSecondary }]}>
            PLANNED
          </ThemedText>
        )}
      </View>
    </View>
  );

  if (!activity.href) {
    return content;
  }

  return (
    <Link href={activity.href as Href} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`Start ${activity.englishName}, ${activity.duration}`}
        style={({ pressed }) => [
          styles.availableRow,
          { backgroundColor: pressed ? theme.backgroundSelected : theme.surfaceRaised },
          pressed && styles.pressed,
        ]}>
        {content}
      </Pressable>
    </Link>
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
    gap: 72,
  },
  hero: {
    gap: Spacing.five,
  },
  heroWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: 440,
  },
  heroCopy: {
    flex: 1.25,
    justifyContent: 'center',
    gap: Spacing.three,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  kickerRule: {
    width: 34,
    height: 4,
  },
  kicker: {
    letterSpacing: 1.2,
  },
  heroTitle: {
    maxWidth: 690,
    fontSize: 76,
    lineHeight: 79,
    fontWeight: '600',
    letterSpacing: -2.2,
  },
  heroTitleCompact: {
    fontSize: 50,
    lineHeight: 52,
    letterSpacing: -1.2,
  },
  heroDescription: {
    maxWidth: 620,
    fontSize: 19,
    lineHeight: 29,
  },
  timeNote: {
    maxWidth: 460,
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    marginTop: Spacing.two,
    gap: 2,
  },
  timeNoteText: {
    fontSize: 15,
    lineHeight: 22,
  },
  tilePanel: {
    flex: 0.75,
    minHeight: 330,
    padding: Spacing.four,
    justifyContent: 'space-between',
    gap: Spacing.four,
  },
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 12,
    flex: 1,
  },
  tileCaption: {
    borderTopWidth: 1,
    paddingTop: 12,
    gap: 2,
  },
  activitiesSection: {
    gap: Spacing.four,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: Spacing.four,
  },
  sectionHeadingCompact: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '600',
    marginTop: 4,
  },
  sectionNote: {
    paddingBottom: 5,
  },
  activityList: {
    borderTopWidth: 2,
  },
  availableRow: {
    width: '100%',
  },
  activityRow: {
    minHeight: 132,
    borderBottomWidth: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
  },
  activityRowCompact: {
    minHeight: 148,
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 0,
  },
  activityNumber: {
    width: 62,
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '600',
  },
  activityNumberCompact: {
    width: 44,
    fontSize: 31,
    lineHeight: 38,
  },
  activityCopy: {
    flex: 1,
    gap: 7,
  },
  activityTitleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: 10,
  },
  activityName: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '600',
  },
  activityNameCompact: {
    fontSize: 27,
    lineHeight: 34,
  },
  activityState: {
    width: 112,
    alignItems: 'flex-end',
    gap: 10,
  },
  activityStateCompact: {
    width: 70,
  },
  startMark: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startArrow: {
    fontSize: 25,
    lineHeight: 29,
    fontWeight: '700',
  },
  plannedLabel: {
    fontSize: 11,
    letterSpacing: 1.1,
  },
  pressed: {
    opacity: 0.72,
  },
  prototypeNote: {
    borderTopWidth: 1,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  prototypeCopy: {
    flex: 1,
    minWidth: 240,
    maxWidth: 760,
  },
});
