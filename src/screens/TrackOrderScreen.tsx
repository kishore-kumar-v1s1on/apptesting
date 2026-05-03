import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import React, { useCallback, useMemo } from "react";
import {
  ScrollView,
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
import {
  useOrders,
  type OrderStatus,
} from "../contexts/OrdersContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  orderId: string;
};

type Step = {
  key: OrderStatus;
  label: string;
  description: string;
  icon: string;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    key: "placed",
    label: "Order Placed",
    description: "We received your order",
    icon: "✓",
  },
  {
    key: "preparing",
    label: "Preparing",
    description: "Shop is packing your items",
    icon: "🛍",
  },
  {
    key: "out_for_delivery",
    label: "Out for Delivery",
    description: "Rider is on the way",
    icon: "🛵",
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Enjoy your order!",
    icon: "🎉",
  },
];

const STATUS_INDEX: Record<OrderStatus, number> = {
  placed: 0,
  preparing: 1,
  out_for_delivery: 2,
  delivered: 3,
};

// ── Screen ────────────────────────────────────────────────────────────────────

const TrackOrderScreen: React.FC<Props> = ({ orderId }) => {
  const { getOrder } = useOrders();
  const order = useMemo(() => getOrder(orderId), [getOrder, orderId]);

  const handleBack = useCallback((): void => {
    if (router.canGoBack()) router.back();
    else router.replace("/orders");
  }, []);

  // ── Not found ───────────────────────────────────────────────────────────────
  if (!order) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <Text style={styles.notFoundEmoji}>😕</Text>
        <Text style={styles.notFoundTitle}>Order not found</Text>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.notFoundBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.notFoundBtnText}>‹  Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const activeIndex = STATUS_INDEX[order.status];
  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

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
          <Text style={styles.title}>Track Order</Text>
          <Text style={styles.subtitle}>Order #{order.id}</Text>
        </View>
        <View style={styles.iconBtnSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ETA hero */}
        <View style={styles.etaCard}>
          <Text style={styles.etaIcon}>
            {order.deliveryType === "pickup" ? "🏪" : "🛵"}
          </Text>
          <View style={styles.etaInfo}>
            <Text style={styles.etaLabel}>
              {order.status === "delivered"
                ? "Order completed"
                : order.deliveryType === "pickup"
                ? "Ready for pickup at"
                : "Estimated arrival"}
            </Text>
            <Text style={styles.etaValue}>{order.eta}</Text>
            <Text style={styles.etaShop}>From {order.shopName}</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          {STEPS.map((step, i) => {
            const isComplete = i < activeIndex;
            const isCurrent = i === activeIndex;
            const isLast = i === STEPS.length - 1;
            return (
              <View key={step.key} style={styles.timelineRow}>
                <View style={styles.timelineColumn}>
                  <View
                    style={[
                      styles.stepCircle,
                      (isComplete || isCurrent) && styles.stepCircleActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepIcon,
                        (isComplete || isCurrent) &&
                          styles.stepIconActive,
                      ]}
                    >
                      {isComplete ? "✓" : step.icon}
                    </Text>
                  </View>
                  {!isLast ? (
                    <View
                      style={[
                        styles.connector,
                        isComplete && styles.connectorActive,
                      ]}
                    />
                  ) : null}
                </View>
                <View style={styles.timelineText}>
                  <Text
                    style={[
                      styles.stepLabel,
                      (isComplete || isCurrent) && styles.stepLabelActive,
                    ]}
                  >
                    {step.label}
                  </Text>
                  <Text style={styles.stepDescription}>
                    {step.description}
                  </Text>
                  {isCurrent ? (
                    <View style={styles.livePill}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>In progress</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>

        {/* Items */}
        <View style={styles.itemsCard}>
          <Text style={styles.sectionTitle}>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Text>
          {order.items.map((item) => (
            <View key={item.productId} style={styles.itemRow}>
              <View style={styles.itemImageBox}>
                {item.image ? (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                    contentFit="cover"
                    transition={150}
                  />
                ) : null}
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                {item.weight ? (
                  <Text style={styles.itemMeta}>
                    {item.weight} • Qty {item.quantity}
                  </Text>
                ) : (
                  <Text style={styles.itemMeta}>Qty {item.quantity}</Text>
                )}
              </View>
              <Text style={styles.itemPrice}>
                ₹{item.price * item.quantity}
              </Text>
            </View>
          ))}
        </View>

        {/* Bill summary */}
        <View style={styles.billCard}>
          <Text style={styles.sectionTitle}>Bill Summary</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Items Total</Text>
            <Text style={styles.billValue}>₹{order.itemsTotal}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            <Text
              style={[
                styles.billValue,
                order.deliveryFee === 0 && styles.billFree,
              ]}
            >
              {order.deliveryFee === 0 ? "FREE" : `₹${order.deliveryFee}`}
            </Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Handling Charge</Text>
            <Text style={styles.billValue}>₹{order.handlingCharge}</Text>
          </View>
          <View style={styles.billDivider} />
          <View style={styles.billRow}>
            <Text style={styles.billTotalLabel}>Total Paid</Text>
            <Text style={styles.billTotalValue}>₹{order.total}</Text>
          </View>
          <View style={styles.paymentChip}>
            <Text style={styles.paymentChipText}>
              Paid via{" "}
              {order.paymentMethod === "upi" ? "UPI" : "Cash on Delivery"}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.helpBtn}
          activeOpacity={0.85}
          onPress={() => console.log("Need help")}
        >
          <Text style={styles.helpBtnText}>Need help?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeBtn}
          activeOpacity={0.85}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.homeBtnText}>Continue Shopping</Text>
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

  scrollContent: {
    paddingBottom: 100,
  },

  // ETA hero
  etaCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary + "33",
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  etaIcon: {
    fontSize: 36,
  },
  etaInfo: {
    flex: 1,
  },
  etaLabel: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
  },
  etaValue: {
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.primary,
    marginTop: 2,
  },
  etaShop: {
    fontSize: FONT_SIZE.base,
    color: COLORS.dark,
    fontWeight: FONTS.semiBold,
    marginTop: 4,
  },

  // Cards
  timelineCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  itemsCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  billCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
    marginBottom: SPACING.md,
  },

  // Timeline
  timelineRow: {
    flexDirection: "row",
    gap: SPACING.md,
    minHeight: 64,
  },
  timelineColumn: {
    alignItems: "center",
    width: 36,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.grayLight,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stepIcon: {
    fontSize: 16,
    color: COLORS.gray,
  },
  stepIconActive: {
    color: COLORS.white,
    fontWeight: FONTS.bold,
  },
  connector: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  connectorActive: {
    backgroundColor: COLORS.primary,
  },
  timelineText: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: SPACING.md,
  },
  stepLabel: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
    color: COLORS.gray,
  },
  stepLabelActive: {
    color: COLORS.dark,
  },
  stepDescription: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    marginTop: 2,
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    marginTop: 6,
    alignSelf: "flex-start",
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  liveText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
    fontWeight: FONTS.bold,
    lineHeight: 14,
    includeFontPadding: false,
  },

  // Items
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemImageBox: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.grayLight,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.bold,
  },
  itemMeta: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.bold,
  },

  // Bill
  billRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  billLabel: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.medium,
  },
  billValue: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.bold,
  },
  billFree: {
    color: COLORS.primary,
  },
  billDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  billTotalLabel: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },
  billTotalValue: {
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },
  paymentChip: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  paymentChipText: {
    fontSize: FONT_SIZE.base,
    color: COLORS.primary,
    fontWeight: FONTS.bold,
  },

  // Bottom
  bottomBar: {
    flexDirection: "row",
    gap: SPACING.md,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  helpBtn: {
    flex: 1,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  helpBtnText: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.lg,
  },
  homeBtn: {
    flex: 1,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  homeBtnText: {
    color: COLORS.white,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.lg,
  },

  // Not found
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
  },
  notFoundEmoji: {
    fontSize: 60,
    marginBottom: SPACING.md,
  },
  notFoundTitle: {
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    marginBottom: SPACING.xl,
  },
  notFoundBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  notFoundBtnText: {
    color: COLORS.white,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.xl,
  },
});

export default TrackOrderScreen;
