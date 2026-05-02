import React from "react";
import HomeScreen from "../../src/screens/HomeScreen";

export default function App() {
  return <HomeScreen />;
}

// import React, { useState } from "react";
// import {
//   Dimensions,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";

// const { width: SCREEN_WIDTH } = Dimensions.get("window");

// // ─── Icon Components (SVG-style via Unicode + styled Text) ───────────────────

// const Icon = ({ name, size = 20, color = "#333" }) => {
//   const icons = {
//     home: "⌂",
//     categories: "⊞",
//     cart: "🛒",
//     orders: "📋",
//     shops: "🏪",
//     search: "🔍",
//     mic: "🎤",
//     bell: "🔔",
//     pin: "📍",
//     chevronDown: "⌄",
//     chevronRight: "›",
//     star: "★",
//     bike: "🛵",
//     shield: "🔒",
//     leaf: "🌿",
//     box: "📦",
//     store: "🏬",
//     clock: "⏱",
//     delivery: "🚴",
//   };
//   return (
//     <Text style={{ fontSize: size, color, lineHeight: size + 4 }}>
//       {icons[name] || "●"}
//     </Text>
//   );
// };

// // ─── Data ────────────────────────────────────────────────────────────────────

// const CATEGORIES = [
//   { id: 1, name: "Grocery", emoji: "🛒", selected: true },
//   { id: 2, name: "Vegetables", emoji: "🥦" },
//   { id: 3, name: "Fruits", emoji: "🍎" },
//   { id: 4, name: "Dairy", emoji: "🥛" },
//   { id: 5, name: "Meat", emoji: "🥩" },
//   { id: 6, name: "More", emoji: null, isDots: true },
// ];

// const RECOMMENDED = [
//   { id: 1, name: "Basmati Rice 5kg", shops: 6, emoji: "🌾", badge: "10% OFF" },
//   { id: 2, name: "Sunflower Oil 1L", shops: 8, emoji: "🫙" },
//   { id: 3, name: "Sugar 1kg", shops: 5, emoji: "🍬" },
//   { id: 4, name: "Milk 1L", shops: 7, emoji: "🥛" },
// ];

// const NEARBY_SHOPS = [
//   {
//     id: 1,
//     name: "Sakthi Grocery",
//     rating: 4.5,
//     reviews: 320,
//     distance: "500 m",
//     time: "20 mins",
//     open: true,
//     color: "#8B4513",
//     emoji: "🏪",
//   },
//   {
//     id: 2,
//     name: "Fresh Veg Shop",
//     rating: 4.6,
//     reviews: 92,
//     distance: "600 m",
//     time: "20–30 mins",
//     open: true,
//     color: "#2E7D32",
//     emoji: "🥬",
//   },
//   {
//     id: 3,
//     name: "Murugan Stores",
//     rating: 4.4,
//     reviews: 80,
//     distance: "800 m",
//     time: "25–35 mins",
//     open: true,
//     color: "#1565C0",
//     emoji: "🏬",
//   },
//   {
//     id: 4,
//     name: "Kannan Provisions",
//     rating: 4.3,
//     reviews: 60,
//     distance: "1.0 km",
//     time: "30–40 mins",
//     open: true,
//     color: "#6A1B9A",
//     emoji: "🏷",
//   },
// ];

// const FEATURES = [
//   { icon: "🛵", title: "Fast Delivery", sub: "To your doorstep" },
//   { icon: "⭐", title: "Best Quality", sub: "Always fresh" },
//   { icon: "🔒", title: "Secure Payments", sub: "100% safe" },
//   { icon: "📦", title: "Easy Returns", sub: "Hassle free" },
// ];

// // ─── Sub Components ──────────────────────────────────────────────────────────

// const Header = () => (
//   <View style={styles.header}>
//     <View style={styles.logoRow}>
//       <View style={styles.logoIcon}>
//         <Text style={styles.logoEmoji}>🛒</Text>
//       </View>
//       <Text style={styles.logoText}>KKSly</Text>
//     </View>
//     <View style={styles.headerRight}>
//       <View style={styles.bellWrap}>
//         <Text style={{ fontSize: 22 }}>🔔</Text>
//         <View style={styles.badge}>
//           <Text style={styles.badgeText}>3</Text>
//         </View>
//       </View>
//       <View style={styles.avatar}>
//         <Text style={{ fontSize: 22 }}>👤</Text>
//       </View>
//     </View>
//   </View>
// );

