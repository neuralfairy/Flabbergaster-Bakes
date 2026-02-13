import { getCupcakes } from './wordpress';

export const refinedProducts = [
    {
        id: "1",
        name: "Strawberry Cream Velvet ",
        description: "Bright strawberry sponge topped with sweet-infused sugar crystals and a tall cloud of strawberry cream.",
        price: 4.50,
        image: "/single_cupcake_top.png",
        category: "Signature Collection",
        weight: 100
    },
    {
        id: "2",
        name: "Matcha Zen Garden",
        description: "Dark Belgian cocoa sponge topped with silky chocolate ganache and semi-sweet chocolate chips.",
        price: 5.00,
        image: "/product_matcha.png",
        category: "Indulgent Series",
        weight: 110
    },
    {
        id: "3",
        name: "Blueberry Lemon Cloud",
        description: "Artisanal sponge with fresh mountain blueberries, lemon zest, and a smooth velvet cream swirl.",
        price: 5.50,
        image: "/product_blueberry.png",
        category: "Artisan Picks",
        weight: 105
    },
    {
        id: "4",
        name: "Raspberry Rose Royale",
        description: "Delicate rose-infused sponge with fresh raspberry reduction and floral petals.",
        price: 5.50,
        image: "/product_raspberry.png",
        category: "Signature Collection",
        weight: 95
    },
    {
        id: "5",
        name: "Salted Caramel Drift",
        description: "Buttery caramel sponge with a flowing salted caramel center and honeycomb crunch.",
        price: 5.00,
        image: "/product_caramel.png",
        category: "Indulgent Series",
        weight: 115
    },
    {
        id: "6",
        name: "Pistachio Dream",
        description: "Roasted pistachio sponge topped with a light whipped cream and crushed nuts.",
        price: 5.25,
        image: "/product_pistachio.png",
        category: "Signature Collection",
        weight: 100
    },
    {
        id: "7",
        name: "Wild Blueberry Mist",
        description: "Blueberry-studded sponge with a yogurt glaze and fresh mountain berries.",
        price: 4.50,
        image: "/product_wild_blueberry.png",
        category: "Seasonal Specials",
        weight: 90
    },
    {
        id: "8",
        name: "Matcha Zen Garden",
        description: "Pure ceremonial grade matcha sponge with a delicate white chocolate dewdrop.",
        price: 5.50,
        image: "/product_matcha.png",
        category: "Artisan Picks",
        weight: 110
    },
    {
        id: "9",
        name: "Red Cream Velvet ",
        description: "Classic crimson cocoa sponge with fresh berries and signature cream cheese whirl.",
        price: 4.75,
        image: "/hero_cupcake_4.png",
        category: "Indulgent Series",
        weight: 105
    },
    {
        id: "10",
        name: "Mango Passion Bloom",
        description: "Bright tropical mango sponge topped with vibrant passionfruit glaze and a dollop of white cream.",
        price: 5.25,
        image: "/product_mango.png",
        category: "Seasonal Specials",
        weight: 100
    },
    {
        id: "11",
        name: "Lavender Honey Glow",
        description: "Ethereal lavender-scented sponge topped with light honey cream and a piece of golden honeycomb.",
        price: 5.50,
        image: "/product_lavender.png",
        category: "Artisan Picks",
        weight: 95
    },
    {
        id: "12",
        name: "Cookies & Crimson",
        description: "Deep red velvet sponge topped with white chocolate cookie frosting and a miniature dark cookie.",
        price: 5.00,
        image: "/product_cookies.png",
        category: "Signature Collection",
        weight: 120
    },
    {
        id: "13",
        name: "Blueberry Bliss Mousse",
        description: "Silky blueberry mousse layered with fresh blueberries and a hint of lemon zest.",
        price: 6.00,
        image: "/product_blueberry.png",
        category: "Signature Mousse Collection",
        weight: 130
    },
    {
        id: "14",
        name: "Strawberry Dream Mousse",
        description: "Light strawberry mousse blended with creamy sweetness for a soft, dreamy delight.",
        price: 6.00,
        image: "/single_cupcake_top.png",
        category: "Signature Mousse Collection",
        weight: 130
    },
    {
        id: "15",
        name: "Biscoff Caramel Mousse",
        description: "Rich caramel mousse infused with crushed Biscoff cookies and a caramel drizzle.",
        price: 6.50,
        image: "/product_caramel.png",
        category: "Signature Mousse Collection",
        weight: 140
    },
    {
        id: "16",
        name: "Chocolate Dream Mousse",
        description: "Decadent dark chocolate mousse with layers of Belgian chocolate ganache.",
        price: 6.50,
        image: "/product_chocolate.png",
        category: "Signature Mousse Collection",
        weight: 135
    },
    {
        id: "17",
        name: "Vanilla Fusion Mousse",
        description: "Classic vanilla bean mousse with Madagascar vanilla and a delicate cream swirl.",
        price: 5.75,
        image: "/hero_cupcake_4.png",
        category: "Signature Mousse Collection",
        weight: 125
    }
];

