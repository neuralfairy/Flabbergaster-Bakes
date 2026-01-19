export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic Vanilla Layer Cake",
    description: "Moist vanilla cake with vanilla buttercream frosting and sprinkles",
    price: 2499,
    image: "/classic-vanilla-layer-cake.jpg",
    category: "Layer Cakes",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Decadent Chocolate Torte",
    description: "Rich dark chocolate cake with silky chocolate ganache filling",
    price: 2999,
    image: "/decadent-chocolate-torte.jpg",
    category: "Chocolate Cakes",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Strawberry Shortcake",
    description: "Light sponge cake with fresh strawberries and whipped cream",
    price: 2799,
    image: "/strawberry-shortcake-fresh.jpg",
    category: "Fruit Cakes",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Lemon Drizzle Cake",
    description: "Zesty lemon cake with lemon glaze and candied lemon slices",
    price: 2199,
    image: "/lemon-drizzle-cake-fresh.jpg",
    category: "Citrus Cakes",
    rating: 4.8,
  },
  {
    id: "5",
    name: "Red Velvet Elegance",
    description: "Velvety red cake with cream cheese frosting and white chocolate shavings",
    price: 3099,
    image: "/red-velvet-cake-elegant.jpg",
    category: "Special Cakes",
    rating: 4.9,
  },
  {
    id: "6",
    name: "Carrot Cake Delight",
    description: "Spiced carrot cake with cream cheese frosting and walnut crumble",
    price: 2399,
    image: "/carrot-cake-delight.jpg",
    category: "Layer Cakes",
    rating: 4.7,
  },
]

export const categories = Array.from(new Set(mockProducts.map((p) => p.category)))
