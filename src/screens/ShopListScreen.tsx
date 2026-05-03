import { router, Stack } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ProductSearchBar from "../components/shop/ProductSearchBar";
import ShopListCard, {
  type ShopListItem,
} from "../components/shop/ShopListCard";
import SortBar from "../components/shop/SortBar";
import SortModal from "../components/shop/SortModal";
import {
  COLORS,
  FONTS,
  FONT_SIZE,
  RADIUS,
  SPACING,
} from "../constants/theme";
import { CATEGORY_LIST, NEARBY_SHOPS } from "../data/mockData";

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  categoryId?: string;
};

type QuickFilter = "all" | "open" | "rating4" | "nearest";
type SortKey = "nearest" | "rating" | "time";

type Category = {
  id: string;
  name: string;
  image: string;
};

type QuickChip = {
  id: QuickFilter;
  label: string;
};

type SortOption = {
  id: SortKey;
  label: string;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const QUICK_FILTERS: QuickChip[] = [
  { id: "all", label: "All Shops" },
  { id: "open", label: "Open Now" },
  { id: "rating4", label: "Rating 4+" },
  { id: "nearest", label: "Nearest" },
];

const SORT_OPTIONS: SortOption[] = [
  { id: "nearest", label: "Nearest" },
  { id: "rating", label: "Rating" },
  { id: "time", label: "Delivery Time" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const parseDistance = (s: string): number => {
  const lower = s.toLowerCase();
  const num = parseFloat(lower) || 0;
  if (lower.includes("km")) return num * 1000;
  return num; // meters
};

const parseTime = (s: string): number => {
  const match = s.match(/\d+/);
  return match ? parseInt(match[0], 10) : 999;
};

// ── Screen ────────────────────────────────────────────────────────────────────

const ShopListScreen: React.FC<Props> = ({ categoryId }) => {
  const category = categoryId
    ? (CATEGORY_LIST as Category[]).find((c) => c.id === categoryId)
    : null;
  const categoryName = category?.name ?? "All";
  const headerTitle = category ? `${categoryName} Shops` : "All Shops";

  const [query, setQuery] = useState<string>("");
  const [chip, setChip] = useState<QuickFilter>("all");
  const [sort, setSort] = useState<SortKey>("nearest");
  const [sortVisible, setSortVisible] = useState<boolean>(false);

  // ── Filter + Sort with useMemo ──────────────────────────────────────────────
  const filtered = useMemo<ShopListItem[]>(() => {
    let list = category
      ? (NEARBY_SHOPS as ShopListItem[]).filter((s) =>
          s.categories?.includes(categoryName)
        )
      : (NEARBY_SHOPS as ShopListItem[]);

    // Search by name OR category
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.categories.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Quick filter chip
    if (chip === "open") list = list.filter((s) => s.open);
    else if (chip === "rating4") list = list.filter((s) => s.rating >= 4);
    // chip === "nearest" doesn't filter, only forces sort

    // Sort
    const effectiveSort: SortKey = chip === "nearest" ? "nearest" : sort;
    list = [...list];
    switch (effectiveSort) {
      case "nearest":
        list.sort(
          (a, b) => parseDistance(a.distance) - parseDistance(b.distance)
        );
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "time":
        list.sort((a, b) => parseTime(a.time) - parseTime(b.time));
        break;
    }

    return list;
  }, [category, categoryName, query, chip, sort]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleBack = useCallback((): void => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  }, []);

  const handleViewShop = useCallback((shop: ShopListItem): void => {
    router.push({ pathname: "/shop/[id]", params: { id: shop.id } });
  }, []);

  const handleChipChange = useCallback(
    (key: QuickFilter): void => {
      setChip(key);
      if (key === "nearest") setSort("nearest");
    },
    []
  );

  const handleSortChange = useCallback(
    (key: string): void => {
      const k = key as SortKey;
      setSort(k);
      if (chip === "nearest" && k !== "nearest") setChip("all");
      setSortVisible(false);
    },
    [chip]
  );

  const handleFilterPress = useCallback((): void => {
    console.log("Open advanced filters");
  }, []);

  const sortLabel =
    SORT_OPTIONS.find((o) => o.id === (chip === "nearest" ? "nearest" : sort))
      ?.label ?? "Nearest";

  // ── Render ──────────────────────────────────────────────────────────────────
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

        <View style={styles.titleBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {headerTitle}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            Choose a shop to continue
          </Text>
        </View>

        <View style={styles.iconBtnSpacer} />
      </View>

      {/* Delivery location */}
      <View style={styles.locationRow}>
        <Text style={styles.locationIcon}>📍</Text>
        <View style={styles.locationText}>
          <Text style={styles.locationLabel}>Deliver to</Text>
          <Text style={styles.locationValue} numberOfLines={1}>
            Sathuvachari, Vellore
          </Text>
        </View>
        <TouchableOpacity
          style={styles.changeBtn}
          activeOpacity={0.7}
          onPress={() => console.log("Change location")}
        >
          <Text style={styles.changeBtnText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <ProductSearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search shops or products"
      />

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScroll}
        contentContainerStyle={styles.chipsRow}
      >
        {QUICK_FILTERS.map((c) => {
          const selected = chip === c.id;
          return (
            <TouchableOpacity
              key={c.id}
              onPress={() => handleChipChange(c.id)}
              style={[styles.chip, selected && styles.chipSelected]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.chipText,
                  selected && styles.chipTextSelected,
                ]}
              >
                {c.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          onPress={handleFilterPress}
          style={styles.filterBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.filterIcon}>☰</Text>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Count + Sort */}
      <View style={styles.metaBar}>
        <Text style={styles.countText}>
          {filtered.length} {filtered.length === 1 ? "shop" : "shops"}
        </Text>
        <SortBar
          label={sortLabel}
          onPress={() => setSortVisible(true)}
        />
      </View>

      {/* Shop list */}
      <FlatList<ShopListItem>
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <ShopListCard item={item} onViewShop={handleViewShop} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🛒</Text>
            <Text style={styles.emptyTitle}>No shops found</Text>
            <Text style={styles.emptySub}>
              Try changing the search, filter, or sort options.
            </Text>
          </View>
        }
      />

      {/* Sort modal */}
      <SortModal
        visible={sortVisible}
        options={SORT_OPTIONS}
        selectedId={chip === "nearest" ? "nearest" : sort}
        onSelect={handleSortChange}
        onClose={() => setSortVisible(false)}
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
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE["3xl"],
    fontWeight: FONTS.extraBold,
    color: COLORS.dark,
  },
  subtitle: {
    fontSize: FONT_SIZE.base,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
    marginTop: 1,
  },

  // Location
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.primaryLight,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    gap: SPACING.sm,
  },
  locationIcon: {
    fontSize: FONT_SIZE["2xl"],
  },
  locationText: {
    flex: 1,
  },
  locationLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
    fontWeight: FONTS.medium,
  },
  locationValue: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.dark,
    fontWeight: FONTS.bold,
    marginTop: 1,
  },
  changeBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  changeBtnText: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
    fontSize: FONT_SIZE.base,
  },

  // Chips
  chipsScroll: {
    flexGrow: 0,
    marginTop: SPACING.md,
  },
  chipsRow: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 6,
    alignItems: "center",
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
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    borderRadius: RADIUS.round,
    borderWidth: 1.5,
    borderColor: COLORS.dark,
    backgroundColor: COLORS.dark,
    marginRight: SPACING.sm,
  },
  filterIcon: {
    fontSize: FONT_SIZE.xl,
    lineHeight: 20,
    color: COLORS.white,
    marginRight: 4,
    includeFontPadding: false,
  },
  filterText: {
    fontSize: FONT_SIZE.lg,
    lineHeight: 18,
    color: COLORS.white,
    fontWeight: FONTS.bold,
    includeFontPadding: false,
  },

  // Meta bar
  metaBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  countText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONTS.semiBold,
    color: COLORS.dark,
  },

  // List
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
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
});

export default ShopListScreen;
