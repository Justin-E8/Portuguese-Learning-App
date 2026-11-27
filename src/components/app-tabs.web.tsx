import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  type TabTriggerSlotProps,
  type TabListProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ThemedText } from './themed-text';
import { TileMark } from './tile-mark';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Activities</TabButton>
          </TabTrigger>
          <TabTrigger name="library" href="/explore" asChild>
            <TabButton>Library</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  const theme = useTheme();

  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      style={({ pressed }) => [
        styles.tabPressable,
        { borderBottomColor: isFocused ? theme.accent : 'transparent' },
        pressed && styles.pressed,
      ]}>
      <View style={styles.tabButtonView}>
        <ThemedText
          type="smallBold"
          themeColor={isFocused ? 'text' : 'textSecondary'}
          style={styles.tabLabel}>
          {children}
        </ThemedText>
      </View>
    </Pressable>
  );
}

function CustomTabList(props: TabListProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const compact = width < 700;

  return (
    <View
      {...props}
      style={[
        styles.tabListContainer,
        compact
          ? { backgroundColor: theme.surfaceRaised, borderTopColor: theme.border }
          : { backgroundColor: theme.background, borderBottomColor: theme.border },
        compact ? styles.tabListContainerCompact : styles.tabListContainerWide,
      ]}>
      <View
        style={[
          styles.innerContainer,
          compact ? styles.innerContainerCompact : styles.innerContainerWide,
        ]}>
        {!compact && (
          <View style={styles.brand}>
            <TileMark size={34} />
            <View>
              <ThemedText type="smallBold" style={styles.brandName}>
                PORTUGUÊS
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.brandCaption}>
                SMALL PRACTICE · PT-PT
              </ThemedText>
            </View>
          </View>
        )}
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    height: '100%',
  },
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 10,
    borderColor: 'transparent',
  },
  tabListContainerWide: {
    top: 0,
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.four,
  },
  tabListContainerCompact: {
    bottom: 0,
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 8,
    boxShadow: '0 -8px 20px rgba(20, 35, 45, 0.08)',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: MaxContentWidth,
  },
  innerContainerWide: {
    flexGrow: 1,
    minHeight: 78,
    gap: Spacing.three,
  },
  innerContainerCompact: {
    width: '100%',
    gap: 4,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginRight: 'auto',
  },
  brandName: {
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 1.2,
  },
  brandCaption: {
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 0.6,
  },
  tabPressable: {
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: 150,
    borderBottomWidth: 3,
  },
  pressed: {
    opacity: 0.72,
  },
  tabButtonView: {
    minHeight: 54,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    letterSpacing: 0.2,
  },
});
