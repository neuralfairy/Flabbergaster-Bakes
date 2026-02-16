# Email Notifications Setup Guide (Nodemailer + Gmail)

## Overview
Your Flabbergaster Bakes store now sends automated email notifications via Gmail whenever an order is successfully paid. You'll receive an email with:
- Order ID
- Customer details (name, email, phone, address)
- Complete order items with quantities and prices
- Total amount paid
- Payment status

## Setup Steps

### 1. Enable 2-Factor Authentication on Gmail

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **2-Step Verification**
3. Follow the steps to enable 2FA
4. Verify with your phone number

### 2. Create Gmail App Password

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Or: Google Account → Security → 2-Step Verification → App passwords
2. You may need to sign in again
3. Under "Select app" choose **Mail**
4. Under "Select device" choose **Other (Custom name)**
5. Enter: `Flabbergaster Bakes`
6. Click **Generate**
7. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)
8. Save it somewhere safe - you won't see it again!

### 3. Update Local Environment Variables

Edit your `.env.local` file:

```env
# Email Configuration (Nodemailer with Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
ADMIN_EMAIL=your-email@gmail.com
```

**Important:** 
- `EMAIL_USER` = Your full Gmail address
- `EMAIL_PASSWORD` = The 16-character App Password (no spaces)
- `ADMIN_EMAIL` = Where you want to receive order notifications (can be same as EMAIL_USER)

### 4. Configure Vercel Environment Variables

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Flabbergaster Bakes project
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables:

| Variable Name | Value | Example |
|---------------|-------|---------|
| `EMAIL_USER` | Your Gmail address | `mybakery@gmail.com` |
| `EMAIL_PASSWORD` | Your 16-char App Password | `abcdefghijklmnop` |
| `ADMIN_EMAIL` | Email to receive orders | `mybakery@gmail.com` |

**Important:** 
- Select **Production** environment ✅
- Click **Save** for each variable

### 5. Deploy to Vercel

Push your changes:

```bash
git add .
git commit -m "Add Nodemailer email notifications"
git push
```

Vercel will automatically redeploy with email notifications!

## Testing the Email Notifications

### Test Locally

1. Make sure `.env.local` has your Gmail credentials
2. Run: `pnpm dev`
3. Make a test order and complete payment
4. Check your Gmail inbox for the order notification

### Test in Production

1. Wait for Vercel deployment to complete
2. Go to your live site
3. Place a test order with real PayU payment
4. Check your Gmail inbox (usually arrives in seconds)

## Email Template Preview

The email you receive includes:

- **Header:** Flabbergaster Bakes branding with cupcake emoji 🎂
- **Order Details:**
  - Order ID (transaction ID from PayU)
  - Payment Status (PAID)
  - Payment Method
- **Customer Information:**
  - Name, Email, Phone, Address
- **Order Items Table:**
  - Product names, quantities, prices, subtotals
  - Total amount
- **Action Required:** Reminder to prepare order

## Troubleshooting

### Not Receiving Emails?

1. **Check Spam Folder:** Gmail sometimes filters automated emails
2. **Verify App Password:** Make sure it's the 16-char password (no spaces)
3. **Check Email Address:** Verify `EMAIL_USER` and `ADMIN_EMAIL` are correct
4. **View Vercel Logs:**
   - Vercel Dashboard → Your Project → Functions
   - Check logs for `/api/payu/success`
   - Look for "Order confirmation email sent" or errors

### "Invalid login" or "Authentication failed"

- ✅ Make sure 2FA is enabled on your Gmail
- ✅ Use App Password (not your regular Gmail password)
- ✅ Remove any spaces from the 16-character password
- ✅ Make sure `EMAIL_USER` is your complete Gmail address

### Gmail Blocking Your App

If Gmail suspects automated usage, they may temporarily block:
- **Solution 1:** Use a dedicated Gmail account just for your bakery
- **Solution 2:** Allow "Less secure app access" (not recommended)
- **Solution 3:** Consider switching to Resend later for production

### Emails Going to Spam?

Gmail sometimes marks emails sent to yourself as spam:
- Check your spam folder regularly
- Mark these emails as "Not Spam"
- Create a filter: Settings → Filters → Create new filter
- From: your-email@gmail.com → Never send to spam

### Rate Limits

Gmail has sending limits:
- **Free Account:** 500 emails/day
- **Workspace Account:** 2,000 emails/day
- If you exceed, Gmail blocks for 24 hours

For a bakery, 500 orders/day is more than enough! 🎂

## Security Best Practices

✅ **Never commit `.env.local` to git** (it's in `.gitignore`)  
✅ **Use App Passwords, not regular password**  
✅ **Store credentials only in Vercel environment variables**  
✅ **Use a dedicated Gmail account for business**  
✅ **Enable 2FA on your Gmail account**  

## Alternative: Upgrading to Resend Later

If you face Gmail rate limits or reliability issues, you can easily switch to Resend:

1. Replace `nodemailer` with `resend` package
2. Update environment variables to use Resend API
3. Modify `lib/email.ts` to use Resend API
4. Deploy

Resend is more reliable for production but requires signup. Nodemailer with Gmail is perfect for starting out!

## Monitoring

- **Check Gmail Sent folder** to see all order confirmation emails
- **View Vercel Function Logs** to monitor email sending status
- **Set up Gmail filters** to organize order emails into a folder

## Summary

✅ Nodemailer configured with Gmail  
✅ Order notifications sent automatically  
✅ Beautiful HTML email template  
✅ Non-blocking (payment flow not affected)  
✅ Free to use with your Gmail account  

Your bakery is ready to receive order notifications! 🎂📧

