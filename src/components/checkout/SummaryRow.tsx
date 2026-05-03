import React from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  COLORS,
  FONTS,
  FONT_SIZE,
  SPACING,
} from "../../constants/theme";

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  label: string;
  value: string;
  isFree?: boolean;
  isSavings?: boolean;
  isTotal?: boolean;
};

// ── Component ─────────────────────────────────────────────────────────────────

const SummaryRow: React.FC<Props> = ({
  label,
  value,
  isFree,
  isSavings,
  isTotal,
}) => (
  <View style={[styles.row, isTotal && styles.totalRow]}>
    <Text style={[styles.label, isTotal && styles.totalLabel]}>{label}</Text>
    <Text
      style={[
        styles.value,
        isFree && styles.freeValue,
        isSavings && styles.savingsValue,
        isTotal && styles.totalValue,
      ]}
    >
      {value}
    </Text>
  </View>
);

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  totalRow: {
    paddingTop: SPACING.sm,
    marginTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  label: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.medium,
  },
  totalLabel: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONTS.extraBold,
  },
  value: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.bold,
  },
  freeValue: {
    color: COLORS.primary,
  },
  savingsValue: {
    color: COLORS.primary,
  },
  totalValue: {
    fontSize: FONT_SIZE["4xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },
});

export default SummaryRow;
