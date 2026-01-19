# 🧁 How to Add Cupcakes Using WordPress Posts (FREE)

## ✅ This Works with FREE WordPress.com!

No plugins needed! Just use regular WordPress Posts.

---

## 📝 How to Create a Cupcake Post

### Step 1: Go to WordPress Admin
1. Visit: https://flabbergasterbakes.wordpress.com/wp-admin
2. Log in with your credentials

### Step 2: Create New Post
1. Click **"Posts"** → **"Add New"**
2. You'll see the post editor

### Step 3: Fill in the Details

**Title:** (This becomes the cupcake name)
```
Strawberry Cream Velvet
```

**Content:** (Add price and description)
```
Price: $4.50

Bright strawberry sponge topped with sweet-infused sugar crystals and a tall cloud of strawberry cream.
```

**Featured Image:**
1. Click "Set featured image" (right sidebar)
2. Upload your cupcake photo
3. Click "Set featured image"

### Step 4: Publish
1. Click **"Publish"** button (top right)
2. Click **"Publish"** again to confirm
3. Done! ✅

---

## 💡 Price Format Options

The system will automatically detect prices in these formats:

```
Price: 4.50
Price: $4.50
₹450
$4.50
Rs. 450
```

Just include ONE of these formats in your post content!

---

## 📸 Image Tips

- **Use high-quality images** (at least 800x800px)
- **Square images work best** (1:1 ratio)
- **Upload as Featured Image** (not in content)

---

## 📋 Example Post Template

**Title:**
```
Chocolate Fudge Delight
```

**Content:**
```
Price: $5.00

Rich dark chocolate sponge with layers of smooth chocolate ganache and topped with chocolate shavings. A chocolate lover's dream!
```

**Featured Image:**
- Upload a beautiful photo of the cupcake

**Publish!**

---

## 🔄 How to See Changes on Your Website

1. Create/edit a post in WordPress
2. Click **Publish** or **Update**
3. Wait 60 seconds (for cache to refresh)
4. Refresh your website: http://localhost:3000/menu
5. Your cupcake appears! 🎉

---

## ✏️ How to Edit a Cupcake

1. Go to **Posts → All Posts**
2. Click on the post you want to edit
3. Make your changes
4. Click **Update**
5. Refresh your website after 60 seconds

---

## 🗑️ How to Remove a Cupcake

1. Go to **Posts → All Posts**
2. Hover over the post
3. Click **Trash**
4. Refresh your website after 60 seconds

---

## 🎯 Quick Checklist

Before publishing a cupcake post:
- ✅ Title is the cupcake name
- ✅ Content includes price (e.g., "Price: $4.50")
- ✅ Content includes description
- ✅ Featured image is uploaded
- ✅ Post is Published (not Draft)

---

## 🧪 Test Your Setup

### Step 1: Restart Dev Server
```bash
# Press Ctrl+C in terminal
npm run dev
```

### Step 2: Check Browser Console
1. Go to http://localhost:3000/menu
2. Press F12 to open console
3. Look for messages:
   - `🔗 Connecting to WordPress...`
   - `📝 Found X posts in WordPress`
   - `✅ Successfully loaded X cupcakes from WordPress!`

### Step 3: Verify
- Your WordPress posts should appear on the menu page!
- If not, check the console for error messages

---

## 📊 What Gets Displayed

From your WordPress post:
- **Title** → Cupcake Name
- **Content (first line with price)** → Price
- **Content (rest)** → Description
- **Featured Image** → Product Image
- **Category** → "Signature Collection" (default)

---

## 💡 Pro Tips

1. **Consistent Pricing Format**
   - Always use "Price: $X.XX" format
   - Put it on the first line

2. **Good Descriptions**
   - Keep them under 200 characters
   - Be descriptive and appetizing

3. **Quality Images**
   - Use well-lit, professional photos
   - Square format works best
   - Minimum 800x800px

4. **Regular Updates**
   - Changes appear within 60 seconds
   - No need to restart server

---

## 🆘 Troubleshooting

**Problem: Posts not showing on website**
- ✅ Check `.env.local` has correct WordPress URL
- ✅ Make sure posts are Published (not Draft)
- ✅ Wait 60 seconds for cache refresh
- ✅ Check browser console for errors

**Problem: Images not loading**
- ✅ Make sure image is set as Featured Image
- ✅ Check image URL is accessible
- ✅ Try re-uploading the image

**Problem: Price not detected**
- ✅ Use format: "Price: $4.50"
- ✅ Put price on first line of content
- ✅ Check for typos

---

**You're all set!** 🎉

Now you can manage your cupcake menu directly from WordPress.com for FREE!
