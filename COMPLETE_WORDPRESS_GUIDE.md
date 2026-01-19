# 🎯 Complete WordPress Setup Guide (100% FREE)
## From Zero to Managing Your Cupcake Menu

---

## 🆓 PART 1: Install WordPress Locally (FREE)

We'll use **Local by Flywheel** - it's completely free and super easy!

### Step 1: Download Local by Flywheel

1. Open your web browser
2. Go to: **https://localwp.com/**
3. Click the big **"DOWNLOAD"** button
4. Choose your operating system (Windows/Mac)
5. Fill in the form (or click "Or download without signing up")
6. Download will start automatically
7. Wait for download to complete

### Step 2: Install Local

**For Windows:**
1. Find the downloaded file (usually in Downloads folder)
2. Double-click `local-x.x.x-windows.exe`
3. Click "Yes" if Windows asks for permission
4. Follow the installation wizard:
   - Click "Next"
   - Accept the license agreement
   - Click "Install"
   - Wait for installation (takes 2-3 minutes)
5. Click "Finish"
6. Local will open automatically

**For Mac:**
1. Find the downloaded `.dmg` file
2. Double-click to open
3. Drag Local icon to Applications folder
4. Open Applications and double-click Local
5. Click "Open" if Mac asks for permission

### Step 3: Create Your First WordPress Site

1. **Local should now be open**
2. Click the big **"+ CREATE A NEW SITE"** button (or "+ Add Local Site")

3. **Choose your site name:**
   - Site Name: `flabbergaster-cms`
   - Click **"Continue"**

4. **Choose environment:**
   - Just click **"Continue"** (use default "Preferred" settings)

5. **Setup WordPress:**
   - WordPress Username: `admin` (or your choice)
   - WordPress Password: `admin123` (or your choice - remember this!)
   - WordPress Email: your email
   - Click **"Add Site"**

6. **Wait for site creation** (takes 1-2 minutes)
   - You'll see a progress bar
   - Local is installing WordPress for you!

7. **Site is ready!** ✅
   - You'll see a green "RUNNING" status

---

## 🎨 PART 2: Access WordPress Admin

### Step 4: Open WordPress Admin Panel

1. In Local, you should see your site `flabbergaster-cms`
2. Click the **"WP Admin"** button (or right-click site → "WP Admin")
3. Your browser will open with WordPress login page

**Login Screen:**
- Username: `admin` (or what you chose)
- Password: `admin123` (or what you chose)
- Click **"Log In"**

🎉 **You're now in WordPress!** You should see the WordPress Dashboard.

---

## 🔌 PART 3: Install Required Plugins (FREE)

### Step 5: Install Advanced Custom Fields (ACF)