// const LocationBar = () => (
//   <TouchableOpacity style={styles.locationBar}>
//     <Text style={{ fontSize: 16 }}>📍</Text>
//     <Text style={styles.locationText}>Sathuvachari, Vellore</Text>
//     <Text style={styles.chevron}>⌄</Text>
//   </TouchableOpacity>
// );

// const SearchBar = () => (
//   <View style={styles.searchBar}>
//     <Text style={{ fontSize: 18, marginRight: 8 }}>🔍</Text>
//     <TextInput
//       style={styles.searchInput}
//       placeholder='Search "Onion, Milk, Rice..."'
//       placeholderTextColor="#aaa"
//     />
//     <TouchableOpacity>
//       <Text style={{ fontSize: 18 }}>🎤</Text>
//     </TouchableOpacity>
//   </View>
// );

// const HeroBanner = () => (
//   <View style={styles.heroBanner}>
//     <View style={styles.heroContent}>
//       <Text style={styles.heroTitle1}>Want to become a</Text>
//       <Text style={styles.heroTitle2}>delivery partner?</Text>
//       <Text style={styles.heroSub}>
//         Earn with flexible hours{"\n"}and great incentives.
//       </Text>
//       <TouchableOpacity style={styles.heroBtn}>
//         <Text style={styles.heroBtnText}>Click here ›</Text>
//       </TouchableOpacity>
//     </View>
//     <View style={styles.heroImageArea}>
//       {/* Delivery rider illustration */}
//       <View style={styles.heroPhone}>
//         <View style={styles.heroPhoneInner}>
//           <Text style={{ fontSize: 28 }}>📍</Text>
//         </View>
//       </View>
//       <View style={styles.heroRider}>
//         <Text style={{ fontSize: 70, textAlign: "center" }}>🛵</Text>
//         <View style={styles.heroRiderBadge}>
//           <Text style={styles.heroRiderBadgeText}>KKSly</Text>
//         </View>
//       </View>
//     </View>
//     <View style={styles.dotRow}>
//       <View style={[styles.dot, styles.dotActive]} />
//       <View style={styles.dot} />
//       <View style={styles.dot} />
//     </View>
//   </View>
// );

// const FeatureRow = () => (
//   <View style={styles.featureRow}>
//     {FEATURES.map((f, i) => (
//       <React.Fragment key={i}>
//         <View style={styles.featureItem}>
//           <Text style={styles.featureIcon}>{f.icon}</Text>
//           <View>
//             <Text style={styles.featureTitle}>{f.title}</Text>
//             <Text style={styles.featureSub}>{f.sub}</Text>
//           </View>
//         </View>
//         {i < FEATURES.length - 1 && <View style={styles.featureDivider} />}
//       </React.Fragment>
//     ))}
//   </View>
// );

// const SectionHeader = ({ title, onViewAll }) => (
//   <View style={styles.sectionHeader}>
//     <Text style={styles.sectionTitle}>{title}</Text>
//     <TouchableOpacity onPress={onViewAll}>
//       <Text style={styles.viewAll}>View All</Text>
//     </TouchableOpacity>
//   </View>
// );

// const CategoryItem = ({ item }) => (
//   <TouchableOpacity
//     style={[styles.categoryItem, item.selected && styles.categoryItemSelected]}
//   >
//     {item.isDots ? (
//       <View style={styles.dotsGrid}>
//         {[0, 1, 2, 3].map((i) => (
//           <View key={i} style={styles.dotCircle} />
//         ))}
//       </View>
//     ) : (
//       <Text style={styles.categoryEmoji}>{item.emoji}</Text>
//     )}
//     <Text
//       style={[
//         styles.categoryName,
//         item.selected && styles.categoryNameSelected,
//       ]}
//     >
//       {item.name}
//     </Text>
//   </TouchableOpacity>
// );

// const ProductCard = ({ item }) => (
//   <View style={styles.productCard}>
//     {item.badge && (
//       <View style={styles.productBadge}>
//         <Text style={styles.productBadgeText}>{item.badge}</Text>
//       </View>
//     )}
//     <View style={styles.productImageBox}>
//       <Text style={styles.productEmoji}>{item.emoji}</Text>
//     </View>
//     <Text style={styles.productName}>{item.name}</Text>
//     <View style={styles.productShopsRow}>
//       <Text style={{ fontSize: 11 }}>🏪</Text>
//       <Text style={styles.productShops}>Available in {item.shops} shops</Text>
//     </View>
//     <TouchableOpacity style={styles.viewShopsBtn}>
//       <Text style={styles.viewShopsBtnText}>View Shops</Text>
//     </TouchableOpacity>
//   </View>
// );

