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

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
};

// ── Component ─────────────────────────────────────────────────────────────────

const DeliveryOption: React.FC<Props> = ({
  icon,
  title,
  description,
  selected,
  onSelect,
}) => (
  <TouchableOpacity
    style={[styles.card, selected && styles.cardSelected]}
    activeOpacity={PRESS.opacity}
    onPress={onSelect}
  >
    <View
      style={[styles.iconBox, selected && styles.iconBoxSelected]}
    >
      <Text style={styles.icon}>{icon}</Text>
    </View>

    <View style={styles.text}>
      <Text style={[styles.title, selected && styles.titleSelected]}>
        {title}
      </Text>
      <Text style={styles.description}>{description}</Text>
    </View>

    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected ? <View style={styles.radioDot} /> : null}
    </View>
  </TouchableOpacity>
);

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  cardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.grayLight,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxSelected: {
    backgroundColor: COLORS.white,
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
});

export default DeliveryOption;
