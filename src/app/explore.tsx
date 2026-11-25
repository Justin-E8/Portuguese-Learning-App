import { Platform, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { firstTopicPack, learningLibrary } from '@/content/library';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function LibraryScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const compactWeb = Platform.OS === 'web' && width < 700;
  const packItems = learningLibrary.items.filter((item) => firstTopicPack.itemIds.includes(item.id));
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
              <ThemedText type="smallBold" style={{ color: theme.accent }}>
                SHARED CONTENT LIBRARY
              </ThemedText>
              <ThemedText accessibilityRole="header" style={styles.title}>
                Learn a phrase here. Meet it again everywhere.
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.description}>
                Listening, vocabulary, sentence, and response practice will all draw from the same
                reviewed European Portuguese content.
              </ThemedText>
            </View>

            <ThemedView
              type="surfaceRaised"
              style={[styles.packCard, { borderColor: theme.border }]}>
              <View style={styles.packHeader}>
                <View style={styles.packHeading}>
                  <ThemedText type="smallBold" style={{ color: theme.primary }}>
                    FIRST PROTOTYPE PACK
                  </ThemedText>
                  <ThemedText accessibilityRole="header" style={styles.packTitle}>
                    {firstTopicPack.title}
                  </ThemedText>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: theme.warningBackground }]}>
                  <ThemedText type="smallBold" style={{ color: theme.warning }}>
                    {firstTopicPack.review.status.toLocaleUpperCase('en')}
                  </ThemedText>
                </View>
              </View>

              <ThemedText themeColor="textSecondary">{firstTopicPack.description}</ThemedText>

              <View style={styles.packMeta}>
                <View style={[styles.metaPill, { backgroundColor: theme.backgroundSelected }]}>
                  <ThemedText type="smallBold" style={{ color: theme.primary }}>
                    {firstTopicPack.level}
                  </ThemedText>
                </View>
                <ThemedText type="small" themeColor="textSecondary">
                  {packItems.length} {packItems.length === 1 ? 'item' : 'items'}
                </ThemedText>
              </View>

              {packItems.map((item) => (
                <View key={item.id} style={[styles.itemCard, { borderColor: theme.border }]}>
                  <View style={styles.itemTopRow}>
                    <ThemedText type="smallBold" themeColor="textSecondary">
                      {item.kind.toLocaleUpperCase('en')} · {item.register.toLocaleUpperCase('en')}
                    </ThemedText>
                    <ThemedText type="small" style={{ color: theme.accent }}>
                      pt-PT
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.portuguese}>{item.portuguese}</ThemedText>
                  <ThemedText themeColor="textSecondary">{item.english}</ThemedText>
                  <View style={styles.chunkPills}>
                    {item.chunks.map((chunk) => (
                      <View
                        key={chunk.portuguese}
                        style={[styles.chunkPill, { backgroundColor: theme.backgroundElement }]}>
                        <ThemedText type="smallBold">{chunk.portuguese}</ThemedText>
                        <ThemedText type="small" themeColor="textSecondary">
                          {chunk.english}
                        </ThemedText>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </ThemedView>

            <View style={[styles.reviewNote, { backgroundColor: theme.warningBackground }]}>
              <ThemedText type="smallBold" style={{ color: theme.warning }}>
                WHY ONLY ONE ITEM?
              </ThemedText>
              <ThemedText style={{ color: theme.warning }}>
                We are validating the practice loop and content standard before scaling the library.
                This draft will not be treated as production-ready until it has human review.
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
  title: {
    fontSize: 38,
    lineHeight: 43,
    fontWeight: '700',
    maxWidth: 700,
  },
  description: {
    fontSize: 17,
    lineHeight: 25,
    maxWidth: 680,
  },
  packCard: {
    borderWidth: 1,
    borderRadius: 28,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  packHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  packHeading: {
    gap: 2,
  },
  packTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  packMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  metaPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  itemCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  portuguese: {
    fontSize: 22,
    lineHeight: 31,
    fontWeight: '700',
  },
  chunkPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  chunkPill: {
    minWidth: 145,
    flexGrow: 1,
    flexBasis: 180,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 13,
    gap: 1,
  },
  reviewNote: {
    borderRadius: 18,
    padding: Spacing.three,
    gap: Spacing.one,
    marginBottom: Spacing.three,
  },
});
