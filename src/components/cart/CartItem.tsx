import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  COLORS,
  FONTS,
  FONT_SIZE,
  PRESS,
  RADIUS,
  SHADOWS,
  SPACING,
} from "../../constants/theme";
import type { CartItem as CartItemData } from "../../contexts/CartContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  item: CartItemData;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
};

// ── Component ─────────────────────────────────────────────────────────────────

const CartItem: React.FC<Props> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const lineTotal = item.price * item.quantity;
  const lineSavings = (item.discount ?? 0) * item.quantity;

  return (
    <View style={styles.row}>
      {/* Image */}
      <View style={styles.imageBox}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            contentFit="cover"
            transition={150}
          />
        ) : null}
      </View>

      {/* Center info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        {item.weight ? (
          <Text style={styles.weight}>{item.weight}</Text>
        ) : null}

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{lineTotal}</Text>
          {item.discount && item.discount > 0 ? (
            <View style={styles.offerBadge}>
              <Text style={styles.offerBadgeText}>
                ₹{item.discount} OFF
              </Text>
            </View>
          ) : null}
        </View>

        {lineSavings > 0 ? (
          <Text style={styles.savings}>You save ₹{lineSavings}</Text>
        ) : null}
      </View>

      {/* Right controls */}
      <View style={styles.right}>
        <TouchableOpacity
          onPress={() => onRemove(item.productId)}
          hitSlop={8}
          activeOpacity={0.6}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteIcon}>🗑</Text>
        </TouchableOpacity>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => onDecrement(item.productId)}
            activeOpacity={0.7}
            hitSlop={6}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => onIncrement(item.productId)}
            activeOpacity={0.7}
            hitSlop={6}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.lg,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },

  imageBox: {
    width: 76,
    height: 76,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.grayLight,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    marginBottom: 2,
  },
  weight: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    flexWrap: "wrap",
  },
  price: {
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },
  offerBadge: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FED7AA",
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  offerBadgeText: {
    color: "#C2410C",
    fontSize: FONT_SIZE.md,
    fontWeight: FONTS.bold,
  },
  savings: {
    marginTop: 4,
    fontSize: FONT_SIZE.base,
    color: COLORS.primary,
    fontWeight: FONTS.semiBold,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    minWidth: 110,
  },
  deleteBtn: {
    padding: 4,
  },
  deleteIcon: {
    fontSize: 18,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    gap: 4,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: FONTS.bold,
    lineHeight: 22,
  },
  qtyValue: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
    minWidth: 18,
    textAlign: "center",
  },
});

export default CartItem;
