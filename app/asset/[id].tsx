import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  useWindowDimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_ASSETS } from '../../constants/mockData';
import { Colors } from '../../constants/colors';
import { Spacing, CARD_BORDER_RADIUS } from '../../constants/spacing';
import { Typography } from '../../constants/typography';
import ProgressBar from '../../components/ProgressBar';

function formatNOK(value: number): string {
  return value.toLocaleString('nb-NO').replace(/,/g, ' ').replace(/\./g, ' ');
}

function getAvailabilityColor(available: number, total: number): string {
  const ratio = available / total;
  if (available === 0) return Colors.takenGrey;
  if (ratio <= 0.2) return Colors.availableAmber;
  return Colors.availableGreen;
}

export default function AssetDetailScreen(): React.ReactElement {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const asset = MOCK_ASSETS.find((a) => a.id === id);

  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;

  // Staggered fade-in for content sections
  const categoryOpacity = useRef(new Animated.Value(0)).current;
  const nameOpacity = useRef(new Animated.Value(0)).current;
  const priceOpacity = useRef(new Animated.Value(0)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;

  // Back button fade
  const backButtonOpacity = useRef(new Animated.Value(1)).current;

  // Computed hero height
  const heroHeight = Math.max(screenHeight * 0.56, insets.top + 200);

  useEffect(() => {
    // Staggered fade-in
    Animated.stagger(50, [
      Animated.timing(categoryOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(nameOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(priceOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(detailsOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [categoryOpacity, nameOpacity, priceOpacity, detailsOpacity]);

  // Back button fades to subtle when scrolled past hero
  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      const opacity = value > heroHeight * 0.5 ? 0.7 : 1;
      backButtonOpacity.setValue(opacity);
    });
    return () => scrollY.removeListener(listener);
  }, [scrollY, heroHeight, backButtonOpacity]);

  if (!asset) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Asset not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.errorBack}>
          <Text style={[styles.errorText, { color: Colors.accent }]}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const availabilityColor = getAvailabilityColor(asset.availableShares, asset.totalShares);

  // Parallax image translation: image scrolls at half speed
  const imageTranslateY = scrollY.interpolate({
    inputRange: [-heroHeight, 0, heroHeight],
    outputRange: [-heroHeight / 2, 0, heroHeight / 2],
    extrapolate: 'clamp',
  });

  const backTop = insets.top + (Platform.OS === 'android' ? 8 : 4);

  return (
    <View style={styles.container}>
      {/* Floating back button */}
      <Animated.View style={[styles.backButtonWrapper, { top: backTop, opacity: backButtonOpacity }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
            size={20}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.xxl }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Image with parallax */}
        <View style={[styles.heroContainer, { height: heroHeight }]}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              { transform: [{ translateY: imageTranslateY }] },
            ]}
          >
            <Image
              source={{ uri: asset.imageUrl }}
              style={[StyleSheet.absoluteFillObject, { height: heroHeight * 1.3 }]}
              contentFit="cover"
              transition={300}
              recyclingKey={asset.id}
            />
          </Animated.View>
        </View>

        {/* Content Panel */}
        <View style={styles.contentPanel}>
          {/* Category */}
          <Animated.Text style={[styles.category, { opacity: categoryOpacity }]}>
            {asset.category.toUpperCase()}
          </Animated.Text>

          {/* Name */}
          <Animated.Text style={[styles.name, { opacity: nameOpacity }]}>
            {asset.name}
          </Animated.Text>

          {/* Artist & Year */}
          <Animated.Text style={[styles.artist, { opacity: nameOpacity }]}>
            {asset.artist} · {asset.year}
          </Animated.Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Pricing row */}
          <Animated.View style={[styles.pricingRow, { opacity: priceOpacity }]}>
            <View style={styles.pricingItem}>
              <Text style={styles.pricingLabel}>Share price</Text>
              <Text style={styles.pricingValue}>
                {formatNOK(asset.sharePrice)} {asset.currency}
              </Text>
            </View>
            <View style={styles.pricingItem}>
              <Text style={styles.pricingLabel}>Total value</Text>
              <Text style={styles.pricingValue}>
                {formatNOK(asset.totalValue)} {asset.currency}
              </Text>
            </View>
            <View style={styles.pricingItem}>
              <Text style={styles.pricingLabel}>Co-owners</Text>
              <Text style={styles.pricingValue}>{asset.coOwnerCount}</Text>
            </View>
          </Animated.View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Availability section */}
          <Animated.View style={{ opacity: detailsOpacity }}>
            <View style={styles.availabilityHeader}>
              <Text style={styles.sectionLabel}>Availability</Text>
              <Text style={[styles.availabilityCount, { color: availabilityColor }]}>
                {asset.availableShares}/{asset.totalShares} shares
              </Text>
            </View>

            <View style={styles.progressBarContainer}>
              <ProgressBar
                available={asset.availableShares}
                total={asset.totalShares}
                height={8}
                animated={true}
              />
            </View>
          </Animated.View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <Animated.View style={{ opacity: detailsOpacity }}>
            <Text style={styles.sectionLabel}>About this work</Text>
            <Text style={styles.description}>{asset.description}</Text>
          </Animated.View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Details grid */}
          <Animated.View style={{ opacity: detailsOpacity }}>
            <Text style={styles.sectionLabel}>Details</Text>
            <View style={styles.detailsGrid}>
              <DetailRow label="Medium" value={asset.medium} />
              <DetailRow label="Dimensions" value={asset.dimensions} />
              <DetailRow label="Year" value={String(asset.year)} />
              <DetailRow label="Category" value={asset.category} />
            </View>
          </Animated.View>

          {/* CTA */}
          <Animated.View style={[styles.ctaContainer, { opacity: detailsOpacity }]}>
            <TouchableOpacity
              style={[
                styles.ctaButton,
                asset.availableShares === 0 && styles.ctaButtonDisabled,
              ]}
              disabled={asset.availableShares === 0}
              accessibilityRole="button"
              accessibilityLabel={
                asset.availableShares === 0 ? 'Fully subscribed' : 'Buy a share'
              }
            >
              <Text style={[styles.ctaText, asset.availableShares === 0 && styles.ctaTextDisabled]}>
                {asset.availableShares === 0 ? 'Fully Subscribed' : 'Buy a Share'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps): React.ReactElement {
  return (
    <View style={detailRowStyles.row}>
      <Text style={detailRowStyles.label}>{label}</Text>
      <Text style={detailRowStyles.value}>{value}</Text>
    </View>
  );
}

const detailRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  label: {
    ...Typography.bodyMedium,
    color: Colors.textTertiary,
    flex: 1,
  },
  value: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    flex: 2,
    textAlign: 'right',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: Colors.shimmerBase,
  },
  contentPanel: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: CARD_BORDER_RADIUS * 2,
    borderTopRightRadius: CARD_BORDER_RADIUS * 2,
    marginTop: -CARD_BORDER_RADIUS * 2,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.base,
    minHeight: 400,
  },
  category: {
    ...Typography.overline,
    color: Colors.textTertiary,
    marginBottom: Spacing.sm,
  },
  name: {
    ...Typography.displaySmall,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  artist: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.lg,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pricingItem: {
    flex: 1,
    alignItems: 'center',
  },
  pricingLabel: {
    ...Typography.caption,
    color: Colors.textTertiary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  pricingValue: {
    ...Typography.headingSmall,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionLabel: {
    ...Typography.labelLarge,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  availabilityCount: {
    ...Typography.labelMedium,
  },
  progressBarContainer: {
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  detailsGrid: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  ctaContainer: {
    marginTop: Spacing.xl,
  },
  ctaButton: {
    backgroundColor: Colors.accent,
    borderRadius: CARD_BORDER_RADIUS,
    paddingVertical: Spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonDisabled: {
    backgroundColor: Colors.takenGrey,
  },
  ctaText: {
    ...Typography.headingSmall,
    color: Colors.surface,
  },
  ctaTextDisabled: {
    color: Colors.textTertiary,
  },
  backButtonWrapper: {
    position: 'absolute',
    left: Spacing.base,
    zIndex: 100,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    gap: Spacing.base,
  },
  errorText: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
  },
  errorBack: {
    padding: Spacing.sm,
  },
});
