import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

interface ProgressBarProps {
  available: number;
  total: number;
  height?: number;
  animated?: boolean;
}

function getAvailabilityColor(available: number, total: number): string {
  const ratio = available / total;
  if (available === 0) return Colors.takenGrey;
  if (ratio <= 0.2) return Colors.availableAmber;
  return Colors.availableGreen;
}

export default function ProgressBar({
  available,
  total,
  height = 4,
  animated = false,
}: ProgressBarProps): React.ReactElement {
  const targetFraction = total > 0 ? available / total : 0;
  const animatedWidth = useRef(new Animated.Value(animated ? 0 : targetFraction * 100)).current;
  const color = getAvailabilityColor(available, total);

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: targetFraction * 100,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  }, [animated, targetFraction, animatedWidth]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  // Set non-animated value directly
  useEffect(() => {
    if (!animated) {
      animatedWidth.setValue(targetFraction * 100);
    }
  }, [animated, targetFraction, animatedWidth]);

  return (
    <View style={[styles.track, { height }]}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: widthInterpolated as unknown as number,
            height,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: Colors.takenGrey,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 999,
  },
});
