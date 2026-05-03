import { router, Stack } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AddressCard, {
  type Address,
} from "../components/checkout/AddressCard";
import DeliveryOption from "../components/checkout/DeliveryOption";
import PaymentOption from "../components/checkout/PaymentOption";
import SummaryRow from "../components/checkout/SummaryRow";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from "../constants/theme";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  HANDLING_CHARGE,
} from "../constants/pricing";
import { useCart } from "../contexts/CartContext";
import { DELIVERY_ADDRESS, getShopById } from "../data/mockData";

// ── Types ─────────────────────────────────────────────────────────────────────

type DeliveryType = "delivery" | "pickup";
type PaymentMethod = "upi" | "cod";

type Shop = {
  id: string;
  name: string;
  distance: string;
};

type CartSummary = {
  itemsTotal: number;
  deliveryFee: number;
  handlingCharge: number;
  total: number;
  savings: number;
};

// ── Screen ────────────────────────────────────────────────────────────────────

const CheckoutScreen: React.FC = () => {
  const { items, total: itemsTotal, savings, clearCart } = useCart();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  // ── Pricing ─────────────────────────────────────────────────────────────────
  const summary = useMemo<CartSummary>(() => {
    const eligibleForFree =
      deliveryType === "pickup" || itemsTotal >= FREE_DELIVERY_THRESHOLD;
    const deliveryFee =
      deliveryType === "pickup" ? 0 : eligibleForFree ? 0 : DELIVERY_FEE;
    const handlingCharge = HANDLING_CHARGE;
    const total = itemsTotal + handlingCharge + deliveryFee;
    return { itemsTotal, deliveryFee, handlingCharge, total, savings };
  }, [itemsTotal, savings, deliveryType]);

  const isFreeDelivery =
    summary.deliveryFee === 0 && deliveryType === "delivery";

  // ── Shop ────────────────────────────────────────────────────────────────────
  const shop = useMemo<Shop | null>(() => {
    if (items.length === 0) return null;
    const firstShopId = items[0].shopId;
    const allSameShop = items.every((i) => i.shopId === firstShopId);
    const found = getShopById(firstShopId) as Shop | undefined;
    if (!found) return null;
    if (!allSameShop) {
      return { id: found.id, name: "Multiple Shops", distance: "" };
    }
    return found;
  }, [items]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleBack = useCallback((): void => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  }, []);

  const handlePlaceOrder = useCallback((): void => {
    // Navigate first so the screen unmounts before clearing
    // (otherwise the empty-cart redirect could flash through).
    router.replace({
      pathname: "/order-success",
      params: {
        total: String(summary.total),
        deliveryType,
        paymentMethod,
      },
    });
    clearCart();
  }, [summary.total, deliveryType, paymentMethod, clearCart]);

  // ── Empty cart guard ────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Cart is empty</Text>
        <Text style={styles.emptySub}>
          Add items to your cart before checking out.
        </Text>
        <TouchableOpacity
          style={styles.emptyBtn}
          activeOpacity={0.85}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.emptyBtnText}>Browse Shops</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.navRow}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.iconBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.iconText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>Checkout</Text>
          {shop ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {shop.name}
              {shop.distance ? ` • ${shop.distance} away` : ""}
            </Text>
          ) : null}
        </View>

        <View style={styles.iconBtnSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Free delivery banner */}
        {isFreeDelivery ? (
          <View style={styles.freeBanner}>
            <Text style={styles.freeBannerIcon}>🛵</Text>
            <View style={styles.freeBannerText}>
              <Text style={styles.freeBannerTitle}>
                Yay! FREE delivery unlocked
              </Text>
              <Text style={styles.freeBannerSub}>
                You saved ₹{DELIVERY_FEE} on delivery fee
              </Text>
            </View>
          </View>
        ) : null}

        {/* Delivery address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <AddressCard
            address={DELIVERY_ADDRESS as Address}
            onChange={() => console.log("Change address")}
          />
        </View>

        {/* Delivery type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Type</Text>
          <DeliveryOption
            icon="🛵"
            title="Delivery"
            description="Get it delivered to your doorstep"
            selected={deliveryType === "delivery"}
            onSelect={() => setDeliveryType("delivery")}
          />
          <DeliveryOption
            icon="🏪"
            title="Pickup from shop"
            description="Pick up your order from the store"
            selected={deliveryType === "pickup"}
            onSelect={() => setDeliveryType("pickup")}
          />
        </View>

        {/* Payment method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <PaymentOption
            icon="📱"
            title="UPI"
            description="GPay, PhonePe, Paytm and more"
            selected={paymentMethod === "upi"}
            onSelect={() => setPaymentMethod("upi")}
            rightExtra={
              <View style={styles.upiLogos}>
                <View style={styles.upiPill}>
                  <Text style={styles.upiPillText}>GPay</Text>
                </View>
                <View style={styles.upiPill}>
                  <Text style={styles.upiPillText}>PhonePe</Text>
                </View>
                <View style={styles.upiPill}>
                  <Text style={styles.upiPillText}>Paytm</Text>
                </View>
              </View>
            }
          />

          <PaymentOption
            icon="💵"
            title="Cash on Delivery"
            description="Pay when your order is delivered"
            selected={paymentMethod === "cod"}
            onSelect={() => setPaymentMethod("cod")}
          />
        </View>

        {/* Order summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summary}>
            <SummaryRow
              label="Items Total"
              value={`₹${summary.itemsTotal}`}
            />
            <SummaryRow
              label="Delivery Fee"
              value={summary.deliveryFee === 0 ? "FREE" : `₹${summary.deliveryFee}`}
              isFree={summary.deliveryFee === 0}
            />
            <SummaryRow
              label="Handling Charge"
              value={`₹${summary.handlingCharge}`}
            />
            <SummaryRow
              label="Grand Total"
              value={`₹${summary.total}`}
              isTotal
            />
          </View>
        </View>

        {/* Savings banner */}
        {summary.savings > 0 ? (
          <View style={styles.savingsBanner}>
            <Text style={styles.savingsBannerIcon}>🎉</Text>
            <Text style={styles.savingsBannerText}>
              You saved{" "}
              <Text style={styles.savingsAmount}>₹{summary.savings}</Text>{" "}
              on this order
            </Text>
          </View>
        ) : null}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <Text style={styles.secureText}>🔒 100% Secure Payments</Text>
        <TouchableOpacity
          style={styles.placeOrderBtn}
          activeOpacity={0.85}
          onPress={handlePlaceOrder}
        >
          <View style={styles.placeOrderLeft}>
            <Text style={styles.placeOrderAmount}>₹{summary.total}</Text>
            <Text style={styles.placeOrderLabel}>To Pay</Text>
          </View>
          <Text style={styles.placeOrderText}>Place Order  ›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F5F6F7",
  },

  // Header
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingTop: 48,
    paddingBottom: SPACING.md,
    gap: SPACING.sm,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
  iconBtnSpacer: {
    width: 40,
    height: 40,
  },
  iconText: {
    fontSize: 24,
    color: COLORS.dark,
    fontWeight: FONTS.bold,
    lineHeight: 26,
    marginTop: -2,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },
  subtitle: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
    marginTop: 1,
  },

  // Scroll content
  scrollContent: {
    paddingBottom: 140,
  },

  // Free delivery banner
  freeBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary + "33",
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  freeBannerIcon: {
    fontSize: 30,
  },
  freeBannerText: {
    flex: 1,
  },
  freeBannerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.extraBold,
    color: COLORS.primary,
  },
  freeBannerSub: {
    fontSize: FONT_SIZE.base,
    color: COLORS.dark,
    marginTop: 2,
    fontWeight: FONTS.medium,
  },

  // Section
  section: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
    marginBottom: SPACING.md,
  },

  // UPI logos
  upiLogos: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  upiPill: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  upiPillText: {
    fontSize: FONT_SIZE.base,
    color: COLORS.dark,
    fontWeight: FONTS.bold,
  },

  // Summary
  summary: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },

  // Savings banner
  savingsBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: "#FFF7ED",
    borderColor: "#FED7AA",
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  savingsBannerIcon: {
    fontSize: 22,
  },
  savingsBannerText: {
    flex: 1,
    fontSize: FONT_SIZE.lg,
    color: "#9A3412",
    fontWeight: FONTS.semiBold,
  },
  savingsAmount: {
    color: "#C2410C",
    fontWeight: FONTS.extraBold,
  },

  // Bottom CTA
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  secureText: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    fontWeight: FONTS.semiBold,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  placeOrderBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  placeOrderLeft: {
    alignItems: "flex-start",
  },
  placeOrderAmount: {
    color: COLORS.white,
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
    lineHeight: 24,
  },
  placeOrderLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: FONT_SIZE.md,
    fontWeight: FONTS.semiBold,
  },
  placeOrderText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
  },

  // Empty
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
  },
  emptyEmoji: {
    fontSize: 70,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZE["4xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  emptySub: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: SPACING.xl,
  },
  emptyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  emptyBtnText: {
    color: COLORS.white,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.xl,
  },
});

export default CheckoutScreen;