// const ShopCard = ({ item }) => (
//   <View style={styles.shopCard}>
//     <View style={[styles.shopImageBox, { backgroundColor: item.color + "33" }]}>
//       <Text style={styles.shopEmoji}>{item.emoji}</Text>
//       {item.open && (
//         <View style={styles.openBadge}>
//           <Text style={styles.openBadgeText}>Open</Text>
//         </View>
//       )}
//       <View style={styles.shopNameOverlay}>
//         <Text style={styles.shopNameOverlayText}>{item.name}</Text>
//       </View>
//     </View>
//     <View style={styles.shopInfo}>
//       <Text style={styles.shopName}>{item.name}</Text>
//       <View style={styles.shopMeta}>
//         <Text style={{ fontSize: 12, color: "#f59e0b" }}>★</Text>
//         <Text style={styles.shopRating}>
//           {item.rating} ({item.reviews})
//         </Text>
//       </View>
//       <View style={styles.shopMeta}>
//         <Text style={{ fontSize: 11 }}>🏪</Text>
//         <Text style={styles.shopDistance}>
//           {item.distance} • {item.time}
//         </Text>
//       </View>
//       <View style={styles.shopMeta}>
//         <Text style={{ fontSize: 11 }}>🛵</Text>
//         <Text style={styles.shopDelivery}>Free delivery</Text>
//       </View>
//     </View>
//   </View>
// );

// const PromoFooter = () => (
//   <View style={styles.promoFooter}>
//     <View style={styles.promoLeft}>
//       <Text style={styles.promoSub}>Groceries at your doorstep</Text>
//       <Text style={styles.promoTitle}>Save more with offers!</Text>
//       <TouchableOpacity style={styles.promoBtn}>
//         <Text style={styles.promoBtnText}>Shop Now ›</Text>
//       </TouchableOpacity>
//     </View>
//     <View style={styles.promoRight}>
//       <Text style={{ fontSize: 48 }}>🛒</Text>
//       <View style={styles.bestPriceBadge}>
//         <Text style={styles.bestPriceText}>BEST{"\n"}PRICES</Text>
//       </View>
//     </View>
//   </View>
// );

// const BottomNav = () => {
//   const [active, setActive] = useState("Home");
//   const tabs = [
//     { name: "Home", emoji: "🏠" },
//     { name: "Categories", emoji: "⊞" },
//     { name: "Cart", emoji: "🛒", badge: 3 },
//     { name: "Orders", emoji: "📋" },
//     { name: "Shops", emoji: "🏪" },
//   ];
//   return (
//     <View style={styles.bottomNav}>
//       {tabs.map((tab) => (
//         <TouchableOpacity
//           key={tab.name}
//           style={styles.navItem}
//           onPress={() => setActive(tab.name)}
//         >
//           <View style={{ position: "relative" }}>
//             <Text
//               style={[
//                 styles.navEmoji,
//                 active === tab.name && styles.navEmojiActive,
//               ]}
//             >
//               {tab.emoji}
//             </Text>
//             {tab.badge && (
//               <View style={styles.navBadge}>
//                 <Text style={styles.navBadgeText}>{tab.badge}</Text>
//               </View>
//             )}
//           </View>
//           <Text
//             style={[
//               styles.navLabel,
//               active === tab.name && styles.navLabelActive,
//             ]}
//           >
//             {tab.name}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// // ─── Main Screen ─────────────────────────────────────────────────────────────

// export default function KKSlyHome() {
//   return (
//     <View style={styles.root}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <Header />
//       <LocationBar />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 80 }}
//       >
//         <View style={{ paddingHorizontal: 16 }}>
//           <SearchBar />
//         </View>

//         <View style={{ marginHorizontal: 16, marginTop: 12 }}>
//           <HeroBanner />
//         </View>

//         <View style={{ marginHorizontal: 16, marginTop: 12 }}>
//           <FeatureRow />
//         </View>

//         {/* Shop By Category */}
//         <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
//           <SectionHeader title="Shop by Category" />
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={{ marginTop: 12 }}
//           >
//             {CATEGORIES.map((cat) => (
//               <CategoryItem key={cat.id} item={cat} />
//             ))}
//           </ScrollView>
//         </View>

//         {/* Recommended */}
//         <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
//           <SectionHeader title="Recommended for You" />
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={{ marginTop: 12 }}
//           >
//             {RECOMMENDED.map((item) => (
//               <ProductCard key={item.id} item={item} />
//             ))}
//           </ScrollView>
//         </View>

