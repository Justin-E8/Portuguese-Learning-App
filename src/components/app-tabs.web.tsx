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
import { ThemedView } from './themed-view';

import { MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Practice</TabButton>
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
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      style={({ pressed }) => [styles.tabPressable, pressed && styles.pressed]}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}>
        <ThemedText type="smallBold" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

function CustomTabList(props: TabListProps) {
  const { width } = useWindowDimensions();
  const compact = width < 700;

  return (
    <View
      {...props}
      style={[
        styles.tabListContainer,
        compact ? styles.tabListContainerCompact : styles.tabListContainerWide,
      ]}>
      <ThemedView
        type="backgroundElement"
        style={[
          styles.innerContainer,
          compact ? styles.innerContainerCompact : styles.innerContainerWide,
        ]}>
        {!compact && (
          <View style={styles.brand}>
            <View style={styles.brandDot} />
            <ThemedText type="smallBold">Português · PT</ThemedText>
          </View>
        )}
        {props.children}
      </ThemedView>
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
  },
  tabListContainerWide: {
    top: 0,
    padding: Spacing.three,
  },
  tabListContainerCompact: {
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: MaxContentWidth,
    borderWidth: 1,
    borderColor: 'rgba(100, 100, 100, 0.16)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
  },
  innerContainerWide: {
    flexGrow: 1,
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.five,
  },
  innerContainerCompact: {
    width: '100%',
    gap: Spacing.two,
    padding: 7,
    borderRadius: 20,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginRight: 'auto',
  },
  brandDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E8734A',
  },
  tabPressable: {
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: 180,
  },
  pressed: {
    opacity: 0.72,
  },
  tabButtonView: {
    minHeight: 42,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
