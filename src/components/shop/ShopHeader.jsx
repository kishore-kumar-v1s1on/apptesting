import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from "../../constants/theme";

const ShopHeader = ({ shop, onBack }) => (
  <View style={styles.container}>
    {/* Top nav */}
    <View style={styles.navRow}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.iconBtn}
        activeOpacity={0.7}
      >
        <Text style={styles.iconText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.navTitle} numberOfLines={1}>
        {shop.name}
      </Text>

      <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
        <Text style={styles.heartText}>♥</Text>
      </TouchableOpacity>
    </View>

    {/* Hero image */}
    <View style={[styles.hero, { backgroundColor: shop.color + "33" }]}>
      <Text style={styles.heroEmoji}>{shop.emoji}</Text>
      {shop.open && (
        <View style={styles.openBadge}>
          <Text style={styles.openBadgeText}>Open Now</Text>
        </View>
      )}
    </View>

    {/* Shop info */}
    <View style={styles.info}>
      <Text style={styles.shopName}>{shop.name}</Text>

      <View style={styles.ratingRow}>
        <View style={styles.ratingPill}>
          <Text style={styles.starIcon}>★</Text>
          <Text style={styles.ratingText}>{shop.rating}</Text>
        </View>
        <Text style={styles.reviewText}>({shop.reviews}+ reviews)</Text>
      </View>

      <View style={styles.metaList}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>📍</Text>
          <Text style={styles.metaText}>{shop.distance}</Text>
        </View>
        <View style={styles.metaDivider} />
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>⏱</Text>
          <Text style={styles.metaText}>{shop.time}</Text>
        </View>
        <View style={styles.metaDivider} />
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>🛵</Text>
          <Text style={[styles.metaText, styles.metaTextAccent]}>Free</Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingTop: 48,
    paddingBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grayLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 24,
    color: COLORS.dark,
    fontWeight: FONTS.bold,
    lineHeight: 26,
    marginTop: -2,
  },
  heartText: {
    fontSize: 18,
    color: COLORS.danger,
    fontWeight: FONTS.bold,
  },
  navTitle: {
    flex: 1,
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },
  hero: {
    height: 160,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.xxl,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroEmoji: {
    fontSize: 80,
  },
  openBadge: {
    position: "absolute",
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: COLORS.badge,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
  },
  openBadgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.base,
    fontWeight: FONTS.bold,
  },
  info: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  shopName: {
    fontSize: FONT_SIZE["5xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
    marginBottom: SPACING.sm,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
  },
  starIcon: {
    color: COLORS.white,
    fontSize: FONT_SIZE.base,
  },
  ratingText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
  },
  reviewText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray,
  },
  metaList: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metaItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  metaIcon: {
    fontSize: FONT_SIZE["2xl"],
  },
  metaText: {
    fontSize: FONT_SIZE.base,
    color: COLORS.dark,
    fontWeight: FONTS.semiBold,
  },
  metaTextAccent: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
  },
  metaDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border,
  },
});

export default ShopHeader;
