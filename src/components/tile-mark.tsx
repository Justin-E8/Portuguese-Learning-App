import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export function TileMark({ size = 38, inverted = false }: { size?: number; inverted?: boolean }) {
  const theme = useTheme();
  const lineColor = inverted ? theme.primaryContrast : theme.tile;
  const centerColor = inverted ? theme.accent : theme.accent;
  const inset = Math.max(5, Math.round(size * 0.18));
  const diamondSize = Math.max(8, Math.round(size * 0.34));
  const centerSize = Math.max(4, Math.round(size * 0.13));

  return (
    <View
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.frame, { width: size, height: size, borderColor: lineColor }]}>
      <View
        style={[
          styles.corner,
          styles.topLeft,
          { width: inset, height: inset, borderColor: lineColor },
        ]}
      />
      <View
        style={[
          styles.corner,
          styles.topRight,
          { width: inset, height: inset, borderColor: lineColor },
        ]}
      />
      <View
        style={[
          styles.corner,
          styles.bottomLeft,
          { width: inset, height: inset, borderColor: lineColor },
        ]}
      />
      <View
        style={[
          styles.corner,
          styles.bottomRight,
          { width: inset, height: inset, borderColor: lineColor },
        ]}
      />
      <View
        style={[
          styles.diamond,
          {
            width: diamondSize,
            height: diamondSize,
            borderColor: lineColor,
            marginLeft: -diamondSize / 2,
            marginTop: -diamondSize / 2,
          },
        ]}
      />
      <View
        style={[
          styles.center,
          {
            width: centerSize,
            height: centerSize,
            marginLeft: -centerSize / 2,
            marginTop: -centerSize / 2,
            backgroundColor: centerColor,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    position: 'relative',
    borderWidth: 1.5,
  },
  corner: {
    position: 'absolute',
    borderWidth: 1.5,
  },
  topLeft: {
    top: -1.5,
    left: -1.5,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -1.5,
    right: -1.5,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -1.5,
    left: -1.5,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    right: -1.5,
    bottom: -1.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  diamond: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    borderWidth: 1.5,
    transform: [{ rotate: '45deg' }],
  },
  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    borderRadius: 99,
  },
});
