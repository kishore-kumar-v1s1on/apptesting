import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ProductSearchBar from "../components/shop/ProductSearchBar";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from "../constants/theme";
import { CATEGORY_LIST } from "../data/mockData";

// ── Types ─────────────────────────────────────────────────────────────────────

export type Category = {
  id: string;
  name: string;
  image: string;
};

type CategoryCardProps = {
  item: Category;
  onPress: (item: Category) => void;
};

// ── Card ──────────────────────────────────────────────────────────────────────

const CategoryCard: React.FC<CategoryCardProps> = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.85}
    onPress={() => onPress(item)}
  >
    <View style={styles.imageWrap}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
    </View>
    <Text style={styles.name} numberOfLines={1}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

// ── Screen ────────────────────────────────────────────────────────────────────

const CategoryListScreen: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const filtered = useMemo<Category[]>(() => {
    const list = CATEGORY_LIST as Category[];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  const handleBack = (): void => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const handleSelect = (item: Category): void => {
    router.push({
      pathname: "/category/[id]",
      params: { id: item.id },
    });
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Top nav */}
      <View style={styles.navRow}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.iconBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.iconText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>All Categories</Text>
        <View style={styles.iconBtnSpacer} />
      </View>

      {/* Search */}
      <ProductSearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search categories"
      />

      {/* Results count */}
      <View style={styles.metaRow}>
        <Text style={styles.countText}>
          {filtered.length}{" "}
          {filtered.length === 1 ? "category" : "categories"}
          {query.trim() ? ` for "${query.trim()}"` : ""}
        </Text>
      </View>

      {/* Grid */}
      <FlatList<Category>
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrap}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <CategoryCard item={item} onPress={handleSelect} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No categories found</Text>
            <Text style={styles.emptySub}>
              Try a different search term.
            </Text>
          </View>
        }
      />
    </View>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // Top nav
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
  navTitle: {
    flex: 1,
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },

  // Results count
  metaRow: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  countText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.semiBold,
    color: COLORS.gray,
  },

  // Grid
  listContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  columnWrap: {
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },

  // Card
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xxl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  imageWrap: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.grayLight,
    overflow: "hidden",
    marginBottom: SPACING.sm,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    textAlign: "center",
  },

  // Empty state
  empty: {
    alignItems: "center",
    paddingVertical: SPACING.xxl * 2,
    paddingHorizontal: SPACING.lg,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  emptySub: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray,
    textAlign: "center",
  },
});

export default CategoryListScreen;
