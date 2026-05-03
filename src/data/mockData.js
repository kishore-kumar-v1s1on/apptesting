// ─── KKSly Mock Data ─────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: "1", name: "Grocery.", emoji: "🛒", isDots: false },
  { id: "2", name: "Vegetables", emoji: "🥦", isDots: false },
  { id: "3", name: "Fruits", emoji: "🍎", isDots: false },
  { id: "4", name: "Dairy", emoji: "🥛", isDots: false },
  { id: "5", name: "Meat", emoji: "🥩", isDots: false },
  { id: "6", name: "kicha", emoji: "🥩", isDots: false },
  { id: "7", name: "medicine", emoji: "🥩", isDots: false },
  { id: "8", name: "More", emoji: null, isDots: true },
];

export const RECOMMENDED_PRODUCTS = [
  {
    id: "1",
    name: "Basmati Rice 5kg",
    shops: 6,
    emoji: "🌾",
    badge: "10% OFF",
  },
  { id: "2", name: "Sunflower Oil 1L", shops: 8, emoji: "🫙", badge: null },
  { id: "3", name: "Sugar 1kg", shops: 5, emoji: "🍬", badge: null },
  { id: "4", name: "Milk 1L", shops: 7, emoji: "🥛", badge: null },
];

export const NEARBY_SHOPS = [
  {
    id: "1",
    name: "Sakthi Grocery",
    rating: 4.5,
    reviews: 320,
    distance: "500 m",
    time: "20 mins",
    open: true,
    color: "#8B4513",
    emoji: "🏪",
    categories: ["Grocery", "Snacks", "Beverages", "Dairy"],
    offer: "10% OFF above ₹299",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Fresh Veg Shop",
    rating: 4.6,
    reviews: 92,
    distance: "600 m",
    time: "20–30 mins",
    open: true,
    color: "#2E7D32",
    emoji: "🥬",
    categories: ["Vegetables", "Fruits", "Dairy"],
    offer: "Buy 2 Get 1 Free",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Murugan Stores",
    rating: 4.4,
    reviews: 80,
    distance: "800 m",
    time: "25–35 mins",
    open: true,
    color: "#1565C0",
    emoji: "🏬",
    categories: ["Grocery", "Snacks", "Beverages", "Dairy"],
    offer: null,
    image:
      "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "4",
    name: "Kannan Provisions",
    rating: 4.3,
    reviews: 60,
    distance: "1.0 km",
    time: "30–40 mins",
    open: true,
    color: "#6A1B9A",
    emoji: "🏷",
    categories: ["Grocery", "Snacks", "Vegetables", "Fruits"],
    offer: "Free delivery above ₹500",
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "5",
    name: "Sakthi Grocery",
    rating: 4.2,
    reviews: 145,
    distance: "1.2 km",
    time: "30 mins",
    open: false,
    color: "#8B4513",
    emoji: "🏪",
    categories: ["Grocery", "Meat", "Dairy"],
    offer: "20% OFF on Meat",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "6",
    name: "Fresh Veg Shop",
    rating: 4.7,
    reviews: 210,
    distance: "400 m",
    time: "15 mins",
    open: true,
    color: "#2E7D32",
    emoji: "🥬",
    categories: ["Fruits", "Vegetables", "Snacks"],
    offer: "Fresh daily",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "7",
    name: "Murugan Stores",
    rating: 4.5,
    reviews: 95,
    distance: "750 m",
    time: "20 mins",
    open: true,
    color: "#1565C0",
    emoji: "🏬",
    categories: ["Grocery", "Snacks", "Beverages", "Meat"],
    offer: null,
    image:
      "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "8",
    name: "Kannan Provisions",
    rating: 3.9,
    reviews: 50,
    distance: "1.5 km",
    time: "35–45 mins",
    open: false,
    color: "#6A1B9A",
    emoji: "🏷",
    categories: ["Grocery", "Dairy", "Fruits", "Beverages"],
    offer: "Combo offer",
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "9",
    name: "Hot Bake Bakery",
    rating: 4.8,
    reviews: 220,
    distance: "400 m",
    time: "15 mins",
    open: true,
    color: "#EF6C00",
    emoji: "🥖",
    categories: ["Bakery", "Sweets"],
    offer: "Fresh from the oven",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "10",
    name: "Anand Meat Mart",
    rating: 4.6,
    reviews: 145,
    distance: "1.2 km",
    time: "30 mins",
    open: true,
    color: "#C62828",
    emoji: "🥩",
    categories: ["Meat", "Seafood"],
    offer: "Hand cut daily",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "11",
    name: "Lakshmi Pharmacy",
    rating: 4.4,
    reviews: 95,
    distance: "750 m",
    time: "20 mins",
    open: true,
    color: "#00897B",
    emoji: "💊",
    categories: ["Personal Care", "Baby Care", "Home Care"],
    offer: null,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "12",
    name: "Sweet Treats Café",
    rating: 4.7,
    reviews: 180,
    distance: "900 m",
    time: "25 mins",
    open: true,
    color: "#E91E63",
    emoji: "🧁",
    categories: ["Sweets", "Bakery", "Ice Cream"],
    offer: "Birthday combos",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=60",
  },
];

