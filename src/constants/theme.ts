/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#172824',
    background: '#F7F4EC',
    backgroundElement: '#EFEADE',
    backgroundSelected: '#D9EAE3',
    textSecondary: '#5E6D68',
    surfaceRaised: '#FFFEFA',
    border: '#D8D3C7',
    primary: '#176B5B',
    primaryContrast: '#FFFFFF',
    accent: '#E8734A',
    success: '#176B5B',
    successBackground: '#DDEFE8',
    error: '#A23B32',
    errorBackground: '#F8E4DE',
    warning: '#8A5B12',
    warningBackground: '#F7EBCB',
  },
  dark: {
    text: '#F6F2E9',
    background: '#10211E',
    backgroundElement: '#1A302B',
    backgroundSelected: '#27463F',
    textSecondary: '#B2C1BC',
    surfaceRaised: '#18302A',
    border: '#355047',
    primary: '#74C9B5',
    primaryContrast: '#0C2721',
    accent: '#F29A77',
    success: '#8BD5C2',
    successBackground: '#1C453B',
    error: '#FFB0A2',
    errorBackground: '#4C2925',
    warning: '#F2CF7A',
    warningBackground: '#493B1D',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
