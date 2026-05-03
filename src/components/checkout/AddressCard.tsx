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

export type Address = {
  label: string;
  line1: string;
  line2: string;
  phone: string;
};

type Props = {
  address: Address;
  onChange?: () => void;
};

// ── Component ─────────────────────────────────────────────────────────────────

const AddressCard: React.FC<Props> = ({ address, onChange }) => (
  <View style={styles.card}>
    <View style={styles.iconBox}>
      <Text style={styles.icon}>📍</Text>
    </View>

    <View style={styles.body}>
      <View style={styles.headerRow}>
        <View style={styles.labelPill}>
          <Text style={styles.labelText}>{address.label}</Text>
        </View>
        {onChange ? (
          <TouchableOpacity
            onPress={onChange}
            activeOpacity={0.7}
            hitSlop={6}
          >
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={styles.line1}>{address.line1}</Text>
      <Text style={styles.line2}>{address.line2}</Text>
      <Text style={styles.phone}>{address.phone}</Text>
    </View>
  </View>
);

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 20,
  },
  body: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  labelPill: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  labelText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.base,
    fontWeight: FONTS.bold,
  },
  changeText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
  },
  line1: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.semiBold,
    color: COLORS.dark,
    marginBottom: 2,
  },
  line2: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    marginBottom: 6,
  },
  phone: {
    fontSize: FONT_SIZE.base,
    color: COLORS.dark,
    fontWeight: FONTS.medium,
  },
});

export default AddressCard;
