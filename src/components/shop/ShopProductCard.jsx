import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from "../../constants/theme";

const ShopProductCard = ({ item, onAdd }) => {
  const hasDiscount =
    !!item.originalPrice && item.originalPrice > item.price;

  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        {item.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        ) : null}

        <Text style={styles.emoji}>{item.emoji}</Text>

        {!item.inStock ? (
          <View style={styles.oosOverlay}>
            <Text style={styles.oosText}>Out of Stock</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>

      <View style={styles.metaRow}>
        <Text style={styles.star}>★</Text>
        <Text style={styles.rating}>{item.rating}</Text>
        <Text style={styles.reviews}>({item.reviews})</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{item.price}</Text>
        {hasDiscount ? (
          <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[styles.addBtn, !item.inStock && styles.addBtnDisabled]}
        activeOpacity={0.8}
        disabled={!item.inStock}
        onPress={() => onAdd?.(item)}
      >
        <Text
          style={[
            styles.addBtnText,
            !item.inStock && styles.addBtnTextDisabled,
          ]}
        >
          {item.inStock ? "Add  +" : "Notify Me"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  imageBox: {
    height: 90,
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
    position: "relative",
    overflow: "hidden",
  },
  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: COLORS.primaryMid,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONTS.bold,
  },
  emoji: {
    fontSize: 50,
  },
  oosOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  oosText: {
    color: COLORS.danger,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.base,
  },
  name: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    marginBottom: 4,
    minHeight: 36,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: SPACING.xs,
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
  reviews: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  price: {
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },
  originalPrice: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    textDecorationLine: "line-through",
  },
  addBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 6,
    alignItems: "center",
  },
  addBtnDisabled: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.grayLight,
  },
  addBtnText: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.lg,
  },
  addBtnTextDisabled: {
    color: COLORS.gray,
  },
});

export default ShopProductCard;
