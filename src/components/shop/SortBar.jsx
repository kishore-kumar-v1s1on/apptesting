import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from "../../constants/theme";

const SortBar = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.btn} activeOpacity={0.7}>
    <Text style={styles.icon}>⇅</Text>
    <Text style={styles.label}>Sort: {label}</Text>
    <Text style={styles.chevron}>⌄</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.grayLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  icon: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.dark,
    fontWeight: FONTS.bold,
  },
  label: {
    fontSize: FONT_SIZE.base,
    color: COLORS.dark,
    fontWeight: FONTS.semiBold,
  },
  chevron: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.dark,
    marginTop: -2,
  },
});

export default SortBar;
