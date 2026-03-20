import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  RefreshControl,
  useWindowDimensions,
  View,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_ASSETS, Asset } from '../../constants/mockData';
import { Colors } from '../../constants/colors';
import { Spacing, TABLET_BREAKPOINT } from '../../constants/spacing';
import AssetCard from '../../components/AssetCard';
import ShimmerCard from '../../components/ShimmerCard';

const COLUMN_GAP = Spacing.sm;
const HORIZONTAL_PADDING = Spacing.base;

export default function BrowseScreen(): React.ReactElement {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const isTablet = width >= TABLET_BREAKPOINT;
  const numColumns = isTablet ? 2 : 1;

  // Card width calculation
  const totalHorizontalPadding = HORIZONTAL_PADDING * 2;
  const totalGap = (numColumns - 1) * COLUMN_GAP;
  const cardWidth = (width - totalHorizontalPadding - totalGap) / numColumns;

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Asset>) => (
      <View style={numColumns === 2 ? styles.columnItem : undefined}>
        <AssetCard asset={item} cardWidth={cardWidth} />
      </View>
    ),
    [cardWidth, numColumns],
  );

  const keyExtractor = useCallback((item: Asset) => item.id, []);

  // Shimmer list when loading
  if (loading) {
    const shimmerKeys = MOCK_ASSETS.map((a) => a.id);
    return (
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <FlatList
          key={`shimmer-${numColumns}`}
          data={shimmerKeys}
          keyExtractor={(id) => `shimmer-${id}`}
          numColumns={numColumns}
          columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
          contentContainerStyle={styles.listContent}
          renderItem={() => <View style={numColumns === 2 ? styles.columnItem : undefined}><ShimmerCard cardWidth={cardWidth} /></View>}
          scrollEnabled={false}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <FlatList
        key={`list-${numColumns}`}
        data={MOCK_ASSETS}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.textTertiary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
  columnWrapper: {
    gap: COLUMN_GAP,
  },
  columnItem: {
    flex: 1,
  },
});
