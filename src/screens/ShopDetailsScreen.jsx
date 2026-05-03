import { router, Stack } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
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
  getProductsByShop,
  getShopById,
  PRODUCT_CATEGORIES,
  SORT_OPTIONS,
} from "../data/mockData";

import FilterChips from "../components/shop/FilterChips";
import ProductSearchBar from "../components/shop/ProductSearchBar";
import ShopHeader from "../components/shop/ShopHeader";
import ShopProductCard from "../components/shop/ShopProductCard";
import SortBar from "../components/shop/SortBar";
import SortModal from "../components/shop/SortModal";

const ShopDetailsScreen = ({ shopId }) => {
  const shop = getShopById(shopId);
  const allProducts = useMemo(() => getProductsByShop(shopId), [shopId]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recommended");
  const [sortVisible, setSortVisible] = useState(false);

  const filtered = useMemo(() => {
    let list = allProducts;

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    list = [...list];
    switch (sort) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [allProducts, query, category, sort]);

  const sortLabel =
    SORT_OPTIONS.find((o) => o.id === sort)?.label ?? "Recommended";

  const handleAdd = useCallback((product) => {
    console.log("Add to cart:", product.name);
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  }, []);

  // ── Shop not found ────────────────────────────────────────────────────────
  if (!shop) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <Text style={styles.notFoundEmoji}>😕</Text>
        <Text style={styles.notFoundTitle}>Shop not found</Text>
        <Text style={styles.notFoundSub}>
          The shop you&apos;re looking for is unavailable.
        </Text>
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

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrap}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <ShopHeader shop={shop} onBack={handleBack} />

            <ProductSearchBar
              value={query}
              onChangeText={setQuery}
              placeholder={`Search products in ${shop.name}`}
            />

            <FilterChips
              data={PRODUCT_CATEGORIES}
              selectedId={category}
              onChange={setCategory}
            />

            <View style={styles.metaRow}>
              <Text style={styles.countText}>
                {filtered.length}{" "}
                {filtered.length === 1 ? "item" : "items"}
              </Text>
              <SortBar label={sortLabel} onPress={() => setSortVisible(true)} />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <ShopProductCard item={item} onAdd={handleAdd} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySub}>
              Try changing the search, filter, or sort options.
            </Text>
          </View>
        }
      />

      <SortModal
        visible={sortVisible}
        options={SORT_OPTIONS}
        selectedId={sort}
        onSelect={(id) => {
          setSort(id);
          setSortVisible(false);
        }}
        onClose={() => setSortVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    paddingBottom: SPACING.xxl,
  },
  columnWrap: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
  },
  countText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.semiBold,
    color: COLORS.dark,
  },
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
    fontSize: FONT_SIZE["4xl"],
    fontWeight: FONTS.bold,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  notFoundSub: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray,
    marginBottom: SPACING.xl,
    textAlign: "center",
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

export default ShopDetailsScreen;