//         {/* Nearby Shops */}
//         <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
//           <SectionHeader title="Nearby Shops" />
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={{ marginTop: 12 }}
//           >
//             {NEARBY_SHOPS.map((shop) => (
//               <ShopCard key={shop.id} item={shop} />
//             ))}
//           </ScrollView>
//         </View>

//         {/* Promo Banner */}
//         <View style={{ marginHorizontal: 16, marginTop: 20 }}>
//           <PromoFooter />
//         </View>
//       </ScrollView>

//       <BottomNav />
//     </View>
//   );
// }

// // ─── Styles ──────────────────────────────────────────────────────────────────

// const GREEN = "#1B8B3B";
// const LIGHT_GREEN = "#E8F5E9";
// const DARK = "#1a1a1a";
// const GRAY = "#888";
// const BORDER = "#E5E7EB";

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   // Header
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingTop: 48,
//     paddingBottom: 6,
//     backgroundColor: "#fff",
//   },
//   logoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   logoIcon: {
//     width: 36,
//     height: 36,
//     borderRadius: 8,
//     backgroundColor: GREEN,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logoEmoji: { fontSize: 18, color: "#fff" },
//   logoText: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: GREEN,
//     letterSpacing: -0.5,
//   },
//   headerRight: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   bellWrap: { position: "relative" },
//   badge: {
//     position: "absolute",
//     top: -4,
//     right: -4,
//     backgroundColor: "#EF4444",
//     borderRadius: 8,
//     minWidth: 16,
//     height: 16,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 3,
//   },
//   badgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },
//   avatar: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: "#f0f0f0",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 2,
//     borderColor: GREEN,
//   },

//   // Location
//   locationBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingBottom: 10,
//     gap: 4,
//   },
//   locationText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: DARK,
//     marginLeft: 2,
//   },
//   chevron: { fontSize: 20, color: DARK, marginTop: -4 },

//   // Search
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F9FAFB",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: BORDER,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     gap: 8,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 14,
//     color: DARK,
//     paddingVertical: 0,
//   },

//   // Hero Banner
//   heroBanner: {
//     backgroundColor: "#EEF9F1",
//     borderRadius: 16,
//     padding: 20,
//     paddingBottom: 30,
//     overflow: "hidden",
//     position: "relative",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   heroContent: { flex: 1 },
//   heroTitle1: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: DARK,
//     lineHeight: 26,
//   },
//   heroTitle2: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: GREEN,
//     lineHeight: 28,
//   },
//   heroSub: {
//     fontSize: 13,
//     color: "#555",
//     marginTop: 6,
//     lineHeight: 19,
//   },
//   heroBtn: {
//     marginTop: 16,
//     backgroundColor: GREEN,
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     alignSelf: "flex-start",
//   },
//   heroBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
//   heroImageArea: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 130,
//   },
//   heroPhone: {
//     position: "absolute",
//     right: 0,
//     top: -10,
//     width: 60,
//     height: 90,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     borderWidth: 3,
//     borderColor: GREEN,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   heroPhoneInner: { alignItems: "center" },
//   heroRider: {
//     position: "relative",
//     alignItems: "center",
//   },
//   heroRiderBadge: {
//     backgroundColor: GREEN,
//     borderRadius: 6,
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     marginTop: -10,
//   },
//   heroRiderBadgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
//   dotRow: {
//     position: "absolute",
//     bottom: 12,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 6,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#c8e6c9",
//   },
//   dotActive: { backgroundColor: GREEN, width: 20 },

//   // Feature Row
//   featureRow: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: BORDER,
//     paddingVertical: 12,
//   },
//   featureItem: {
//     flex: 1,
//     alignItems: "center",
//     gap: 4,
//   },
//   featureIcon: { fontSize: 22 },
//   featureTitle: {
//     fontSize: 11,
//     fontWeight: "700",
//     color: DARK,
//     textAlign: "center",
//   },
//   featureSub: { fontSize: 10, color: GRAY, textAlign: "center" },
//   featureDivider: {
//     width: 1,
//     backgroundColor: BORDER,
//     marginVertical: 4,
//   },

//   // Section Header
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: DARK,
//   },
//   viewAll: {
//     fontSize: 13,
//     color: GREEN,
//     fontWeight: "600",
//   },

