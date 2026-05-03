import React, { useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from "../../constants/theme";
import { NEARBY_SHOPS } from "../../data/mockData";
import SectionHeader from "../common/SectionHeader";

const ShopCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => onPress?.(item)}
    activeOpacity={0.9}
  >
    <View style={[styles.imageBox, { backgroundColor: item.color + "33" }]}>
      <Text style={styles.shopEmoji}>{item.emoji}</Text>

      {item.open && (
        <View style={styles.openBadge}>
          <Text style={styles.openBadgeText}>Open</Text>
        </View>
      )}

      <View style={styles.nameOverlay}>
        <Text style={styles.nameOverlayText}>{item.name}</Text>
      </View>
    </View>

    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.star}>★</Text>
        <Text style={styles.rating}>
          {item.rating} ({item.reviews})
        </Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaIcon}>🏪</Text>
        <Text style={styles.metaText}>
          {item.distance} • {item.time}
        </Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaIcon}>🛵</Text>
        <Text style={styles.deliveryText}>Free delivery</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const NearbyShops = ({ onViewAll, onShopPress, categoryName }) => {
  const data = useMemo(() => {
    if (!categoryName) return NEARBY_SHOPS;
    return NEARBY_SHOPS.filter((s) =>
      s.categories?.includes(categoryName)
    );
  }, [categoryName]);

  const title = categoryName
    ? `Nearby ${categoryName} Shops`
    : "Nearby Shops";

  return (
    <View style={styles.container}>
      <SectionHeader title={title} onViewAll={onViewAll} />

      {data.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>
            No nearby {categoryName?.toLowerCase()} shops
          </Text>
          <Text style={styles.emptySub}>
            Tap another category, or browse all shops.
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ShopCard item={item} onPress={onShopPress} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToAlignment="start"
          removeClippedSubviews
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  scrollContent: {
    paddingBottom: SPACING.xs,
  },

  // Card
  card: {
    width: 160,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  imageBox: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  shopEmoji: {
    fontSize: 46,
  },
  openBadge: {
    position: "absolute",
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.badge,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  openBadgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONTS.bold,
  },
  nameOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.overlay,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  nameOverlayText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONTS.bold,
  },

  // Info
  info: {
    padding: SPACING.md - 2,
  },
  name: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginBottom: 3,
  },
  star: {
    fontSize: FONT_SIZE.base,
    color: COLORS.accent,
  },
  rating: {
    fontSize: FONT_SIZE.base,
    color: COLORS.dark,
    fontWeight: FONTS.semiBold,
  },
  metaIcon: {
    fontSize: FONT_SIZE.md,
  },
  metaText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
  },
  deliveryText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
    fontWeight: FONTS.semiBold,
  },

  // Empty state when filter has no matches
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.lg,
  },
  emptyEmoji: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    marginBottom: 2,
    textAlign: "center",
  },
  emptySub: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    textAlign: "center",
  },
});

export { ShopCard };
export default NearbyShops;