export const getShopsByCategory = (categoryName) =>
  NEARBY_SHOPS.filter((s) => s.categories?.includes(categoryName));

export const FEATURES = [
  { id: "1", icon: "🛵", title: "Fast Delivery", sub: "To your doorstep" },
  { id: "2", icon: "⭐", title: "Best Quality", sub: "Always fresh" },
  { id: "3", icon: "🔒", title: "Secure Payments", sub: "100% safe" },
  { id: "4", icon: "📦", title: "Easy Returns", sub: "Hassle free" },
];

export const NAV_TABS = [
  { name: "Home", emoji: "🏠", badge: null },
  { name: "Categories", emoji: "⊞", badge: null },
  { name: "Cart", emoji: "🛒", badge: 3 },
  { name: "Orders", emoji: "📋", badge: null },
  { name: "Shops", emoji: "🏪", badge: null },
];

// ─── Orders : Mock History ───────────────────────────────────────────────────

const NOW = Date.now();
const HOUR = 3600000;
const DAY = 86400000;

export const MOCK_PAST_ORDERS = [
  {
    id: "KKS-432109",
    shopId: "9",
    shopName: "Hot Bake Bakery",
    items: [
      {
        productId: "p29",
        name: "Biscuits Pack",
        quantity: 3,
        price: 30,
        weight: "",
        image:
          "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&auto=format&fit=crop&q=60",
      },
      {
        productId: "p30",
        name: "Chocolate Bar",
        quantity: 2,
        price: 50,
        weight: "",
        image:
          "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&auto=format&fit=crop&q=60",
      },
    ],
    itemsTotal: 190,
    deliveryFee: 0,
    handlingCharge: 10,
    total: 200,
    savings: 5,
    deliveryType: "delivery",
    paymentMethod: "upi",
    status: "out_for_delivery",
    placedAt: NOW - HOUR * 2,
    eta: "Arriving in ~10 mins",
  },
  {
    id: "KKS-784521",
    shopId: "1",
    shopName: "Sakthi Grocery",
    items: [
      {
        productId: "p1",
        name: "Basmati Rice",
        quantity: 1,
        price: 540,
        weight: "5 kg",
        image:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=60",
      },
      {
        productId: "p3",
        name: "Sugar",
        quantity: 2,
        price: 48,
        weight: "1 kg",
        image:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=60",
      },
    ],
    itemsTotal: 636,
    deliveryFee: 0,
    handlingCharge: 10,
    total: 646,
    savings: 60,
    deliveryType: "delivery",
    paymentMethod: "upi",
    status: "delivered",
    placedAt: NOW - DAY * 2,
    eta: "Delivered",
  },
  {
    id: "KKS-651892",
    shopId: "2",
    shopName: "Fresh Veg Shop",
    items: [
      {
        productId: "p7",
        name: "Onion",
        quantity: 1,
        price: 38,
        weight: "1 kg",
        image:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=60",
      },
      {
        productId: "p8",
        name: "Tomato",
        quantity: 1,
        price: 32,
        weight: "1 kg",
        image:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=60",
      },
      {
        productId: "p13",
        name: "Apple",
        quantity: 1,
        price: 180,
        weight: "1 kg",
        image:
          "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=60",
      },
    ],
    itemsTotal: 250,
    deliveryFee: 0,
    handlingCharge: 10,
    total: 260,
    savings: 32,
    deliveryType: "pickup",
    paymentMethod: "cod",
    status: "delivered",
    placedAt: NOW - DAY * 5,
    eta: "Picked up",
  },
];

