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
import type { Order, OrderStatus } from "../../contexts/OrdersContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  order: Order;
  onPress: (order: Order) => void;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<OrderStatus, string> = {
  placed: "Order Placed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

const STATUS_COLOR: Record<OrderStatus, { bg: string; fg: string }> = {
  placed: { bg: "#DBEAFE", fg: "#1D4ED8" },
  preparing: { bg: "#FEF3C7", fg: "#B45309" },
  out_for_delivery: { bg: "#FFF7ED", fg: "#C2410C" },
  delivered: { bg: "#DCFCE7", fg: "#166534" },
};

const formatRelative = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const min = Math.round(diff / 60000);
  const hour = Math.round(diff / 3600000);
  const day = Math.round(diff / 86400000);
  if (min < 60) return `${min} min${min === 1 ? "" : "s"} ago`;
  if (hour < 24) return `${hour} hour${hour === 1 ? "" : "s"} ago`;
  if (day === 1) return "Yesterday";
  return `${day} days ago`;
};

// ── Component ─────────────────────────────────────────────────────────────────

const OrderCard: React.FC<Props> = ({ order, onPress }) => {
  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
  const firstItem = order.items[0];
  const status = STATUS_LABEL[order.status];
  const colors = STATUS_COLOR[order.status];

  const isLive =
    order.status !== "delivered" && order.status !== "placed"
      ? false
      : order.status === "placed" ||
        order.status === "preparing" ||
        order.status === "out_for_delivery";

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={PRESS.opacity}
      onPress={() => onPress(order)}
    >
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={styles.imageBox}>
          {firstItem?.image ? (
            <Image
              source={{ uri: firstItem.image }}
              style={styles.image}
              contentFit="cover"
              transition={150}
            />
          ) : null}
        </View>

        <View style={styles.info}>
          <Text style={styles.shopName} numberOfLines={1}>
            {order.shopName}
          </Text>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.meta}>
            {itemCount} {itemCount === 1 ? "item" : "items"} • ₹{order.total}
          </Text>
          <Text style={styles.timestamp}>{formatRelative(order.placedAt)}</Text>
        </View>

        <View
          style={[styles.statusPill, { backgroundColor: colors.bg }]}
        >
          {isLive ? <View style={styles.dot} /> : null}
          <Text style={[styles.statusText, { color: colors.fg }]}>
            {status}
          </Text>
        </View>
      </View>

      {/* Bottom row */}
      <View style={styles.bottomRow}>
        <Text style={styles.etaText}>
          {order.status === "delivered" ? "Delivered" : order.eta}
        </Text>
        <View style={styles.trackBtn}>
          <Text style={styles.trackBtnText}>
            {order.status === "delivered" ? "View Details" : "Track Order"}  ›
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  topRow: {
    flexDirection: "row",
    gap: SPACING.md,
    alignItems: "center",
  },
  imageBox: {
    width: 64,
    height: 64,
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
  },
  shopName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },
  orderId: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
    marginTop: 2,
  },
  meta: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.semiBold,
    marginTop: 4,
  },
  timestamp: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
    marginTop: 2,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  statusText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONTS.bold,
    lineHeight: 14,
    includeFontPadding: false,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  etaText: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    fontWeight: FONTS.semiBold,
  },
  trackBtn: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  trackBtnText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.primary,
    fontWeight: FONTS.bold,
  },
});

export default OrderCard;
