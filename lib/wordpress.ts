// WordPress API Configuration - Using Regular Posts (FREE WordPress.com Compatible)
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

export interface WordPressPost {
    id: number;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    categories: number[];
    featured_media?: number;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
        }>;
        'wp:term'?: Array<Array<{
            id: number;
            name: string;
            slug: string;
        }>>;
    };
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    weight?: number; // Weight in grams
}

/**
 * Extract price from post content
 * Looks for patterns like: ₹450, $4.50, Price: 4.50
 */
function extractPrice(content: string): number {
    // Remove HTML tags
    const text = content.replace(/<[^>]*>/g, '');

    // Look for price patterns
    const pricePatterns = [
        /₹\s*(\d+(?:\.\d{2})?)/,
        /\$\s*(\d+(?:\.\d{2})?)/,
        /price[:\s]+(\d+(?:\.\d{2})?)/i,
        /rs\.?\s*(\d+(?:\.\d{2})?)/i,
    ];

    for (const pattern of pricePatterns) {
        const match = text.match(pattern);
        if (match) {
            return parseFloat(match[1]);
        }
    }

    // Default price if not found
    return 4.50;
}

/**
 * Extract description from post content or excerpt
 * Removes price information from the description
 */
function extractDescription(post: WordPressPost): string {
    let description = '';

    // Try excerpt first
    if (post.excerpt?.rendered) {
        description = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
    }

    // Fall back to content if excerpt is empty
    if (!description || description.length < 10) {
        if (post.content?.rendered) {
            description = post.content.rendered.replace(/<[^>]*>/g, '').trim();
        }
    }

    // Remove price patterns from description
    const pricePatterns = [
        /₹\s*\d+(?:\.\d{2})?/g,
        /\$\s*\d+(?:\.\d{2})?/g,
        /price[:\s]+\d+(?:\.\d{2})?/gi,
        /rs\.?\s*\d+(?:\.\d{2})?/gi,
    ];

    for (const pattern of pricePatterns) {
        description = description.replace(pattern, '');
    }

    // Clean up extra whitespace and trim
    description = description.replace(/\s+/g, ' ').trim();

    // Limit to 200 characters
    if (description.length > 200) {
        description = description.substring(0, 200) + '...';
    }

    return description || 'Delicious handcrafted cupcake made with premium ingredients.';
}

/**
 * Extract weight from post content
 * Looks for patterns like: 100g, Weight: 150g, 200 grams
 */
function extractWeight(content: string): number | undefined {
    // Remove HTML tags
    const text = content.replace(/<[^>]*>/g, '');

    // Look for weight patterns
    const weightPatterns = [
        /(\d+)\s*g(?:rams?)?/i,
        /weight[:\s]+(\d+)\s*g(?:rams?)?/i,
        /(\d+)\s*gm/i,
    ];

    for (const pattern of weightPatterns) {
        const match = text.match(pattern);
        if (match) {
            return parseInt(match[1]);
        }
    }

    // Return undefined if not found (will use default later)
    return undefined;
}

/**
 * Fetch all cupcakes from WordPress Posts
 */
export async function getCupcakes(): Promise<Product[]> {
    try {
        console.log('🔗 Connecting to WordPress:', WORDPRESS_API_URL);
        const response = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=100`, {
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });

        if (!response.ok) {
            throw new Error(`WordPress API returned ${response.status}`);
        }

        const posts: WordPressPost[] = await response.json();
        console.log(`📝 Found ${posts.length} posts in WordPress`);

        return posts.map((post) => {
            // Get featured image
            let imageUrl = '/placeholder.jpg';
            if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
                imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
            }

            // Get category name from embedded data
            let categoryName = 'Signature Collection'; // Default
            if (post._embedded?.['wp:term']?.[0]?.[0]?.name) {
                categoryName = post._embedded['wp:term'][0][0].name;
            }

            return {
                id: post.id.toString(),
                name: post.title.rendered,
                description: extractDescription(post),
                price: extractPrice(post.content.rendered),
                image: imageUrl,
                category: categoryName,
                weight: extractWeight(post.content.rendered) || 100 // Default 100g if not specified
            };
        });
    } catch (error) {
        console.error('❌ Error fetching from WordPress:', error);
        return [];
    }
}

/**
 * Fetch a single cupcake by ID
 */
export async function getCupcakeById(id: string): Promise<Product | null> {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/posts/${id}?_embed`, {
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            return null;
        }

        const post: WordPressPost = await response.json();

        let imageUrl = '/placeholder.jpg';
        if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
            imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
        }

        // Get category name from embedded data
        let categoryName = 'Signature Collection'; // Default
        if (post._embedded?.['wp:term']?.[0]?.[0]?.name) {
            categoryName = post._embedded['wp:term'][0][0].name;
        }

        return {
            id: post.id.toString(),
            name: post.title.rendered,
            description: extractDescription(post),
            price: extractPrice(post.content.rendered),
            image: imageUrl,
            category: categoryName,
            weight: extractWeight(post.content.rendered) || 100 // Default 100g if not specified
        };
    } catch (error) {
        console.error('Error fetching cupcake:', error);
        return null;
    }
}
