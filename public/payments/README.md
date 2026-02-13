# UPI Payment Setup

## QR Code Image

Please save your UPI QR code image in this folder with the name: **`upi-qr.jpg`**

### Steps:
1. Save the QR code image you provided as `upi-qr.jpg` in this `/public/payments/` folder
2. The image should be in JPG or PNG format
3. Recommended size: 500x500 pixels or larger for better quality

### Update UPI ID:
Don't forget to update your actual UPI ID in the checkout page:
- Open: `app/checkout/page.tsx`
- Find: `pa=yourupiid@upi`
- Replace `yourupiid@upi` with your actual UPI ID (e.g., `yourbusiness@paytm`)

### Test Deep Links:
After updating:
1. Test the Google Pay button on a mobile device
2. Test the PhonePe button on a mobile device
3. Verify the QR code displays correctly

---

**Note:** The UPI deep links follow this format:
```
upi://pay?pa=YOUR_UPI_ID&pn=FlabbergasterBakes&am=AMOUNT&cu=INR
```

Where:
- `pa` = Payee Address (your UPI ID)
- `pn` = Payee Name (business name)
- `am` = Amount (dynamically calculated from cart)
- `cu` = Currency (INR for Indian Rupees)
