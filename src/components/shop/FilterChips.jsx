import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from "../../constants/theme";

const Chip = ({ item, selected, onPress }) => (
  <TouchableOpacity
    onPress={() => onPress(item.id)}
    style={[styles.chip, selected && styles.chipSelected]}
    activeOpacity={0.8}
  >
    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

const FilterChips = ({ data, selectedId, onChange }) => (
  <FlatList
    data={data}
    horizontal
    keyExtractor={(item) => item.id}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.list}
    renderItem={({ item }) => (
      <Chip
        item={item}
        selected={selectedId === item.id}
        onPress={onChange}
      />
    )}
  />
);

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.round,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  chipSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.semiBold,
  },
  chipTextSelected: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
  },
});

export default FilterChips;
