export type Product = {
  id: number;
  slug: string;
  name: string;
  cat: string;
  price: number;
  tag?: string;
  tone: string;
  desc: string;
  material: string;
  suitableFor: string;
  packageContains: string;
  care: string;
  sizes?: string[];
};

export const products: Product[] = [
  {
    id: 1,
    slug: "peacock-leela-poshak",
    name: "Peacock Leela Poshak",
    cat: "Poshak",
    price: 799,
    tag: "Bestseller",
    tone: "blue",
    desc: "Hand-finished festive poshak with graceful peacock-inspired detailing for a beautiful Laddu Gopal darshan.",
    material: "Premium festive fabric with peacock-inspired embellishment",
    suitableFor: "Daily seva, Janmashtami, festivals and special darshan",
    packageContains: "1 Poshak set",
    care: "Handle gently. Keep away from moisture and direct heat.",
    sizes: ["0", "1", "2", "3", "4"],
  },
  {
    id: 2,
    slug: "moti-kundan-mukut",
    name: "Moti Kundan Mukut",
    cat: "Mukut",
    price: 549,
    tag: "New",
    tone: "gold",
    desc: "Elegant kundan and pearl mukut designed to add a royal finish to Laddu Gopal shringar.",
    material: "Lightweight base with kundan-style stones and pearl detailing",
    suitableFor: "Daily shringar and festive darshan",
    packageContains: "1 Mukut",
    care: "Store separately in a soft pouch when not in use.",
  },
  {
    id: 3,
    slug: "radha-krishna-jewellery-set",
    name: "Radha Krishna Jewellery Set",
    cat: "Shringar",
    price: 899,
    tag: "Loved",
    tone: "rose",
    desc: "A complete miniature jewellery set with refined detailing for an elegant devotional look.",
    material: "Decorative stones, pearls and fine finishing",
    suitableFor: "Festive shringar and special occasions",
    packageContains: "Jewellery set",
    care: "Avoid water and perfume. Store in a dry place.",
  },
  {
    id: 4,
    slug: "royal-velvet-aasan",
    name: "Royal Velvet Aasan",
    cat: "Aasan",
    price: 649,
    tone: "purple",
    desc: "Soft premium velvet aasan designed for a graceful and comfortable darshan setup.",
    material: "Soft velvet with decorative border",
    suitableFor: "Daily seating and festive decoration",
    packageContains: "1 Aasan",
    care: "Spot clean gently. Do not bleach.",
  },
  {
    id: 5,
    slug: "meenakari-flute",
    name: "Meenakari Flute",
    cat: "Seva",
    price: 299,
    tone: "green",
    desc: "Miniature decorative flute with handcrafted meenakari-inspired accents.",
    material: "Decorative metal finish with meenakari-inspired detailing",
    suitableFor: "Laddu Gopal shringar and festive setup",
    packageContains: "1 Decorative flute",
    care: "Keep dry and wipe softly.",
  },
  {
    id: 6,
    slug: "phool-shringar-box",
    name: "Phool Shringar Box",
    cat: "Shringar",
    price: 449,
    tag: "New",
    tone: "pink",
    desc: "A charming floral shringar assortment for special occasions and beautiful darshan moments.",
    material: "Decorative floral elements with festive finishing",
    suitableFor: "Festivals, special darshan and gifting",
    packageContains: "Shringar assortment",
    care: "Store in a clean, dry place.",
  },
];