// ─── Checkout : Delivery Address ─────────────────────────────────────────────

export const DELIVERY_ADDRESS = {
  label: "Home",
  line1: "12, Sathuvachari Main Road",
  line2: "Sathuvachari, Vellore, Tamil Nadu — 632009",
  phone: "+91 98765 43210",
};

// ─── All Categories Screen ───────────────────────────────────────────────────

export const CATEGORY_LIST = [
  {
    id: "1",
    name: "Grocery",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Fruits",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "4",
    name: "Dairy",
    image:
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "5",
    name: "Meat",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "6",
    name: "Snacks",
    image:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "7",
    name: "Bakery",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "8",
    name: "Beverages",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "9",
    name: "Seafood",
    image:
      "https://images.unsplash.com/photo-1535473895227-bdecb20fb157?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "10",
    name: "Frozen Food",
    image:
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "11",
    name: "Personal Care",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "12",
    name: "Home Care",
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "13",
    name: "Baby Care",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "14",
    name: "Pet Care",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "15",
    name: "Sweets",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "16",
    name: "Ice Cream",
    image:
      "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "17",
    name: "Spices",
    image:
      "https://images.unsplash.com/photo-1596040033229-a0b3b46d9da1?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "18",
    name: "Stationery",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop&q=60",
  },
];

// ─── Shop Details : Product Catalogue ────────────────────────────────────────

export const PRODUCT_CATEGORIES = [
  { id: "all", name: "All" },
  { id: "grocery", name: "Grocery" },
  { id: "vegetables", name: "Vegetables" },
  { id: "fruits", name: "Fruits" },
  { id: "dairy", name: "Dairy" },
  { id: "meat", name: "Meat" },
  { id: "snacks", name: "Snacks" },
  { id: "beverages", name: "Beverages" },
];

