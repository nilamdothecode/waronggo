// The menu. Edit this file to change what the warung sells —
// prices are in Ringgit Malaysia (RM).

export const MENU = [
  // ---- Makanan / Food ----
  { 
    id: "nasi-lemak", 
    name: "Nasi Lemak Ayam", 
    desc: "Coconut rice, fried chicken, sambal, egg", 
    price: 12.50, 
    cat: "Makanan", 
    emoji: "🍛" 
  },

  { id: 
    "nasi-goreng", 
    name: "Nasi Goreng Kampung", 
    desc: "Village-style fried rice with anchovies", 
    price: 7.50, 
    cat: "Makanan", 
    emoji: "🍚" 
  },

  { id: "mee-goreng", 
    name: "Mee Goreng Mamak", 
    desc: "Spicy fried yellow noodles", 
    price: 7.00, 
    cat: "Makanan", 
    emoji: "🍜" 
  },

  { id: "maggi-goreng", 
    name: "Maggi Goreng", 
    desc: "Stir-fried instant noodles, mamak-style", 
    price: 6.50, 
    cat: "Makanan", 
    emoji: "🍳" 
  },

  { id: "roti-canai",
    name: "Roti Canai", 
    desc: "Flaky flatbread with dhal & curry", 
    price: 1.50, 
    cat: "Makanan", 
    emoji: "🫓" 
  },

  { id: "roti-telur", 
    name: "Roti Telur", 
    desc: "Roti canai with egg", 
    price: 2.50, cat: "Makanan", 
    emoji: "🍳"
  },

  { id: "ayam-goreng", 
    name: "Ayam Goreng (1 pc)", 
    desc: "Crispy fried chicken piece", 
    price: 4.00, 
    cat: "Makanan", 
    emoji: "🍗" 
  },

  // ---- Minuman / Drinks ----
  { id: "teh-tarik", 
    name: "Teh Tarik", 
    desc: "Pulled milk tea, panas", 
    price: 2.50, cat: "Minuman", emoji: "🍵" },
  { id: "kopi-o", 
    name: "Kopi O", 
    desc: "Black coffee, no milk", 
    price: 2.00, cat: "Minuman", emoji: "☕" },
  { id: "milo-ais", 
    name: "Milo Ais", 
    desc: "Iced chocolate malt drink", 
    price: 3.50, cat: "Minuman", emoji: "🧊" },
  { id: "limau-ais", 
    name: "Limau Ais", 
    desc: "Iced lime juice", 
    price: 3.00, cat: "Minuman", emoji: "🍋" },
];

export const CATEGORIES = ["Makanan", "Minuman"];
