import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from "../../constants/theme";

const ProductSearchBar = ({
  value,
  onChangeText,
  placeholder = "Search products",
}) => (
  <View style={styles.container}>
    <Text style={styles.icon}>🔍</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      returnKeyType="search"
    />
    {value?.length > 0 ? (
      <TouchableOpacity
        onPress={() => onChangeText("")}
        hitSlop={10}
        activeOpacity={0.6}
      >
        <Text style={styles.clear}>✕</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.grayLight,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg - 2,
    paddingVertical: SPACING.md - 1,
    gap: SPACING.sm,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  icon: {
    fontSize: FONT_SIZE["2xl"],
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    paddingVertical: 0,
  },
  clear: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.gray,
    paddingHorizontal: 4,
    fontWeight: FONTS.bold,
  },
});

export default ProductSearchBar;
