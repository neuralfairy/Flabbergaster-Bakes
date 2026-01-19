# 🧁 WordPress CMS Integration for Flabbergaster Bakes

## Overview
This guide will help you set up WordPress as a headless CMS to manage your cupcake menu dynamically. You'll be able to add, edit, and remove cupcakes from WordPress admin panel, and they'll automatically appear on your Next.js website!

---

## 📋 What You Need

1. **WordPress Installation** (one of these options):
   - Local WordPress (using XAMPP, MAMP, or Local by Flywheel)
   - Hosted WordPress (Bluehost, SiteGround, WP Engine, etc.)
   - WordPress.com Business plan or higher

2. **Plugins to Install**:
   - Advanced Custom Fields (ACF) - FREE
   - Custom Post Type UI (optional but recommended) - FREE

---

## 🚀 Step-by-Step Setup

### STEP 1: Install WordPress

**Option A: Local Development (Recommended for testing)**
1. Download [Local by Flywheel](https://localwp.com/) (FREE)
2. Install and create a new WordPress site
3. Name it something like "flabbergaster-cms"
4. Start the site

**Option B: Use Existing Hosting**
- If you already have WordPress hosting, use that!

---

### STEP 2: Install Required Plugins

1. Log into WordPress Admin (usually `yoursite.com/wp-admin`)
2. Go to **Plugins → Add New**
3. Search for "Advanced Custom Fields"
4. Click **Install Now** → **Activate**
5. Search for "Custom Post Type UI"
6. Click **Install Now** → **Activate**

---

### STEP 3: Create "Cupcakes" Custom Post Type

#### Using Custom Post Type UI Plugin:

1. Go to **CPT UI → Add/Edit Post Types**
2. Fill in these fields:

   **Basic Settings:**
   - Post Type Slug: `cupcakes`
   - Plural Label: `Cupcakes`
   - Singular Label: `Cupcake`

   **Additional Labels:**
   - Menu Name: `Cupcakes`

   **Settings (IMPORTANT!):**
   - Public: ✅ True
   - Show in REST API: ✅ **True** (THIS IS CRITICAL!)
   - REST API Base Slug: `cupcakes`
   - Supports: Check "Title", "Editor", "Featured Image"

3. Click **Add Post Type**

---

### STEP 4: Create Custom Fields with ACF

1. Go to **Custom Fields → Add New**
2. Title: "Cupcake Details"
3. Click **+ Add Field** and create these 4 fields:

#### Field 1: Price
- Field Label: `Price`
- Field Name: `price`
- Field Type: `Number`
- Required: ✅ Yes
- Default Value: `5.00`

#### Field 2: Description
- Field Label: `Description`
- Field Name: `description`
- Field Type: `Text Area`
- Required: ✅ Yes
- Rows: 3

#### Field 3: Category
- Field Label: `Category`
- Field Name: `category`
- Field Type: `Select`
- Choices (one per line):
  ```
  Signature Collection : Signature Collection
  Indulgent Series : Indulgent Series
  Artisan Picks : Artisan Picks
  Seasonal Specials : Seasonal Specials
  ```
- Required: ✅ Yes

#### Field 4: Product Image
- Field Label: `Product Image`
- Field Name: `image`
- Field Type: `Image`
- Return Format: `Image Array`
- Required: ✅ Yes

4. **Location Rules** (at bottom):
   - Show this field group if: **Post Type** is equal to **cupcakes**

5. Click **Publish**

---

### STEP 5: Enable ACF in REST API

1. Go to **Appearance → Theme File Editor**
2. Select `functions.php` from the right sidebar
3. Add this code at the bottom:

```php
// Enable ACF fields in REST API
add_filter('acf/settings/rest_api_format', function() {
    return 'standard';
});

// Make ACF fields available in REST API
add_action('rest_api_init', function() {
    register_rest_field('cupcakes', 'acf', array(
        'get_callback' => function($object) {
            return get_fields($object['id']);
        },
    ));
});
```

4. Click **Update File**

---

### STEP 6: Add Your First Cupcake

1. Go to **Cupcakes → Add New**
2. Fill in the form:
   - **Title**: "Strawberry Cream Velvet"
   - **Price**: 4.50
   - **Description**: "Bright strawberry sponge topped with sweet-infused sugar crystals and a tall cloud of strawberry cream."
   - **Category**: Select "Signature Collection"
   - **Product Image**: Upload a cupcake image
3. Click **Publish**

---

### STEP 7: Test WordPress API

Open your browser and visit:
```
http://your-wordpress-site.local/wp-json/wp/v2/cupcakes
```

You should see JSON data with your cupcake! ✅

---

### STEP 8: Connect Next.js to WordPress

1. Create a `.env.local` file in your Next.js project root:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://your-wordpress-site.local/wp-json/wp/v2
```

Replace `your-wordpress-site.local` with your actual WordPress URL.

2. Update `lib/refined-products.ts`:

```typescript
import { getCupcakes } from './wordpress';

// Keep your existing static products as fallback
export const staticProducts = [
  // ... your existing 12 cupcakes
];

// New function to get products (WordPress first, fallback to static)
export async function getProducts() {
  try {
    const wpProducts = await getCupcakes();
    if (wpProducts.length > 0) {
      return wpProducts;
    }
  } catch (error) {
    console.error('WordPress fetch failed, using static data:', error);
  }
  return staticProducts;
}

// Keep the old export for backwards compatibility
export const refinedProducts = staticProducts;
```

3. Update `app/menu/page.tsx` to use WordPress data:

```typescript
import { getProducts } from "@/lib/refined-products"

export default async function MenuPage() {
    const products = await getProducts(); // This will fetch from WordPress!
    
    // Rest of your code stays the same...
}
```

---

## 🎯 How to Use

### Adding a New Cupcake:
1. Go to WordPress Admin → **Cupcakes → Add New**
2. Fill in all fields
3. Click **Publish**
4. Refresh your Next.js site - new cupcake appears! 🎉

### Editing a Cupcake:
1. Go to **Cupcakes → All Cupcakes**
2. Click on the cupcake you want to edit
3. Make changes
4. Click **Update**

### Removing a Cupcake:
1. Go to **Cupcakes → All Cupcakes**
2. Hover over the cupcake
3. Click **Trash**

---

## 🔧 Troubleshooting

**Problem: Can't see cupcakes in JSON**
- ✅ Make sure "Show in REST API" is enabled
- ✅ Check that ACF code is in functions.php
- ✅ Try re-saving the cupcake post

**Problem: Images not showing**
- ✅ Verify image return format is "Image Array" in ACF
- ✅ Check that image URLs are accessible

**Problem: CORS errors**
- ✅ Add CORS headers to WordPress (see advanced section below)

---

## 🚀 Going Live

When you're ready to deploy:

1. **Get WordPress Hosting** (Bluehost, SiteGround, etc.)
2. **Update `.env.local`** with production URL:
   ```env
   NEXT_PUBLIC_WORDPRESS_API_URL=https://cms.flabbergasterbakes.com/wp-json/wp/v2
   ```
3. **Deploy Next.js** to Vercel/Netlify
4. **Add environment variable** in deployment settings

---

## 📚 Quick Reference

### WordPress Admin URLs:
- Add Cupcake: `/wp-admin/post-new.php?post_type=cupcakes`
- All Cupcakes: `/wp-admin/edit.php?post_type=cupcakes`
- Custom Fields: `/wp-admin/edit.php?post_type=acf-field-group`

### API Endpoints:
- All cupcakes: `/wp-json/wp/v2/cupcakes`
- Single cupcake: `/wp-json/wp/v2/cupcakes/{id}`

---

## ✨ Benefits

✅ **No Code Changes** - Add/remove cupcakes without touching code
✅ **Easy Management** - User-friendly WordPress interface
✅ **Image Uploads** - Upload images directly in WordPress
✅ **Automatic Updates** - Changes appear on site within 60 seconds
✅ **Fallback Safety** - If WordPress is down, static products still work

---

## 🆘 Need Help?

Common issues and solutions:
1. **404 on API**: Permalink settings → Save (re-flush permalinks)
2. **Empty response**: Check ACF field names match exactly
3. **Slow loading**: Enable caching in Next.js config

---

**You're all set!** 🎉 

Now you can manage your cupcake menu from WordPress admin panel!
