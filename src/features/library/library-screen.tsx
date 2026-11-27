import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TileMark } from '@/components/tile-mark';
import { firstTopicPack, learningLibrary } from '@/content/library';
import { BottomTabInset, Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function LibraryScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const compact = width < 700;
  const compactWeb = Platform.OS === 'web' && compact;
  const packItems = learningLibrary.items.filter((item) => firstTopicPack.itemIds.includes(item.id));
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
            <View style={[styles.header, !compact && styles.headerWide]}>
              <View style={styles.headerCopy}>
                <ThemedText type="smallBold" style={[styles.kicker, { color: theme.accent }]}>
                  BIBLIOTECA · SHARED LIBRARY
                </ThemedText>
                <ThemedText
                  accessibilityRole="header"
                  style={[
                    styles.title,
                    compact && styles.titleCompact,
                    { fontFamily: Fonts.serif },
                  ]}>
                  Learn it once. Meet it everywhere.
                </ThemedText>
                <ThemedText themeColor="textSecondary" style={styles.description}>
                  Listening, vocabulary, sentence, and response practice all grow from the same
                  reviewed European Portuguese.
                </ThemedText>
              </View>

              <View
                style={[
                  styles.headerMark,
                  compact && styles.headerMarkCompact,
                  { borderColor: theme.border },
                ]}>
                <TileMark size={compact ? 58 : 72} />
                <ThemedText type="smallBold" style={{ color: theme.primary }}>
                  PT-PT ONLY
                </ThemedText>
              </View>
            </View>

            <View style={[styles.pack, { borderColor: theme.border }]}>
              <View
                style={[
                  styles.packHeader,
                  compact && styles.packHeaderCompact,
                  { backgroundColor: theme.primary },
                ]}>
                <View style={styles.packHeading}>
                  <ThemedText type="smallBold" style={{ color: theme.primaryContrast }}>
                    PROTOTYPE PACK 01
                  </ThemedText>
                  <ThemedText
                    accessibilityRole="header"
                    style={[
                      styles.packTitle,
                      compact && styles.packTitleCompact,
                      { color: theme.primaryContrast, fontFamily: Fonts.serif },
                    ]}>
                    {firstTopicPack.title}
                  </ThemedText>
                  <ThemedText style={{ color: theme.primaryContrast }}>
                    {firstTopicPack.description}
                  </ThemedText>
                </View>

                <View style={styles.packMeta}>
                  <ThemedText type="smallBold" style={{ color: theme.primaryContrast }}>
                    {firstTopicPack.level}
                  </ThemedText>
                  <View style={[styles.metaRule, { backgroundColor: theme.primaryContrast }]} />
                  <ThemedText type="small" style={{ color: theme.primaryContrast }}>
                    {packItems.length} {packItems.length === 1 ? 'item' : 'items'}
                  </ThemedText>
                  <ThemedText type="smallBold" style={{ color: theme.primaryContrast }}>
                    {firstTopicPack.review.status.toLocaleUpperCase('en')}
                  </ThemedText>
                </View>
              </View>

              {packItems.map((item, itemIndex) => (
                <View key={item.id} style={[styles.item, compact && styles.itemCompact]}>
                  <View style={[styles.itemIndex, compact && styles.itemIndexCompact]}>
                    <ThemedText
                      style={[styles.itemNumber, { color: theme.accent, fontFamily: Fonts.serif }]}>
                      {String(itemIndex + 1).padStart(2, '0')}
                    </ThemedText>
                    <ThemedText type="smallBold" themeColor="textSecondary">
                      {item.kind.toLocaleUpperCase('en')}
                    </ThemedText>
                  </View>

                  <View style={styles.itemContent}>
                    <View style={[styles.localeLine, { borderColor: theme.borderSubtle }]}>
                      <ThemedText type="smallBold" themeColor="textSecondary">
                        {item.register.toLocaleUpperCase('en')} REGISTER
                      </ThemedText>
                      <ThemedText type="smallBold" style={{ color: theme.primary }}>
                        PORTUGAL · PT-PT
                      </ThemedText>
                    </View>

                    <ThemedText
                      style={[
                        styles.portuguese,
                        compact && styles.portugueseCompact,
                        { fontFamily: Fonts.serif },
                      ]}>
                      {item.portuguese}
                    </ThemedText>
                    <ThemedText themeColor="textSecondary" style={styles.english}>
                      {item.english}
                    </ThemedText>

                    <View style={[styles.chunks, { borderColor: theme.border }]}>
                      <ThemedText type="smallBold" style={[styles.chunkHeading, { color: theme.accent }]}>
                        USEFUL CHUNKS
                      </ThemedText>
                      {item.chunks.map((chunk) => (
                        <View
                          key={chunk.portuguese}
                          style={[styles.chunkRow, { borderColor: theme.borderSubtle }]}>
                          <ThemedText style={styles.chunkPortuguese}>{chunk.portuguese}</ThemedText>
                          <ThemedText type="small" themeColor="textSecondary" style={styles.chunkEnglish}>
                            {chunk.english}
                          </ThemedText>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={[styles.reviewNote, { borderColor: theme.warning }]}>
              <ThemedText type="smallBold" style={{ color: theme.warning }}>
                WHY ONLY ONE ITEM?
              </ThemedText>
              <ThemedText style={{ color: theme.warning }}>
                We are validating the practice loop and content standard before scaling the library.
                This Portuguese remains a draft until it has native and teaching review.
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
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
    gap: Spacing.five,
  },
  header: {
    gap: Spacing.four,
    paddingVertical: Spacing.three,
  },
  headerWide: {
    minHeight: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerCopy: {
    flex: 1,
    maxWidth: 760,
    gap: Spacing.three,
  },
  kicker: {
    letterSpacing: 1.2,
  },
  title: {
    maxWidth: 720,
    fontSize: 66,
    lineHeight: 70,
    fontWeight: '600',
    letterSpacing: -1.8,
  },
  titleCompact: {
    fontSize: 46,
    lineHeight: 50,
    letterSpacing: -1,
  },
  description: {
    maxWidth: 680,
    fontSize: 18,
    lineHeight: 28,
  },
  headerMark: {
    width: 170,
    height: 170,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  headerMarkCompact: {
    width: 128,
    height: 128,
  },
  pack: {
    borderWidth: 2,
  },
  packHeader: {
    minHeight: 240,
    padding: Spacing.four,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.four,
  },
  packHeaderCompact: {
    flexDirection: 'column',
  },
  packHeading: {
    flex: 1,
    maxWidth: 690,
    gap: Spacing.two,
  },
  packTitle: {
    fontSize: 48,
    lineHeight: 54,
    fontWeight: '600',
  },
  packTitleCompact: {
    fontSize: 36,
    lineHeight: 42,
  },
  packMeta: {
    minWidth: 130,
    alignItems: 'flex-end',
    gap: 8,
  },
  metaRule: {
    width: 42,
    height: 1,
    opacity: 0.7,
  },
  item: {
    padding: Spacing.four,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.four,
  },
  itemCompact: {
    flexDirection: 'column',
    gap: Spacing.three,
  },
  itemIndex: {
    width: 90,
    gap: 2,
  },
  itemIndexCompact: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  itemNumber: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '600',
  },
  itemContent: {
    flex: 1,
    gap: Spacing.three,
  },
  localeLine: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  portuguese: {
    maxWidth: 760,
    fontSize: 38,
    lineHeight: 47,
    fontWeight: '600',
  },
  portugueseCompact: {
    fontSize: 29,
    lineHeight: 38,
  },
  english: {
    fontSize: 18,
    lineHeight: 27,
  },
  chunks: {
    borderTopWidth: 2,
    marginTop: Spacing.two,
  },
  chunkHeading: {
    paddingVertical: 10,
    letterSpacing: 0.8,
  },
  chunkRow: {
    borderTopWidth: 1,
    paddingVertical: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  chunkPortuguese: {
    flex: 1,
    minWidth: 150,
    fontWeight: '700',
  },
  chunkEnglish: {
    flex: 1,
    minWidth: 170,
  },
  reviewNote: {
    borderLeftWidth: 4,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.one,
    marginBottom: Spacing.three,
  },
});
