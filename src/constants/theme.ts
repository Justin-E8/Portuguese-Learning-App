/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#173247',
    background: '#F2EBDD',
    backgroundElement: '#E7DDCC',
    backgroundSelected: '#D8E6F2',
    textSecondary: '#5A6872',
    surfaceRaised: '#FFFDF7',
    border: '#214B69',
    borderSubtle: '#C9BDAA',
    primary: '#1A5A8A',
    primaryContrast: '#FFFDF7',
    accent: '#D65B3D',
    accentContrast: '#FFF9F1',
    accentSoft: '#F2C8B9',
    tile: '#2C70A6',
    success: '#24624F',
    successBackground: '#DCEDE3',
    error: '#A33C32',
    errorBackground: '#F4DED6',
    warning: '#815814',
    warningBackground: '#F3E3B8',
  },
  dark: {
    text: '#F8F0E2',
    background: '#101F2A',
    backgroundElement: '#192D3A',
    backgroundSelected: '#223F55',
    textSecondary: '#B9C4C9',
    surfaceRaised: '#172B38',
    border: '#76A9CC',
    borderSubtle: '#405767',
    primary: '#77ADD2',
    primaryContrast: '#102331',
    accent: '#F18769',
    accentContrast: '#24130F',
    accentSoft: '#63372F',
    tile: '#85B9DB',
    success: '#86CBB2',
    successBackground: '#1C4539',
    error: '#FFB1A4',
    errorBackground: '#4B2926',
    warning: '#F0CD78',
    warningBackground: '#463A1D',
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
export const MaxContentWidth = 1120;
export const MaxPracticeWidth = 980;
