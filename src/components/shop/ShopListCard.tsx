import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SHADOWS,
  SPACING,
} from "../../constants/theme";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ShopListItem = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  time: string;
  open: boolean;
  color: string;
  emoji: string;
  categories: string[];
  offer: string | null;
  image: string;
};

type Props = {
  item: ShopListItem;
  onViewShop: (shop: ShopListItem) => void;
};

// ── Component ─────────────────────────────────────────────────────────────────

const ShopListCard: React.FC<Props> = ({ item, onViewShop }) => {
  const visibleCategories = item.categories.slice(0, 2).join(" • ");
  const extraCount = item.categories.length - 2;

  return (
    <View style={styles.card}>
      {/* Image left */}
      <View
        style={[styles.imageBox, { backgroundColor: item.color + "22" }]}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.emojiBadge}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
      </View>

      {/* Content right */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <View
            style={[
              styles.statusPill,
              item.open ? styles.statusOpen : styles.statusClosed,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                !item.open && styles.statusTextClosed,
              ]}
            >
              {item.open ? "Open" : "Closed"}
            </Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.categoriesText} numberOfLines={1}>
            {visibleCategories}
            {extraCount > 0 ? ` +${extraCount}` : ""}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaIcon}>📍</Text>
          <Text style={styles.metaText}>{item.distance}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.metaIcon}>⏱</Text>
          <Text style={styles.metaText}>{item.time}</Text>
        </View>

        {item.offer ? (
          <View style={styles.offerBox}>
            <Text style={styles.offerIcon}>🏷</Text>
            <Text style={styles.offerText} numberOfLines={1}>
              {item.offer}
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={[styles.btn, !item.open && styles.btnDisabled]}
          activeOpacity={0.85}
          disabled={!item.open}
          onPress={() => onViewShop(item)}
        >
          <Text
            style={[styles.btnText, !item.open && styles.btnTextDisabled]}
          >
            {item.open ? "View Shop" : "Closed for now"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },

  // Image
  imageBox: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    position: "relative",
    marginRight: SPACING.md,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  emojiBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "rgba(255,255,255,0.95)",
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 14,
  },

  // Content
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  name: {
    flex: 1,
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },

  // Status
  statusPill: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  statusOpen: {
    backgroundColor: COLORS.primaryLight,
  },
  statusClosed: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONTS.bold,
    color: COLORS.primary,
  },
  statusTextClosed: {
    color: COLORS.danger,
  },

  // Meta
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
    flexWrap: "nowrap",
  },
  star: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.accent,
  },
  rating: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
  },
  reviews: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
  },
  dot: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    marginHorizontal: 2,
  },
  categoriesText: {
    flex: 1,
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
  },
  metaIcon: {
    fontSize: FONT_SIZE.base,
  },
  metaText: {
    fontSize: FONT_SIZE.base,
    color: COLORS.dark,
    fontWeight: FONTS.semiBold,
  },

  // Offer
  offerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: SPACING.sm,
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  offerIcon: {
    fontSize: FONT_SIZE.base,
  },
  offerText: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONTS.bold,
    color: "#C2410C",
  },

  // Button
  btn: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 9,
    alignItems: "center",
    ...SHADOWS.sm,
  },
  btnDisabled: {
    backgroundColor: COLORS.grayLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: FONTS.extraBold,
    fontSize: FONT_SIZE.base,
    letterSpacing: 0.3,
  },
  btnTextDisabled: {
    color: COLORS.gray,
  },
});

export default ShopListCard;
