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

import FilterChips from "../components/shop/FilterChips";
import ProductCard, {
  type Product,
} from "../components/shop/ProductCard";
import ProductSearchBar from "../components/shop/ProductSearchBar";
import ShopHeader from "../components/shop/ShopHeader";
import SortBar from "../components/shop/SortBar";
import SortModal from "../components/shop/SortModal";
import { useCart } from "../contexts/CartContext";
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

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  shopId: string;
};

type Shop = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  time: string;
  open: boolean;
  color: string;
  emoji: string;
  image: string;
  categories: string[];
  offer: string | null;
};

type CategoryChip = {
  id: string;
  name: string;
};

type SortOption = {
  id: string;
  label: string;
};

type SortKey = "recommended" | "price_asc" | "price_desc" | "rating" | "name";

// ── Screen ────────────────────────────────────────────────────────────────────

const ShopDetailsScreen: React.FC<Props> = ({ shopId }) => {
  const shop = getShopById(shopId) as Shop | undefined;
  const allProducts = useMemo<Product[]>(
    () => getProductsByShop(shopId) as Product[],
    [shopId]
  );

  const { count, total } = useCart();

  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [sortVisible, setSortVisible] = useState<boolean>(false);

  // ── Filter + Sort ───────────────────────────────────────────────────────────
  const filtered = useMemo<Product[]>(() => {
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
        list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
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
    (SORT_OPTIONS as SortOption[]).find((o) => o.id === sort)?.label ??
    "Recommended";

  const handleBack = useCallback((): void => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  }, []);

  // ── Shop not found ──────────────────────────────────────────────────────────
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

      <FlatList<Product>
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrap}
        contentContainerStyle={[
          styles.listContent,
          count > 0 ? styles.listContentWithCart : null,
        ]}
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
              data={PRODUCT_CATEGORIES as CategoryChip[]}
              selectedId={category}
              onChange={setCategory}
            />

            <View style={styles.metaRow}>
              <Text style={styles.countText}>
                {filtered.length}{" "}
                {filtered.length === 1 ? "item" : "items"}
              </Text>
              <SortBar
                label={sortLabel}
                onPress={() => setSortVisible(true)}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard product={item} shopId={shop.id} />
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
        onSelect={(id: string) => {
          setSort(id as SortKey);
          setSortVisible(false);
        }}
        onClose={() => setSortVisible(false)}
      />

      {/* Floating cart bar */}
      {count > 0 ? (
        <View style={styles.cartBar}>
          <View style={styles.cartBarLeft}>
            <Text style={styles.cartBarCount}>
              {count} {count === 1 ? "item" : "items"}
            </Text>
            <Text style={styles.cartBarTotal}>₹{total}</Text>
          </View>
          <TouchableOpacity
            style={styles.cartBarBtn}
            activeOpacity={0.85}
            onPress={() => router.push("/cart")}
          >
            <Text style={styles.cartBarBtnText}>View Cart  ›</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    paddingBottom: SPACING.xxl,
  },
  listContentWithCart: {
    paddingBottom: 96,
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

  // Empty
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

  // Floating cart bar
  cartBar: {
    position: "absolute",
    left: SPACING.lg,
    right: SPACING.lg,
    bottom: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  cartBarLeft: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: SPACING.sm,
  },
  cartBarCount: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.bold,
  },
  cartBarTotal: {
    color: COLORS.white,
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
  },
  cartBarBtn: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 8,
  },
  cartBarBtnText: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.lg,
  },

  // Not found
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
