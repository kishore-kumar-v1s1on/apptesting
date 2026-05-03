import { router, Stack } from "expo-router";
import React, { useCallback, useMemo } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CartItem from "../components/cart/CartItem";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from "../constants/theme";
import {
  useCart,
  type CartItem as CartItemData,
} from "../contexts/CartContext";
import { getShopById } from "../data/mockData";

// ── Constants ─────────────────────────────────────────────────────────────────

const FREE_DELIVERY_THRESHOLD = 199;
const DELIVERY_FEE = 20;

type Shop = {
  id: string;
  name: string;
  distance: string;
};

// ── Screen ────────────────────────────────────────────────────────────────────

const CartScreen: React.FC = () => {
  const {
    items,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    total,
    savings,
  } = useCart();

  // ── Pricing memos ───────────────────────────────────────────────────────────
  const itemTotal = total;

  const deliveryFee = useMemo<number>(
    () => (itemTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE),
    [itemTotal]
  );

  const toPay = useMemo<number>(
    () => itemTotal + deliveryFee,
    [itemTotal, deliveryFee]
  );

  const amountToFreeDelivery = useMemo<number>(
    () => Math.max(0, FREE_DELIVERY_THRESHOLD - itemTotal),
    [itemTotal]
  );

  const progressRatio = useMemo<number>(
    () => Math.min(1, itemTotal / FREE_DELIVERY_THRESHOLD),
    [itemTotal]
  );

  // ── Shop lookup (assume single-shop cart, fallback for mixed) ───────────────
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

  const handleClearCart = useCallback((): void => {
    Alert.alert(
      "Clear cart?",
      "All items in your cart will be removed.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: clearCart },
      ]
    );
  }, [clearCart]);

  const handleCheckout = useCallback((): void => {
    Alert.alert("Checkout", `Proceeding to pay ₹${toPay}`);
  }, [toPay]);

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

        <View style={styles.navRow}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.iconBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.iconText}>‹</Text>
          </TouchableOpacity>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Your Cart</Text>
          </View>
          <View style={styles.iconBtnSpacer} />
        </View>

        <View style={styles.emptyBody}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>
            Browse shops and add items to get started.
          </Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            activeOpacity={0.85}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.emptyBtnText}>Browse Shops</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <FlatList<CartItemData>
        data={items}
        keyExtractor={(item) => item.productId}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
            onRemove={removeItem}
          />
        )}
        ListHeaderComponent={
          <View>
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
                <Text style={styles.title}>Your Cart</Text>
                {shop ? (
                  <Text style={styles.subtitle} numberOfLines={1}>
                    {shop.name}
                    {shop.distance ? ` • ${shop.distance} away` : ""}
                  </Text>
                ) : null}
              </View>

              <TouchableOpacity
                style={styles.iconBtn}
                activeOpacity={0.7}
                onPress={() => console.log("Wishlist")}
              >
                <Text style={styles.heartIcon}>♥</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtn}
                activeOpacity={0.7}
                onPress={handleClearCart}
              >
                <Text style={styles.trashIcon}>🗑</Text>
              </TouchableOpacity>
            </View>

            {/* Delivery banner with progress */}
            <View style={styles.banner}>
              {amountToFreeDelivery > 0 ? (
                <Text style={styles.bannerTitle}>
                  Add ₹{amountToFreeDelivery} more to get{" "}
                  <Text style={styles.bannerHighlight}>FREE delivery</Text>
                </Text>
              ) : (
                <Text style={styles.bannerTitle}>
                  🎉 You&apos;ve unlocked{" "}
                  <Text style={styles.bannerHighlight}>FREE delivery</Text>
                </Text>
              )}

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progressRatio * 100}%` },
                  ]}
                />
              </View>

              <View style={styles.bannerFooter}>
                <Text style={styles.bannerScale}>
                  ₹{itemTotal} / ₹{FREE_DELIVERY_THRESHOLD}
                </Text>
                <TouchableOpacity
                  style={styles.offersBtn}
                  activeOpacity={0.7}
                  onPress={() => console.log("See offers")}
                >
                  <Text style={styles.offersBtnText}>See offers ›</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.sectionLabel}>
              {items.length} {items.length === 1 ? "item" : "items"} in cart
            </Text>
          </View>
        }
        ListFooterComponent={
          <View>
            {/* Delivery info */}
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryIcon}>🛵</Text>
              <View style={styles.deliveryText}>
                <Text style={styles.deliveryTitle}>
                  Free delivery on orders above ₹{FREE_DELIVERY_THRESHOLD}
                </Text>
                {shop ? (
                  <Text style={styles.deliverySub}>
                    Delivered from {shop.name}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* Price summary */}
            <View style={styles.summary}>
              <Text style={styles.summaryHeading}>Bill Details</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Item total</Text>
                <Text style={styles.summaryValue}>₹{itemTotal}</Text>
              </View>

              {savings > 0 ? (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Savings</Text>
                  <Text style={[styles.summaryValue, styles.summaryNeg]}>
                    − ₹{savings}
                  </Text>
                </View>
              ) : null}

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery fee</Text>
                {deliveryFee === 0 ? (
                  <Text style={[styles.summaryValue, styles.summaryFree]}>
                    FREE
                  </Text>
                ) : (
                  <Text style={styles.summaryValue}>₹{deliveryFee}</Text>
                )}
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotalLabel}>To Pay</Text>
                <Text style={styles.summaryTotalValue}>₹{toPay}</Text>
              </View>
            </View>

            {/* Savings banner */}
            {savings > 0 ? (
              <View style={styles.savingsBanner}>
                <Text style={styles.savingsBannerIcon}>🎉</Text>
                <Text style={styles.savingsBannerText}>
                  You will save{" "}
                  <Text style={styles.savingsBannerAmount}>₹{savings}</Text>{" "}
                  on this order
                </Text>
              </View>
            ) : null}
          </View>
        }
      />

      {/* Bottom checkout */}
      <View style={styles.bottomBar}>
        <Text style={styles.secureText}>🔒 Safe & secure payment</Text>
        <TouchableOpacity
          style={styles.checkoutBtn}
          activeOpacity={0.85}
          onPress={handleCheckout}
        >
          <View style={styles.checkoutBtnLeft}>
            <Text style={styles.checkoutBtnAmount}>₹{toPay}</Text>
            <Text style={styles.checkoutBtnLabel}>To Pay</Text>
          </View>
          <Text style={styles.checkoutBtnText}>Proceed to Checkout  ›</Text>
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
  heartIcon: {
    fontSize: 18,
    color: COLORS.danger,
    fontWeight: FONTS.bold,
  },
  trashIcon: {
    fontSize: 18,
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

  // List
  listContent: {
    paddingBottom: 140,
  },

  // Banner
  banner: {
    backgroundColor: COLORS.primaryLight,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primary + "33",
  },
  bannerTitle: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.semiBold,
    marginBottom: SPACING.sm,
  },
  bannerHighlight: {
    color: COLORS.primary,
    fontWeight: FONTS.extraBold,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  bannerFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACING.sm,
  },
  bannerScale: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    fontWeight: FONTS.semiBold,
  },
  offersBtn: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  offersBtnText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.base,
    fontWeight: FONTS.bold,
  },

  sectionLabel: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },

  // Cart items list (the actual items live in CartItem.tsx)
  // FlatList renders them with horizontal padding via this hack:
  // (we apply padding through the parent column wrapper)

  // Delivery info
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  deliveryIcon: {
    fontSize: 28,
  },
  deliveryText: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
  },
  deliverySub: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    marginTop: 2,
  },

  // Price summary
  summary: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  summaryHeading: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.medium,
  },
  summaryValue: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.bold,
  },
  summaryNeg: {
    color: COLORS.primary,
  },
  summaryFree: {
    color: COLORS.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  summaryTotalLabel: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },
  summaryTotalValue: {
    fontSize: FONT_SIZE["4xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
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
  savingsBannerAmount: {
    color: "#C2410C",
    fontWeight: FONTS.extraBold,
  },

  // Bottom bar
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
  checkoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  checkoutBtnLeft: {
    alignItems: "flex-start",
  },
  checkoutBtnAmount: {
    color: COLORS.white,
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
    lineHeight: 24,
  },
  checkoutBtnLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: FONT_SIZE.md,
    fontWeight: FONTS.semiBold,
  },
  checkoutBtnText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
  },

  // Empty state
  empty: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
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

export default CartScreen;
