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
    style={styles.scroll}
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
  scroll: {
    flexGrow: 0,
    marginTop: SPACING.md,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 6,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    borderRadius: RADIUS.round,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    marginRight: SPACING.sm,
  },
  chipSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: FONT_SIZE.lg,
    lineHeight: 18,
    color: COLORS.dark,
    fontWeight: FONTS.semiBold,
    includeFontPadding: false,
  },
  chipTextSelected: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
  },
});

export default FilterChips;
