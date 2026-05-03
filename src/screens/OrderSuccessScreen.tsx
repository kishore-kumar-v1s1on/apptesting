import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  StatusBar,
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
} from "../constants/theme";

// ── Helpers ───────────────────────────────────────────────────────────────────

const fallbackOrderId = (): string => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `KKS-${random}`;
};

// ── Screen ────────────────────────────────────────────────────────────────────

const OrderSuccessScreen: React.FC = () => {
  const params = useLocalSearchParams<{
    id?: string;
    total?: string;
    deliveryType?: string;
    paymentMethod?: string;
  }>();

  const orderId = useMemo<string>(
    () => params.id ?? fallbackOrderId(),
    [params.id]
  );
  const total = params.total ?? "0";
  const isPickup = params.deliveryType === "pickup";
  const isCod = params.paymentMethod === "cod";
  const eta = isPickup ? "Ready in ~15 mins" : "Arriving in ~25 mins";

  const handleHome = (): void => {
    router.replace("/");
  };

  const handleTrack = (): void => {
    router.replace({
      pathname: "/orders/[id]",
      params: { id: orderId },
    });
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primaryLight} />

      <View style={styles.body}>
        {/* Check icon */}
        <View style={styles.checkOuter}>
          <View style={styles.checkInner}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        </View>

        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subtitle}>
          Your order has been confirmed.
        </Text>

        {/* Order details card */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Order ID</Text>
            <Text style={styles.cardValue}>{orderId}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Amount Paid</Text>
            <Text style={styles.cardValue}>₹{total}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Payment</Text>
            <Text style={styles.cardValue}>
              {isCod ? "Cash on Delivery" : "UPI"}
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>
              {isPickup ? "Pickup" : "Delivery"}
            </Text>
            <Text style={[styles.cardValue, styles.etaValue]}>{eta}</Text>
          </View>
        </View>

        <Text style={styles.thankYou}>
          Thanks for shopping with us 🛍
        </Text>
      </View>

      {/* Bottom actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.secondaryBtn}
          activeOpacity={0.85}
          onPress={handleTrack}
        >
          <Text style={styles.secondaryBtnText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.85}
          onPress={handleHome}
        >
          <Text style={styles.primaryBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
  },

  // Check icon
  checkOuter: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.xl,
  },
  checkInner: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  checkText: {
    color: COLORS.white,
    fontSize: 56,
    fontWeight: FONTS.extraBold,
    lineHeight: 60,
  },

  // Title
  title: {
    fontSize: FONT_SIZE["6xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
    marginBottom: SPACING.xl,
    textAlign: "center",
  },

  // Card
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xxl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm,
  },
  cardLabel: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
  },
  cardValue: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.bold,
  },
  etaValue: {
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  // Thank you
  thankYou: {
    marginTop: SPACING.xl,
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
  },

  // Bottom bar
  bottomBar: {
    flexDirection: "row",
    gap: SPACING.md,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  secondaryBtn: {
    flex: 1,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  secondaryBtnText: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.lg,
  },
  primaryBtn: {
    flex: 1,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.lg,
  },
});

export default OrderSuccessScreen;
