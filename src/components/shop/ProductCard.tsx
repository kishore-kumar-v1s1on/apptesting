import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useCart } from "../../contexts/CartContext";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  PRESS,
  RADIUS,
  SHADOWS,
  SPACING,
} from "../../constants/theme";

// ── Types ─────────────────────────────────────────────────────────────────────

export type Product = {
  id: string;
  name: string;
  displayName?: string;
  weight?: string;
  category: string;
  price: number;
  image?: string;
  emoji?: string;
  rating?: number;
  reviews?: number;
  badge?: string | null;
  originalPrice?: number | null;
  inStock?: boolean;
};

type Props = {
  product: Product;
  shopId: string;
};

// ── Component ─────────────────────────────────────────────────────────────────

const ProductCard: React.FC<Props> = ({ product, shopId }) => {
  const { addItem, incrementItem, decrementItem, getQuantity } = useCart();
  const quantity = getQuantity(product.id);
  const inStock = product.inStock !== false;

  const hasDiscount =
    !!product.originalPrice && product.originalPrice > product.price;

  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        {/* Emoji as background fallback */}
        {product.emoji ? (
          <Text style={styles.fallbackEmoji}>{product.emoji}</Text>
        ) : null}

        {/* Foreground image (overlays emoji on success) */}
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            contentFit="cover"
            transition={150}
          />
        ) : null}

        {/* Badge */}
        {product.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}

        {/* Out of stock overlay */}
        {!inStock ? (
          <View style={styles.oosOverlay}>
            <Text style={styles.oosText}>Out of Stock</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.category} numberOfLines={1}>
        {product.category}
      </Text>

      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>

      {product.rating != null ? (
        <View style={styles.metaRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.rating}>{product.rating}</Text>
          {product.reviews != null ? (
            <Text style={styles.reviews}>({product.reviews})</Text>
          ) : null}
        </View>
      ) : null}

      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{product.price}</Text>
        {hasDiscount ? (
          <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
        ) : null}
      </View>

      {/* Cart controls */}
      {quantity === 0 ? (
        <TouchableOpacity
          style={[styles.addBtn, !inStock && styles.addBtnDisabled]}
          activeOpacity={0.85}
          disabled={!inStock}
          onPress={() => {
            const discount =
              product.originalPrice && product.originalPrice > product.price
                ? product.originalPrice - product.price
                : 0;
            addItem(
              {
                id: product.id,
                name: product.displayName ?? product.name,
                price: product.price,
                image: product.image,
                weight: product.weight,
                discount,
                category: product.category,
              },
              shopId
            );
          }}
        >
          <Text
            style={[
              styles.addBtnText,
              !inStock && styles.addBtnTextDisabled,
            ]}
          >
            {inStock ? "Add  +" : "Notify Me"}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => decrementItem(product.id)}
            activeOpacity={0.7}
            hitSlop={6}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => incrementItem(product.id)}
            activeOpacity={0.7}
            hitSlop={6}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },

  // Image
  imageBox: {
    height: 110,
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
    position: "relative",
    overflow: "hidden",
  },
  fallbackEmoji: {
    fontSize: 50,
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: FONTS.extraBold,
    letterSpacing: 0.2,
    lineHeight: 12,
    includeFontPadding: false,
  },
  oosOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  oosText: {
    color: COLORS.danger,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.base,
  },

  // Text
  category: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    fontWeight: FONTS.semiBold,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  name: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    marginBottom: 4,
    minHeight: 38,
    lineHeight: 18,
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
    fontWeight: FONTS.bold,
  },
  reviews: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
  },

  // Price
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginBottom: SPACING.sm,
  },
  price: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
    letterSpacing: -0.3,
  },
  originalPrice: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    textDecorationLine: "line-through",
    fontWeight: FONTS.medium,
  },

  // Add button
  addBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    paddingVertical: 9,
    alignItems: "center",
  },
  addBtnDisabled: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.grayLight,
  },
  addBtnText: {
    color: COLORS.primary,
    fontWeight: FONTS.extraBold,
    fontSize: FONT_SIZE.base,
    letterSpacing: 0.3,
  },
  addBtnTextDisabled: {
    color: COLORS.gray,
  },

  // Qty stepper
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    ...SHADOWS.sm,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: FONTS.bold,
    lineHeight: 24,
    includeFontPadding: false,
  },
  qtyValue: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.extraBold,
    minWidth: 24,
    textAlign: "center",
  },
});

export default ProductCard;
