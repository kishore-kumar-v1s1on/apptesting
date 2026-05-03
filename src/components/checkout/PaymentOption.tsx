import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from "../../constants/theme";

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  icon: string;
  title: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
  rightExtra?: ReactNode;
};

// ── Component ─────────────────────────────────────────────────────────────────

const PaymentOption: React.FC<Props> = ({
  icon,
  title,
  description,
  selected,
  onSelect,
  rightExtra,
}) => (
  <TouchableOpacity
    style={[styles.card, selected && styles.cardSelected]}
    activeOpacity={0.85}
    onPress={onSelect}
  >
    <View style={styles.headerRow}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.text}>
        <Text style={[styles.title, selected && styles.titleSelected]}>
          {title}
        </Text>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>

      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>
    </View>

    {rightExtra ? <View style={styles.extra}>{rightExtra}</View> : null}
  </TouchableOpacity>
);

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  cardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 22,
  },
  text: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    marginBottom: 2,
  },
  titleSelected: {
    color: COLORS.primary,
  },
  description: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  extra: {
    marginTop: SPACING.md,
    paddingLeft: 56, // align under title (iconBox 44 + gap 12)
  },
});

export default PaymentOption;
