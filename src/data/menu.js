// The menu. Edit this file to change what the warung sells —
// prices are in Ringgit Malaysia (RM).

export const MENU = [
  // ---- Makanan / Food ----
  { 
    id: "nasi-lemak", 
    name: "Nasi Lemak Ayam", 
    description: "Coconut rice, fried chicken, sambal, egg", 
    price: 12.50, 
    category: "Makanan", 
    emoji: "🍛" 
  },

  { id: 
    "nasi-goreng", 
    name: "Nasi Goreng Kampung", 
    description: "Village-style fried rice with anchovies", 
    price: 7.50, 
    category: "Makanan", 
    emoji: "🍚" 
  },

  { id: "mee-goreng", 
    name: "Mee Goreng Mamak", 
    description: "Spicy fried yellow noodles", 
    price: 7.00, 
    category: "Makanan", 
    emoji: "🍜" 
  },

  { id: "maggi-goreng", 
    name: "Maggi Goreng", 
    description: "Stir-fried instant noodles, mamak-style", 
    price: 6.50, 
    category: "Makanan", 
    emoji: "🍳" 
  },

  { id: "roti-canai",
    name: "Roti Canai", 
    description: "Flaky flatbread with dhal & curry", 
    price: 1.50, 
    category: "Makanan", 
    emoji: "🫓" 
  },

  { id: "roti-telur", 
    name: "Roti Telur", 
    description: "Roti canai with egg", 
    price: 2.50, category: "Makanan", 
    emoji: "🍳"
  },

  { id: "ayam-goreng", 
    name: "Ayam Goreng (1 pc)", 
    description: "Crispy fried chicken piece", 
    price: 4.00, 
    category: "Makanan", 
    emoji: "🍗" 
  },

  // ---- Minuman / Drinks ----
  { id: "teh-tarik", 
    name: "Teh Tarik", 
    description: "Pulled milk tea, panas", 
    price: 2.50, category: "Minuman", emoji: "🍵" },
  { id: "kopi-o", 
    name: "Kopi O", 
    description: "Black coffee, no milk", 
    price: 2.00, category: "Minuman", emoji: "☕" },
  { id: "milo-ais", 
    name: "Milo Ais", 
    description: "Iced chocolate malt drink", 
    price: 3.50, category: "Minuman", emoji: "🧊" },
  { id: "limau-ais", 
    name: "Limau Ais", 
    description: "Iced lime juice", 
    price: 3.00, category: "Minuman", emoji: "🍋" },
];

export const CATEGORIES = ["Makanan", "Minuman"];
