import React from "react";
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

const NearbyShops = ({ onViewAll, onShopPress }) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="Nearby Shops" onViewAll={onViewAll} />

      <FlatList
        data={NEARBY_SHOPS}
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
});

export { ShopCard };
export default NearbyShops;
