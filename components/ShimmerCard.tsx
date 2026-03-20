import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Spacing, CARD_BORDER_RADIUS, CARD_IMAGE_RATIO } from '../constants/spacing';

interface ShimmerCardProps {
  cardWidth: number;
}

export default function ShimmerCard({ cardWidth }: ShimmerCardProps): React.ReactElement {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerAnim]);

  const imageHeight = cardWidth * CARD_IMAGE_RATIO;

  const shimmerStyle = {
    opacity: shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      {/* Image placeholder */}
      <View style={[styles.imagePlaceholder, { height: imageHeight }]}>
        <Animated.View style={[StyleSheet.absoluteFillObject, styles.shimmerOverlay, shimmerStyle]} />
      </View>

      <View style={styles.content}>
        {/* Category tag */}
        <View style={[styles.block, { width: '40%', height: 10, marginBottom: Spacing.sm }]}>
          <Animated.View style={[StyleSheet.absoluteFillObject, styles.shimmerOverlay, shimmerStyle]} />
        </View>

        {/* Asset name */}
        <View style={[styles.block, { width: '80%', height: 16, marginBottom: Spacing.xs }]}>
          <Animated.View style={[StyleSheet.absoluteFillObject, styles.shimmerOverlay, shimmerStyle]} />
        </View>

        {/* Second line of name */}
        <View style={[styles.block, { width: '60%', height: 16, marginBottom: Spacing.md }]}>
          <Animated.View style={[StyleSheet.absoluteFillObject, styles.shimmerOverlay, shimmerStyle]} />
        </View>

        {/* Price */}
        <View style={[styles.block, { width: '50%', height: 14, marginBottom: Spacing.md }]}>
          <Animated.View style={[StyleSheet.absoluteFillObject, styles.shimmerOverlay, shimmerStyle]} />
        </View>

        {/* Progress bar */}
        <View style={[styles.block, { width: '100%', height: 4, marginBottom: Spacing.sm }]}>
          <Animated.View style={[StyleSheet.absoluteFillObject, styles.shimmerOverlay, shimmerStyle]} />
        </View>

        {/* Metadata */}
        <View style={[styles.block, { width: '70%', height: 12 }]}>
          <Animated.View style={[StyleSheet.absoluteFillObject, styles.shimmerOverlay, shimmerStyle]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: CARD_BORDER_RADIUS,
    overflow: 'hidden',
    marginBottom: Spacing.base,
  },
  imagePlaceholder: {
    width: '100%',
    backgroundColor: Colors.shimmerBase,
    overflow: 'hidden',
  },
  content: {
    padding: Spacing.md,
  },
  block: {
    backgroundColor: Colors.shimmerBase,
    borderRadius: 4,
    overflow: 'hidden',
  },
  shimmerOverlay: {
    backgroundColor: Colors.shimmerHighlight,
  },
});