1. In WordPress Dashboard, look at the left sidebar
2. Hover over **"Plugins"**
3. Click **"Add New"**
4. In the search box (top right), type: `Advanced Custom Fields`
5. Find the plugin by "WP Engine" (it's the first one, blue icon)
6. Click **"Install Now"** button
7. Wait 5 seconds
8. Click **"Activate"** button
9. ✅ Done! You'll see "Plugin activated" message

### Step 6: Install Custom Post Type UI

1. You're still on the Plugins page
2. In the search box, type: `Custom Post Type UI`
3. Find the plugin by "WebDevStudios" (orange icon)
4. Click **"Install Now"**
5. Wait 5 seconds
6. Click **"Activate"**
7. ✅ Done!

---

## 🧁 PART 4: Create "Cupcakes" Section

### Step 7: Create Custom Post Type

1. In the left sidebar, find **"CPT UI"** (new menu item)
2. Click **"CPT UI"** → **"Add/Edit Post Types"**

3. **Fill in the form:**

   **Basic Settings (top section):**
   - Post Type Slug: `cupcakes` (lowercase, no spaces)
   - Plural Label: `Cupcakes`
   - Singular Label: `Cupcake`

   **Scroll down to "Additional Labels":**
   - Menu Name: `Cupcakes`

   **Scroll down to "Settings":**
   - Find "Public" → Make sure it's set to **"True"**
   - Find "Show in REST API" → Set to **"True"** ⚠️ **VERY IMPORTANT!**
   - REST API Base Slug: `cupcakes`
   - Find "Supports" → Check these boxes:
     - ✅ Title
     - ✅ Editor
     - ✅ Featured Image

4. **Scroll to bottom** and click **"Add Post Type"** button
5. ✅ You'll see "Post type cupcakes added"

**Check if it worked:**
- Look at left sidebar
- You should now see a new menu item: **"Cupcakes"** with a cupcake icon! 🧁

---

## 📝 PART 5: Add Custom Fields

### Step 8: Create Field Group

1. In left sidebar, hover over **"Custom Fields"** (new menu)
2. Click **"Add New"**

3. **At the top:**
   - Title: `Cupcake Details`

4. **Click "+ Add Field" button** (big blue button)

### Step 9: Create Field #1 - Price

- Field Label: `Price`
- Field Name: `price` (auto-fills)
- Field Type: Click dropdown → Select **"Number"**
- Scroll down to "Validation"
  - Required: Toggle to **"Yes"** (should turn blue)
- Default Value: `5.00`

Click **"Close Field"** (top right of field box)

### Step 10: Create Field #2 - Description

Click **"+ Add Field"** again

- Field Label: `Description`
- Field Name: `description` (auto-fills)
- Field Type: Select **"Text Area"**
- Validation → Required: **"Yes"**
- Rows: `3`

Click **"Close Field"**

### Step 11: Create Field #3 - Category

Click **"+ Add Field"** again

- Field Label: `Category`
- Field Name: `category` (auto-fills)
- Field Type: Select **"Select"**
- Validation → Required: **"Yes"**
- Scroll to "Choices" section
- In the big text box, paste this (one per line):

```
Signature Collection : Signature Collection
Indulgent Series : Indulgent Series
Artisan Picks : Artisan Picks
Seasonal Specials : Seasonal Specials
```

Click **"Close Field"**

### Step 12: Create Field #4 - Product Image

Click **"+ Add Field"** again

- Field Label: `Product Image`
- Field Name: `image` (auto-fills)
- Field Type: Select **"Image"**
- Validation → Required: **"Yes"**
- Scroll to "Return Format"
  - Select **"Image Array"** (not Image URL or Image ID)

Click **"Close Field"**

### Step 13: Set Location Rules

**Scroll down to "Location" section:**
- You'll see: "Show this field group if"
- First dropdown: Select **"Post Type"**
- Second dropdown: Select **"is equal to"**
- Third dropdown: Select **"Cupcake"**

### Step 14: Save Everything

- Scroll to top right
- Click **"Publish"** button
- ✅ Done! Fields are created!

---

## ⚙️ PART 6: Enable REST API

### Step 15: Add Code to Functions File

1. In left sidebar, hover over **"Appearance"**
2. Click **"Theme File Editor"**
3. ⚠️ You might see a warning - Click **"I understand"**
4. On the right side, find and click **"functions.php"**
5. Scroll to the **very bottom** of the file
6. Add a new line and paste this code:

```php
// Enable ACF in REST API for Cupcakes
add_filter('acf/settings/rest_api_format', function() {
    return 'standard';
});

add_action('rest_api_init', function() {
    register_rest_field('cupcakes', 'acf', array(
        'get_callback' => function($object) {
            return get_fields($object['id']);
        },
    ));
});
```

7. Click **"Update File"** button (bottom)
8. ✅ You'll see "File edited successfully"

---

## 🧁 PART 7: Add Your First Cupcake

### Step 16: Create a Cupcake

1. In left sidebar, click **"Cupcakes"** → **"Add New"**

2. **Fill in the form:**

   **Title (top):**
   - Type: `Strawberry Cream Velvet`

   **Scroll down to "Cupcake Details" box:**
   - **Price:** `4.50`
   - **Description:** `Bright strawberry sponge topped with sweet-infused sugar crystals and a tall cloud of strawberry cream.`
   - **Category:** Select `Signature Collection`
   - **Product Image:** 
     - Click "Add Image"
     - Click "Upload Files"
     - Drag & drop a cupcake image OR click "Select Files"
     - Select your image
     - Click "Select" button

3. **Publish:**
   - Top right, click **"Publish"** button
   - Click **"Publish"** again to confirm
   - ✅ "Post published" message appears!

---

## 🔗 PART 8: Test the API

### Step 17: Check if WordPress API Works

1. Go back to **Local app**
2. Right-click on your site name
3. Click **"Open Site Shell"** (or "Open Site SSH")
4. A terminal/command window opens
5. Type this command and press Enter:

```bash
curl http://flabbergaster-cms.local/wp-json/wp/v2/cupcakes
```

**OR** just open your browser and go to:
```
http://flabbergaster-cms.local/wp-json/wp/v2/cupcakes
```

You should see JSON data with your cupcake! ✅

---

## 🔌 PART 9: Connect to Your Next.js Site

### Step 18: Get Your WordPress URL

1. In **Local app**, look at your site
2. You'll see "Site Domain" - it's something like:
   - `http://flabbergaster-cms.local`
3. **Copy this URL** (you'll need it in next step)

### Step 19: Create Environment File

1. Open **VS Code** (or your code editor)
2. Open your Flabbergaster Bakes project folder
3. In the root folder (same level as `package.json`), create a new file
4. Name it exactly: `.env.local`
5. Add this line (replace with YOUR WordPress URL):

```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://flabbergaster-cms.local/wp-json/wp/v2
```

6. **Save the file**

### Step 20: Update Your Products File

1. Open `lib/refined-products.ts`
2. Add this import at the very top:

```typescript
import { getCupcakes } from './wordpress';
```

3. At the bottom of the file, add this function:

```typescript
// Function to get products from WordPress (with fallback)
export async function getProducts() {
  try {
    const wpProducts = await getCupcakes();
    if (wpProducts.length > 0) {
      console.log('✅ Loaded cupcakes from WordPress!');
      return wpProducts;
    }
  } catch (error) {
    console.error('⚠️ WordPress unavailable, using static data');
  }
  return refinedProducts; // Fallback to static products
}
```

4. **Save the file**

### Step 21: Update Menu Page

1. Open `app/menu/page.tsx`
2. Find the line that says:

```typescript
import { refinedProducts } from "@/lib/refined-products"
```

3. Change it to:

```typescript
import { getProducts } from "@/lib/refined-products"
```

4. Find where it says `export default function MenuPage()` 
5. Change it to:

```typescript
export default async function MenuPage()
```

6. At the very top of the function, add:

```typescript
const products = await getProducts();
```

7. Find all places that say `refinedProducts` and replace with `products`

8. **Save the file**

### Step 22: Restart Your Dev Server

1. In your terminal where `npm run dev` is running
2. Press `Ctrl + C` to stop
3. Type `npm run dev` and press Enter
4. Wait for server to start

### Step 23: Test It!

1. Open your browser
2. Go to: `http://localhost:3000/menu`
3. **You should see your cupcake from WordPress!** 🎉

---

## 🎊 YOU'RE DONE! 

### How to Add More Cupcakes:

1. Go to WordPress Admin
2. Click **Cupcakes → Add New**
3. Fill in the form
4. Click **Publish**
5. Refresh your Next.js site - new cupcake appears!

### How to Edit a Cupcake:

1. **Cupcakes → All Cupcakes**
2. Click on the cupcake name
3. Make changes
4. Click **Update**

### How to Delete a Cupcake:

1. **Cupcakes → All Cupcakes**
2. Hover over cupcake name
3. Click **Trash**

---

## 🆘 Troubleshooting

**Problem: Can't see cupcakes on website**
- ✅ Make sure WordPress site is running in Local (green "RUNNING" status)
- ✅ Check `.env.local` has correct URL
- ✅ Restart Next.js dev server

**Problem: "Show in REST API" option not visible**
- ✅ In CPT UI, scroll down more - it's in the "Settings" section
- ✅ Look for "REST API" section

**Problem: Fields not showing when adding cupcake**
- ✅ Make sure Location rule is set to "Post Type is equal to Cupcake"
- ✅ Try refreshing the page

---

## 💰 Cost Breakdown

- Local by Flywheel: **FREE** ✅
- WordPress: **FREE** ✅
- Advanced Custom Fields: **FREE** ✅
- Custom Post Type UI: **FREE** ✅
- **TOTAL: $0.00** 🎉

---

## 📚 Quick Reference

**WordPress Admin:** http://flabbergaster-cms.local/wp-admin
**Username:** admin (or what you chose)
**Password:** admin123 (or what you chose)

**Add Cupcake:** Cupcakes → Add New
**View All:** Cupcakes → All Cupcakes
**API URL:** http://flabbergaster-cms.local/wp-json/wp/v2/cupcakes

---

**Need help? Just ask!** 🚀
