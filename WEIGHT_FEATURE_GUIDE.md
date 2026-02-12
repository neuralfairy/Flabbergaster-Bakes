# Weight Feature - Quick Reference Guide

## For Developers

### Adding Weight to Products

#### Static Products (lib/refined-products.ts)
```typescript
{
    id: "1",
    name: "Strawberry Cream Velvet",
    description: "...",
    price: 4.50,
    image: "/single_cupcake_top.png",
    category: "Signature Collection",
    weight: 100  // Add this line (in grams)
}
```

#### WordPress Products
Add weight information to your WordPress post content in any of these formats:
- `100g`
- `Weight: 100g`
- `100 grams`
- `Weight: 100 grams`

The system will automatically extract and use this weight.

### Using Weight in Components

#### Getting Total Weight
```typescript
import { useCart } from "@/lib/cart-store"

const { getTotalWeight } = useCart()
const totalWeight = getTotalWeight() // Returns total in grams
```

#### Accessing Item Weight
```typescript
const { items } = useCart()

items.map(item => {
    if (item.weight) {
        console.log(`${item.name}: ${item.weight}g`)
        console.log(`Total for ${item.quantity} items: ${item.weight * item.quantity}g`)
    }
})
```

## For Content Managers

### Adding Weight to WordPress Products

1. Edit your product post in WordPress
2. Add weight information in the post content
3. Use any of these formats:
   - "This cupcake weighs 100g"
   - "Weight: 100g"
   - "100 grams"
4. Save the post
5. Weight will automatically appear on the website

### Default Weight
If no weight is specified, products default to **100g**.

## Display Locations

### Cart Page
- **Individual Items**: Shows weight per item and total for quantity
  - Example: "Weight: 100g (Total: 300g)" for 3 items
- **Order Summary**: Shows total weight of all items

### Checkout Page
- **Item List**: Shows weight calculation per item
  - Example: "Weight: 100g × 2 = 200g"
- **Order Summary**: Shows total weight

### Menu Page
- Weight is stored but not displayed (to keep cards clean)
- Weight is added to cart when user clicks "Add to Collection"

## API Integration

### Cart Store Methods

```typescript
interface CartStore {
  getTotalWeight: () => number  // Returns total weight in grams
}
```

### Cart Item Structure

```typescript
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  weight?: number  // Optional, in grams
}
```

## Styling

Weight information uses these styles:
- **Font Size**: `text-sm` (14px) for item weights
- **Color**: `text-[#8C7364]` (muted brown)
- **Font Weight**: Regular (400)

## Conditional Display

Weight only displays when:
1. The item has a weight value
2. The weight is greater than 0

This ensures graceful handling of products without weight data.

## Examples

### Single Item
```
Mango Punch
₹260.00 each
Weight: 100g
```

### Multiple Items
```
Mango Punch
₹260.00 each
Weight: 100g (Total: 300g)
```

### Order Summary
```
Subtotal: ₹780.00
Total Weight: 300g
Total: ₹780.00
```

## Troubleshooting

### Weight Not Showing
1. Check if product has weight property
2. Verify weight is greater than 0
3. Check browser console for errors
4. Clear cart and re-add items

### Incorrect Total Weight
1. Verify individual item weights
2. Check quantity values
3. Clear browser cache
4. Refresh the page

### WordPress Weight Not Extracting
1. Ensure weight is in post content (not just title)
2. Use supported formats (100g, Weight: 100g, etc.)
3. Check WordPress API is accessible
4. Verify post is published (not draft)