export const SORT_OPTIONS = [
  { id: "recommended", label: "Recommended" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
  { id: "rating", label: "Rating: High to Low" },
  { id: "name", label: "Name: A to Z" },
];

const ALL_PRODUCTS = [
  // ─ Grocery ─
  { id: "p1",  name: "Basmati Rice 5kg",  category: "grocery",    emoji: "🌾", price: 540, originalPrice: 600, rating: 4.5, reviews: 220, badge: "10% OFF", inStock: true },
  { id: "p2",  name: "Sunflower Oil 1L",  category: "grocery",    emoji: "🫙", price: 165, originalPrice: null, rating: 4.3, reviews: 110, badge: null,      inStock: true },
  { id: "p3",  name: "Sugar 1kg",         category: "grocery",    emoji: "🍬", price: 48,  originalPrice: 52,   rating: 4.2, reviews: 80,  badge: "8% OFF",  inStock: true },
  { id: "p4",  name: "Toor Dal 1kg",      category: "grocery",    emoji: "🥣", price: 145, originalPrice: null, rating: 4.4, reviews: 60,  badge: null,      inStock: true },
  { id: "p5",  name: "Wheat Flour 5kg",   category: "grocery",    emoji: "🌾", price: 240, originalPrice: 270,  rating: 4.4, reviews: 95,  badge: "11% OFF", inStock: true },
  { id: "p6",  name: "Salt 1kg",          category: "grocery",    emoji: "🧂", price: 22,  originalPrice: null, rating: 4.6, reviews: 30,  badge: null,      inStock: true },

  // ─ Vegetables ─
  { id: "p7",  name: "Onion 1kg",         category: "vegetables", emoji: "🧅", price: 38,  originalPrice: 50,   rating: 4.1, reviews: 45,  badge: "24% OFF", inStock: true },
  { id: "p8",  name: "Tomato 1kg",        category: "vegetables", emoji: "🍅", price: 32,  originalPrice: 40,   rating: 4.0, reviews: 55,  badge: "20% OFF", inStock: true },
  { id: "p9",  name: "Potato 1kg",        category: "vegetables", emoji: "🥔", price: 28,  originalPrice: null, rating: 4.2, reviews: 70,  badge: null,      inStock: true },
  { id: "p10", name: "Carrot 500g",       category: "vegetables", emoji: "🥕", price: 25,  originalPrice: 30,   rating: 4.3, reviews: 22,  badge: null,      inStock: true },
  { id: "p11", name: "Broccoli 500g",     category: "vegetables", emoji: "🥦", price: 60,  originalPrice: null, rating: 4.5, reviews: 18,  badge: null,      inStock: false },
  { id: "p12", name: "Cucumber 500g",     category: "vegetables", emoji: "🥒", price: 22,  originalPrice: 28,   rating: 4.0, reviews: 28,  badge: null,      inStock: true },

  // ─ Fruits ─
  { id: "p13", name: "Apple 1kg",         category: "fruits",     emoji: "🍎", price: 180, originalPrice: 200,  rating: 4.6, reviews: 130, badge: "10% OFF", inStock: true },
  { id: "p14", name: "Banana Dozen",      category: "fruits",     emoji: "🍌", price: 60,  originalPrice: null, rating: 4.4, reviews: 90,  badge: null,      inStock: true },
  { id: "p15", name: "Orange 1kg",        category: "fruits",     emoji: "🍊", price: 95,  originalPrice: 110,  rating: 4.3, reviews: 65,  badge: null,      inStock: true },
  { id: "p16", name: "Mango 1kg",         category: "fruits",     emoji: "🥭", price: 145, originalPrice: 180,  rating: 4.7, reviews: 200, badge: "19% OFF", inStock: true },
  { id: "p17", name: "Grapes 500g",       category: "fruits",     emoji: "🍇", price: 70,  originalPrice: null, rating: 4.5, reviews: 40,  badge: null,      inStock: true },
  { id: "p18", name: "Pomegranate 1kg",   category: "fruits",     emoji: "🍒", price: 220, originalPrice: 250,  rating: 4.4, reviews: 33,  badge: null,      inStock: false },

  // ─ Dairy ─
  { id: "p19", name: "Milk 1L",           category: "dairy",      emoji: "🥛", price: 56,  originalPrice: null, rating: 4.5, reviews: 320, badge: null,      inStock: true },
  { id: "p20", name: "Curd 500g",         category: "dairy",      emoji: "🥣", price: 45,  originalPrice: 50,   rating: 4.3, reviews: 110, badge: null,      inStock: true },
  { id: "p21", name: "Butter 100g",       category: "dairy",      emoji: "🧈", price: 56,  originalPrice: null, rating: 4.6, reviews: 75,  badge: null,      inStock: true },
  { id: "p22", name: "Paneer 200g",       category: "dairy",      emoji: "🧀", price: 90,  originalPrice: 100,  rating: 4.4, reviews: 60,  badge: "10% OFF", inStock: true },
  { id: "p23", name: "Cheese Slices",     category: "dairy",      emoji: "🧀", price: 120, originalPrice: 140,  rating: 4.2, reviews: 50,  badge: null,      inStock: true },

  // ─ Meat ─
  { id: "p24", name: "Chicken 1kg",       category: "meat",       emoji: "🍗", price: 220, originalPrice: 260,  rating: 4.4, reviews: 95,  badge: "15% OFF", inStock: true },
  { id: "p25", name: "Mutton 500g",       category: "meat",       emoji: "🥩", price: 380, originalPrice: null, rating: 4.5, reviews: 40,  badge: null,      inStock: true },
  { id: "p26", name: "Fish 1kg",          category: "meat",       emoji: "🐟", price: 280, originalPrice: 320,  rating: 4.3, reviews: 55,  badge: null,      inStock: false },
  { id: "p27", name: "Eggs 12pc",         category: "meat",       emoji: "🥚", price: 88,  originalPrice: 96,   rating: 4.5, reviews: 200, badge: null,      inStock: true },

  // ─ Snacks ─
  { id: "p28", name: "Lays Chips 90g",    category: "snacks",     emoji: "🥔", price: 35,  originalPrice: null, rating: 4.1, reviews: 120, badge: null,      inStock: true },
  { id: "p29", name: "Biscuits Pack",     category: "snacks",     emoji: "🍪", price: 30,  originalPrice: 35,   rating: 4.0, reviews: 85,  badge: null,      inStock: true },
  { id: "p30", name: "Chocolate Bar",     category: "snacks",     emoji: "🍫", price: 50,  originalPrice: null, rating: 4.6, reviews: 140, badge: null,      inStock: true },
  { id: "p31", name: "Mixture 500g",      category: "snacks",     emoji: "🥜", price: 110, originalPrice: 130,  rating: 4.3, reviews: 60,  badge: "15% OFF", inStock: true },

  // ─ Beverages ─
  { id: "p32", name: "Coca Cola 1.25L",   category: "beverages",  emoji: "🥤", price: 65,  originalPrice: 75,   rating: 4.2, reviews: 150, badge: null,      inStock: true },
  { id: "p33", name: "Mineral Water 1L",  category: "beverages",  emoji: "💧", price: 20,  originalPrice: null, rating: 4.4, reviews: 220, badge: null,      inStock: true },
  { id: "p34", name: "Fruit Juice 1L",    category: "beverages",  emoji: "🧃", price: 110, originalPrice: 125,  rating: 4.3, reviews: 70,  badge: null,      inStock: true },
  { id: "p35", name: "Tea Powder 250g",   category: "beverages",  emoji: "🍵", price: 165, originalPrice: null, rating: 4.5, reviews: 95,  badge: null,      inStock: true },
  { id: "p36", name: "Coffee 100g",       category: "beverages",  emoji: "☕", price: 240, originalPrice: 280,  rating: 4.6, reviews: 80,  badge: "14% OFF", inStock: true },
];

// Each shop carries a curated subset of categories — easy to extend later.
const SHOP_CATEGORY_MAP = {
  "1": ["grocery", "dairy", "snacks", "beverages"],
  "2": ["vegetables", "fruits", "dairy"],
  "3": ["grocery", "snacks", "beverages", "dairy"],
  "4": ["grocery", "snacks", "vegetables", "fruits"],
  "5": ["grocery", "meat", "dairy"],
  "6": ["fruits", "vegetables", "snacks"],
  "7": ["grocery", "snacks", "beverages", "meat"],
  "8": ["grocery", "dairy", "fruits", "beverages"],
  "9": ["snacks"],
  "10": ["meat"],
  "11": ["dairy"],
  "12": ["snacks"],
};

// Map a product category → representative Unsplash image so every product
// has an `image` field by default. Easy to override per product later.
const PRODUCT_CATEGORY_IMAGE = {
  grocery:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=60",
  vegetables:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=60",
  fruits:
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=60",
  dairy:
    "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=60",
  meat:
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop&q=60",
  snacks:
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&auto=format&fit=crop&q=60",
  beverages:
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&auto=format&fit=crop&q=60",
};

// Pulls "5kg" / "1L" / "12pc" / "500g" out of a product name.
const WEIGHT_RE = /\b\d+(?:\.\d+)?\s*(?:kg|g|l|ml|pc|pcs|dozen)\b/i;

const extractWeight = (name) => {
  const m = name.match(WEIGHT_RE);
  return m ? m[0].replace(/\s+/g, " ").trim() : "";
};

const stripWeight = (name) =>
  name.replace(WEIGHT_RE, "").replace(/\s{2,}/g, " ").trim();

const withImage = (product) => {
  const weight = product.weight ?? extractWeight(product.name);
  const displayName = product.displayName ?? (stripWeight(product.name) || product.name);
  return {
    ...product,
    image: product.image ?? PRODUCT_CATEGORY_IMAGE[product.category],
    weight,
    displayName,
  };
};

export const getShopById = (id) =>
  NEARBY_SHOPS.find((s) => String(s.id) === String(id));

export const getProductsByShop = (shopId) => {
  const cats = SHOP_CATEGORY_MAP[String(shopId)];
  const list = !cats
    ? ALL_PRODUCTS.slice(0, 12)
    : ALL_PRODUCTS.filter((p) => cats.includes(p.category));
  return list.map(withImage);
};
