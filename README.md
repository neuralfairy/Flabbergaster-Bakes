# Flabbergaster Bakes - Premium Bakery E-commerce Website

A fully functional, production-ready e-commerce website for a premium bakery, built with Next.js 16, React 19, and Tailwind CSS v4.

## Features

### 🛍️ E-commerce Functionality
- **Shopping Cart**: Fully functional cart with persistent storage using Zustand
- **Add to Cart**: One-click add to cart with toast notifications
- **Cart Management**: Update quantities, remove items, view totals
- **Checkout Flow**: Multi-step checkout process (Shipping → Payment → Confirmation)
- **Order Summary**: Real-time price calculations with tax

### 📄 Pages
- **Home**: Hero section with featured products
- **Menu**: Complete product catalog with all cakes
- **About Us**: Company story, values, and team information
- **Contact**: Contact form with business information
- **Cart**: Shopping cart management
- **Checkout**: Secure checkout process

### 🎨 Design Features
- Premium color palette (cream, dusty rose, dark chocolate)
- Custom typography (Inter, Playfair Display, Great Vibes)
- Glassmorphism effects and backdrop blur
- Smooth animations and transitions
- Responsive design for all devices
- Professional product photography (AI-generated)

### 🛠️ Technical Stack
- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Images**: Next.js Image optimization
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd flabbergaster-bakes-website
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
flabbergaster-bakes-website/
├── app/
│   ├── about/page.tsx          # About page
│   ├── cart/page.tsx           # Shopping cart
│   ├── checkout/page.tsx       # Checkout flow
│   ├── contact/page.tsx        # Contact form
│   ├── menu/page.tsx           # Product catalog
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── NavbarRefined.tsx       # Navigation bar
│   ├── HeroRefined.tsx         # Hero section
│   ├── ProductCardRefined.tsx  # Product card
│   └── Toast.tsx               # Toast notifications
├── lib/
│   ├── cart-store.ts           # Zustand cart store
│   └── refined-products.ts     # Product data
└── public/
    ├── hero_raspberry_cake.png
    ├── product_cake_1.png
    ├── product_cake_2.png
    ├── product_cake_3.png
    └── product_cake_4.png
\`\`\`

## Features in Detail

### Shopping Cart
The cart uses Zustand for state management with localStorage persistence:
- Add items to cart
- Update quantities
- Remove items
- Persistent across sessions
- Real-time total calculations

### Checkout Process
Two-step checkout flow:
1. **Shipping Information**: Name, email, phone, address
2. **Payment Information**: Card details (demo only)
3. **Order Confirmation**: Success message with redirect

### Product Management
Products are defined in \`lib/refined-products.ts\` with:
- Unique ID
- Name and description
- Price
- Image path
- Category

## Customization

### Adding Products
Edit \`lib/refined-products.ts\`:
\`\`\`typescript
export const refinedProducts = [
  {
    id: "6",
    name: "Your Cake Name",
    description: "Description here",
    price: 12.00,
    image: "/your-image.png",
    category: "Category"
  }
]
\`\`\`

### Changing Colors
Edit \`app/globals.css\`:
\`\`\`css
:root {
  --color-primary: #4A3728;    /* Dark brown */
  --color-secondary: #D98C8C;  /* Dusty rose */
  --color-background: #F3E8E2; /* Cream */
}
\`\`\`

### Modifying Fonts
Edit \`app/layout.tsx\`:
\`\`\`typescript
import { YourFont } from "next/font/google"
\`\`\`

## Production Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
Build the static site:
\`\`\`bash
npm run build
\`\`\`

The output will be in the \`.next\` folder.

## Future Enhancements

- [ ] User authentication
- [ ] Order history
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Admin dashboard
- [ ] Product reviews
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Inventory management

## License

MIT License - feel free to use this project for your own bakery or business!

## Credits

- Design inspired by modern bakery aesthetics
- Product images generated with AI
- Built with ❤️ using Next.js and Tailwind CSS
