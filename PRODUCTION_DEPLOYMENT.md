# 🚀 Deploying WordPress Integration to Production

## ⚠️ Issue: WordPress Not Working in Production

Your `.env.local` file is NOT pushed to Git (it's in `.gitignore`), so your production site doesn't have the WordPress API URL.

---

## ✅ Solution: Add Environment Variable to Your Hosting Platform

### **For Vercel:**

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project: `Flabbergaster-Bakes`

2. **Navigate to Settings**
   - Click on **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add Environment Variable**
   - **Key:** `NEXT_PUBLIC_WORDPRESS_API_URL`
   - **Value:** `https://public-api.wordpress.com/wp/v2/sites/flabbergasterbakes.wordpress.com`
   - **Environments:** Check all (Production, Preview, Development)
   - Click **Save**

4. **Redeploy Your Site**
   - Go to **Deployments** tab
   - Click the **...** menu on the latest deployment
   - Click **Redeploy**
   - OR just push a new commit to trigger deployment

---

### **For Netlify:**

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Select your site

2. **Navigate to Environment Variables**
   - Click **Site settings**
   - Click **Environment variables** in the left sidebar

3. **Add New Variable**
   - Click **Add a variable**
   - **Key:** `NEXT_PUBLIC_WORDPRESS_API_URL`
   - **Value:** `https://public-api.wordpress.com/wp/v2/sites/flabbergasterbakes.wordpress.com`
   - Click **Create variable**

4. **Trigger New Deploy**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

---

### **For Other Platforms:**

The process is similar:
1. Find **Environment Variables** or **Config Vars** section
2. Add the variable:
   - **Name/Key:** `NEXT_PUBLIC_WORDPRESS_API_URL`
   - **Value:** `https://public-api.wordpress.com/wp/v2/sites/flabbergasterbakes.wordpress.com`
3. Redeploy/Restart the site

---

## 🔍 How to Verify It's Working:

After redeploying:

1. **Visit your production site**
2. **Go to the menu page**
3. **Open browser console (F12)**
4. **Look for these messages:**
   - `🔗 Connecting to WordPress...`
   - `📝 Found X posts in WordPress`
   - `✅ Successfully loaded cupcakes from WordPress!`

5. **Check if your WordPress cupcakes appear**

---

## 📝 Important Notes:

### **Environment Variable Format:**

```
NEXT_PUBLIC_WORDPRESS_API_URL=https://public-api.wordpress.com/wp/v2/sites/flabbergasterbakes.wordpress.com
```

⚠️ **Important:**
- No quotes around the value
- No spaces
- Must start with `NEXT_PUBLIC_` for Next.js client-side access

### **Why This Happens:**

- `.env.local` is in `.gitignore` (for security)
- Git doesn't push it to GitHub
- Production doesn't have access to it
- You must add it manually to your hosting platform

---

## 🚨 Common Mistakes:

❌ **Wrong:** `WORDPRESS_API_URL` (missing NEXT_PUBLIC_)
✅ **Correct:** `NEXT_PUBLIC_WORDPRESS_API_URL`

❌ **Wrong:** Using quotes `"https://..."`
✅ **Correct:** No quotes `https://...`

❌ **Wrong:** Forgetting to redeploy after adding variable
✅ **Correct:** Always redeploy after changing environment variables

---

## 🎯 Quick Checklist:

- [ ] Added `NEXT_PUBLIC_WORDPRESS_API_URL` to hosting platform
- [ ] Value is: `https://public-api.wordpress.com/wp/v2/sites/flabbergasterbakes.wordpress.com`
- [ ] Saved the environment variable
- [ ] Redeployed the site
- [ ] Verified WordPress cupcakes appear on production
- [ ] Checked browser console for success messages

---

## 💡 Pro Tip:

After adding environment variables, you can verify they're loaded by checking the Network tab in browser DevTools. Look for a request to `public-api.wordpress.com`.

---

**Once you add the environment variable and redeploy, your WordPress integration will work in production!** 🎉
