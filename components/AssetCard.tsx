import React, { useRef } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Asset } from '../constants/mockData';
import { Colors } from '../constants/colors';
import { Spacing, CARD_BORDER_RADIUS, CARD_IMAGE_RATIO } from '../constants/spacing';
import { Typography } from '../constants/typography';
import ProgressBar from './ProgressBar';

interface AssetCardProps {
  asset: Asset;
  cardWidth: number;
}

function getAvailabilityColor(available: number, total: number): string {
  const ratio = available / total;
  if (available === 0) return Colors.takenGrey;
  if (ratio <= 0.2) return Colors.availableAmber;
  return Colors.availableGreen;
}

function formatNOK(value: number): string {
  return value.toLocaleString('nb-NO').replace(/,/g, ' ').replace(/\./g, ' ');
}

export default function AssetCard({ asset, cardWidth }: AssetCardProps): React.ReactElement {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const imageHeight = cardWidth * CARD_IMAGE_RATIO;
  const availabilityColor = getAvailabilityColor(asset.availableShares, asset.totalShares);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/asset/${asset.id}`);
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${asset.name} by ${asset.artist}`}
    >
      <Animated.View style={[styles.card, { width: cardWidth, transform: [{ scale: scaleAnim }] }]}>
        {/* Hero Image */}
        <View style={{ height: imageHeight, overflow: 'hidden' }}>
          <Image
            source={{ uri: asset.imageUrl }}
            style={{ width: cardWidth, height: imageHeight }}
            contentFit="cover"
            transition={300}
            recyclingKey={asset.id}
          />
        </View>

        {/* Card Content */}
        <View style={styles.content}>
          {/* Category overline */}
          <Text style={styles.category} numberOfLines={1}>
            {asset.category.toUpperCase()}
          </Text>

          {/* Asset name */}
          <Text style={styles.name} numberOfLines={2}>
            {asset.name}
          </Text>

          {/* Price per share */}
          <Text style={styles.price}>
            {formatNOK(asset.sharePrice)} {asset.currency} / share
          </Text>

          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <ProgressBar
              available={asset.availableShares}
              total={asset.totalShares}
              height={4}
              animated={false}
            />
          </View>

          {/* Availability text */}
          <Text style={[styles.availabilityText, { color: availabilityColor }]}>
            {asset.availableShares}/{asset.totalShares} available
          </Text>

          {/* Metadata */}
          <Text style={styles.metadata} numberOfLines={1}>
            {asset.coOwnerCount} co-owners · {formatNOK(asset.totalValue)} {asset.currency} total
          </Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: CARD_BORDER_RADIUS,
    overflow: 'hidden',
    marginBottom: Spacing.base,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  content: {
    padding: Spacing.md,
  },
  category: {
    ...Typography.overline,
    color: Colors.textTertiary,
    marginBottom: Spacing.xs,
  },
  name: {
    ...Typography.headingLarge,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  price: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  progressContainer: {
    marginBottom: Spacing.sm,
  },
  availabilityText: {
    ...Typography.labelMedium,
    marginBottom: Spacing.xs,
  },
  metadata: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
});