//   // Categories
//   categoryItem: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 80,
//     height: 88,
//     borderRadius: 12,
//     borderWidth: 1.5,
//     borderColor: BORDER,
//     marginRight: 10,
//     backgroundColor: "#fff",
//     gap: 6,
//   },
//   categoryItemSelected: {
//     borderColor: GREEN,
//     backgroundColor: LIGHT_GREEN,
//   },
//   categoryEmoji: { fontSize: 32 },
//   categoryName: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: DARK,
//     textAlign: "center",
//   },
//   categoryNameSelected: { color: GREEN },
//   dotsGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     width: 32,
//     height: 32,
//     gap: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dotCircle: {
//     width: 11,
//     height: 11,
//     borderRadius: 6,
//     backgroundColor: GREEN,
//   },

//   // Product Cards
//   productCard: {
//     width: 148,
//     borderWidth: 1,
//     borderColor: BORDER,
//     borderRadius: 12,
//     padding: 12,
//     marginRight: 12,
//     backgroundColor: "#fff",
//     position: "relative",
//   },
//   productBadge: {
//     position: "absolute",
//     top: 8,
//     left: 8,
//     backgroundColor: "#22C55E",
//     borderRadius: 4,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     zIndex: 1,
//   },
//   productBadgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
//   productImageBox: {
//     height: 80,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F9FAFB",
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   productEmoji: { fontSize: 48 },
//   productName: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: DARK,
//     marginBottom: 4,
//   },
//   productShopsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     marginBottom: 8,
//   },
//   productShops: { fontSize: 11, color: GREEN, fontWeight: "600" },
//   viewShopsBtn: {
//     borderWidth: 1.5,
//     borderColor: GREEN,
//     borderRadius: 8,
//     paddingVertical: 6,
//     alignItems: "center",
//   },
//   viewShopsBtnText: { color: GREEN, fontWeight: "700", fontSize: 12 },

//   // Shop Cards
//   shopCard: {
//     width: 160,
//     borderRadius: 12,
//     overflow: "hidden",
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: BORDER,
//     backgroundColor: "#fff",
//   },
//   shopImageBox: {
//     height: 100,
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   },
//   shopEmoji: { fontSize: 48 },
//   openBadge: {
//     position: "absolute",
//     top: 8,
//     left: 8,
//     backgroundColor: "#22C55E",
//     borderRadius: 6,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//   },
//   openBadgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
//   shopNameOverlay: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     paddingVertical: 3,
//     paddingHorizontal: 6,
//   },
//   shopNameOverlayText: { color: "#fff", fontSize: 11, fontWeight: "700" },
//   shopInfo: { padding: 10 },
//   shopName: { fontSize: 13, fontWeight: "700", color: DARK, marginBottom: 4 },
//   shopMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     marginBottom: 3,
//   },
//   shopRating: { fontSize: 12, color: DARK, fontWeight: "600" },
//   shopDistance: { fontSize: 11, color: GRAY },
//   shopDelivery: { fontSize: 11, color: GREEN, fontWeight: "600" },

//   // Promo Footer
//   promoFooter: {
//     backgroundColor: "#EEF9F1",
//     borderRadius: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 20,
//     overflow: "hidden",
//   },
//   promoLeft: { flex: 1 },
//   promoSub: { fontSize: 12, color: "#666", marginBottom: 4 },
//   promoTitle: {
//     fontSize: 17,
//     fontWeight: "800",
//     color: GREEN,
//     marginBottom: 14,
//     lineHeight: 22,
//   },
//   promoBtn: {
//     backgroundColor: GREEN,
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     alignSelf: "flex-start",
//   },
//   promoBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
//   promoRight: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 120,
//     position: "relative",
//   },
//   bestPriceBadge: {
//     position: "absolute",
//     right: 0,
//     bottom: -8,
//     backgroundColor: GREEN,
//     borderRadius: 40,
//     width: 60,
//     height: 60,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   bestPriceText: {
//     color: "#fff",
//     fontSize: 10,
//     fontWeight: "800",
//     textAlign: "center",
//     lineHeight: 14,
//   },

//   // Bottom Nav
//   bottomNav: {
//     flexDirection: "row",
//     borderTopWidth: 1,
//     borderTopColor: BORDER,
//     backgroundColor: "#fff",
//     paddingBottom: 20,
//     paddingTop: 10,
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: "center",
//     gap: 3,
//     position: "relative",
//   },
//   navEmoji: { fontSize: 22 },
//   navEmojiActive: { fontSize: 24 },
//   navLabel: { fontSize: 11, color: GRAY, fontWeight: "500" },
//   navLabelActive: { color: GREEN, fontWeight: "700" },
//   navBadge: {
//     position: "absolute",
//     top: -4,
//     right: -6,
//     backgroundColor: "#EF4444",
//     borderRadius: 8,
//     minWidth: 15,
//     height: 15,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 2,
//   },
//   navBadgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },
// });