// Custom order for cupcakes display
const CUPCAKE_ORDER = [
    "Classic Vanilla Cupcake",
    "Strawberry Dream Cupcake",
    "Blueberry Bliss Cupcake",
    "Chocolate Dreamy Cupcake",
    "Biscoff Caramel Cupcake",
    "Gulab Jamun Cupcake",
    "Rasmalai Cupcake",
    "Rasgulla Cupcake",
    "Kaju Katli Cupcake"
];

// Custom order for Signature Mousse Collection
const MOUSSE_ORDER = [
    "Blueberry Bliss Mousse",
    "Strawberry Dream Mousse",
    "Biscoff Caramel Mousse",
    "Chocolate Dream Mousse",
    "Vanilla Fusion Mousse"
];

// Function to sort products based on custom order
function sortProductsByCustomOrder(products: any[]): any[] {
    // Separate regular cupcakes and mousse collection
    const regularCupcakes = products.filter(p => p.category !== "Signature Mousse Collection");
    const mousseCupcakes = products.filter(p => p.category === "Signature Mousse Collection");
    
    // Sort regular cupcakes
    regularCupcakes.sort((a, b) => {
        const nameA = a.name.toLowerCase().trim();
        const nameB = b.name.toLowerCase().trim();
        
        const indexA = CUPCAKE_ORDER.findIndex(name => nameA.includes(name.toLowerCase().trim()));
        const indexB = CUPCAKE_ORDER.findIndex(name => nameB.includes(name.toLowerCase().trim()));
        
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
    });
    
    // Sort mousse cupcakes
    mousseCupcakes.sort((a, b) => {
        const nameA = a.name.toLowerCase().trim();
        const nameB = b.name.toLowerCase().trim();
        
        const indexA = MOUSSE_ORDER.findIndex(name => nameA.includes(name.toLowerCase().trim()));
        const indexB = MOUSSE_ORDER.findIndex(name => nameB.includes(name.toLowerCase().trim()));
        
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
    });
    
    // Return regular first, then mousse
    return [...regularCupcakes, ...mousseCupcakes];
}

// Function to get products from WordPress (with fallback to static)
export async function getProducts() {
    try {
        console.log('🔄 Attempting to fetch cupcakes from WordPress...');
        const wpProducts = await getCupcakes();

        if (wpProducts.length > 0) {
            console.log('✅ Successfully loaded', wpProducts.length, 'cupcakes from WordPress!');
            // Apply custom sorting
            return sortProductsByCustomOrder(wpProducts);
        } else {
            console.log('⚠️ No cupcakes found in WordPress, using static products');
            return sortProductsByCustomOrder(refinedProducts);
        }
    } catch (error) {
        console.error('❌ WordPress fetch failed:', error);
        console.log('📦 Falling back to static products');
        return sortProductsByCustomOrder(refinedProducts);
    }
}
