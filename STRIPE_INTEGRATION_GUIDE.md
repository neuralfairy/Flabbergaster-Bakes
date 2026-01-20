# Stripe Payment Integration Guide

## 🎯 Overview

Your Flabbergaster Bakes website now has **Stripe Hosted Checkout** integrated! Customers will be redirected to Stripe's secure payment page to complete their purchase.

---

## 📋 What's Been Added

### **1. Environment Variables (.env.local)**
```bash
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
STRIPE_CURRENCY=INR
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **2. API Route**
- **File:** `app/api/stripe/checkout/route.ts`
- **Purpose:** Creates Stripe Checkout Session
- **Endpoint:** `POST /api/stripe/checkout`

### **3. Success Page**
- **File:** `app/checkout/success/page.tsx`
- **URL:** `/checkout/success?session_id=xxx`
- **Features:** Order confirmation, next steps, clears cart

### **4. Updated Checkout Page**
- **File:** `app/checkout/page.tsx`
- **Features:** 
  - Shows order summary
  - "Proceed to Payment" button
  - Redirects to Stripe Hosted Checkout
  - Handles cancellation

---

## 🚀 How It Works

### **Customer Journey:**

1. **Add to Cart** → Customer adds cupcakes to cart
2. **Go to Checkout** → Reviews order summary
3. **Click "Proceed to Payment"** → Redirected to Stripe
4. **Enter Payment Details** → On Stripe's secure page
5. **Complete Payment** → Redirected back to success page
6. **Order Confirmed** → Cart is cleared, order details shown

---

## 🔧 Production Deployment

### **Add to Vercel Environment Variables:**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables

2. Add these variables:

```
STRIPE_SECRET_KEY = sk_test_YOUR_SECRET_KEY_HERE

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_YOUR_PUBLISHABLE_KEY_HERE

STRIPE_WEBHOOK_SECRET = whsec_YOUR_WEBHOOK_SECRET_HERE

STRIPE_CURRENCY = INR

NEXT_PUBLIC_APP_URL = https://your-domain.vercel.app
```

⚠️ **IMPORTANT:** Update `NEXT_PUBLIC_APP_URL` to your actual production URL!

3. **Redeploy** your site

---

## 🧪 Testing

### **Test Mode (Current Setup):**
- Using test API key: `sk_test_...`
- Use Stripe test cards: https://stripe.com/docs/testing

### **Test Card Numbers:**
- **Success:** `4242 4242 4242 4242`
- **Declined:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`

**Any future expiry date, any 3-digit CVC**

---

## 🔐 Security Notes

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Secret keys** are only used server-side
3. **Publishable keys** can be exposed client-side
4. **Webhook secret** verifies Stripe events

---

## 📊 Stripe Dashboard

Monitor payments at: https://dashboard.stripe.com

- View all transactions
- Issue refunds
- See customer details
- Download reports

---

## 🎨 Customization

### **Change Currency:**
Update in `.env.local`:
```bash
STRIPE_CURRENCY=USD  # or GBP, EUR, etc.
```

### **Success/Cancel URLs:**
Automatically set based on `NEXT_PUBLIC_APP_URL`:
- Success: `{APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
- Cancel: `{APP_URL}/checkout?cancelled=true`

---

## ⚡ Features

✅ **Hosted Checkout** - Stripe handles the payment page  
✅ **Secure** - PCI compliant, SSL encrypted  
✅ **Mobile Friendly** - Responsive design  
✅ **Multiple Payment Methods** - Cards, wallets, etc.  
✅ **Currency Support** - INR (₹) configured  
✅ **Order Summary** - Shows items before payment  
✅ **Success Page** - Confirmation and next steps  
✅ **Cart Clearing** - Auto-clears after successful payment  

---

## 🐛 Troubleshooting

### **"Stripe is not defined" error:**
- Make sure `stripe` package is installed
- Restart dev server: `npm run dev`

### **Redirect not working:**
- Check `NEXT_PUBLIC_APP_URL` is set correctly
- Verify API route is accessible

### **Payment not completing:**
- Check Stripe Dashboard for errors
- Verify webhook secret is correct
- Check browser console for errors

---

## 📝 Next Steps

1. **Test the payment flow** with test cards
2. **Add environment variables to Vercel**
3. **Deploy to production**
4. **Switch to live API keys** when ready to accept real payments

---

**Need help?** Check Stripe documentation: https://stripe.com/docs
