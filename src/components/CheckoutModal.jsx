import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  CreditCard, 
  Banknote, 
  QrCode, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight,
  Receipt,
  FileText
} from 'lucide-react';

export const CheckoutModal = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    subtotal, 
    deliveryFee, 
    taxesAndFees, 
    discountAmount, 
    grandTotal, 
    clearCart,
    appliedPromo 
  } = useCart();

  const { createOrder } = useOrder();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Metro City',
    postalCode: '',
    instructions: '',
    paymentMethod: 'cod', // 'cod' | 'card' | 'upi'
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (minimum 2 characters)';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim() || formData.address.trim().length < 6) {
      errs.address = 'Please enter your complete street address';
    }

    if (formData.paymentMethod === 'card') {
      const cardDigits = formData.cardNumber.replace(/\s/g, '');
      if (cardDigits.length < 16) {
        errs.cardNumber = 'Valid 16-digit card number is required';
      }
      if (!formData.cardExpiry.trim()) {
        errs.cardExpiry = 'MM/YY required';
      }
      if (formData.cardCvv.length < 3) {
        errs.cardCvv = 'CVV required';
      }
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.trim() || !formData.upiId.includes('@')) {
        errs.upiId = 'Please provide a valid UPI ID (e.g. user@okhdfcbank)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Create new order
      createOrder({
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: `${formData.address}, ${formData.city} ${formData.postalCode}`,
          instructions: formData.instructions,
        },
        paymentMethod: formData.paymentMethod,
        items: [...cartItems],
        pricing: {
          subtotal,
          deliveryFee,
          taxesAndFees,
          discountAmount,
          grandTotal,
          promoCode: appliedPromo?.code || null,
        },
      });

      clearCart();
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-stone-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-white border-b border-stone-200 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-brand-600 font-black">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900">Food Ordering & Delivery Details</h2>
              <p className="text-xs text-stone-400">Complete your information to place order</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
          {/* Section 1: Customer Info */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-brand-500" />
              1. Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Alex Johnson"
                  className={`w-full text-xs p-3 rounded-xl border bg-stone-50 focus:bg-white outline-none transition-all ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-stone-200 focus:border-brand-500'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full pl-9 pr-3 py-3 text-xs rounded-xl border bg-stone-50 focus:bg-white outline-none transition-all ${
                      errors.phone ? 'border-red-500 bg-red-50/20' : 'border-stone-200 focus:border-brand-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email Address (for Receipt & Tracking) *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className={`w-full pl-9 pr-3 py-3 text-xs rounded-xl border bg-stone-50 focus:bg-white outline-none transition-all ${
                      errors.email ? 'border-red-500 bg-red-50/20' : 'border-stone-200 focus:border-brand-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="pt-2 border-t border-stone-100">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-500" />
              2. Delivery Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Street Address & Flat / Suite *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Apartment 4B, 742 Evergreen Terrace"
                  className={`w-full text-xs p-3 rounded-xl border bg-stone-50 focus:bg-white outline-none transition-all ${
                    errors.address ? 'border-red-500 bg-red-50/20' : 'border-stone-200 focus:border-brand-500'
                  }`}
                />
                {errors.address && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.address}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="90210"
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Delivery Notes / Gate Code (Optional)
                </label>
                <input
                  type="text"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="e.g. Leave with security, call upon arrival"
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="pt-2 border-t border-stone-100">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-brand-500" />
              3. Payment Method
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Cash on delivery */}
              <label
                className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col items-center text-center gap-2 transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-brand-500 bg-orange-50/60 shadow-sm ring-1 ring-brand-500'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-stone-900 block">
                    Cash on Delivery
                  </span>
                  <span className="text-[10px] text-stone-500">Pay upon delivery</span>
                </div>
              </label>

              {/* Credit/Debit Card */}
              <label
                className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col items-center text-center gap-2 transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-brand-500 bg-orange-50/60 shadow-sm ring-1 ring-brand-500'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-stone-900 block">
                    Debit / Credit Card
                  </span>
                  <span className="text-[10px] text-stone-500">Visa, MC, Amex</span>
                </div>
              </label>

              {/* UPI / Digital Wallet */}
              <label
                className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col items-center text-center gap-2 transition-all ${
                  formData.paymentMethod === 'upi'
                    ? 'border-brand-500 bg-orange-50/60 shadow-sm ring-1 ring-brand-500'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-stone-900 block">
                    UPI / Digital Pay
                  </span>
                  <span className="text-[10px] text-stone-500">Fast simulated pay</span>
                </div>
              </label>
            </div>

            {/* Dynamic fields for Card / UPI */}
            {formData.paymentMethod === 'card' && (
              <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="4532 •••• •••• 8920"
                    maxLength={19}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white outline-none"
                  />
                  {errors.cardNumber && (
                    <p className="text-[10px] text-red-500 mt-1">{errors.cardNumber}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white outline-none"
                    />
                    {errors.cardExpiry && (
                      <p className="text-[10px] text-red-500 mt-1">{errors.cardExpiry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleChange}
                      placeholder="•••"
                      maxLength={4}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white outline-none"
                    />
                    {errors.cardCvv && (
                      <p className="text-[10px] text-red-500 mt-1">{errors.cardCvv}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'upi' && (
              <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Enter UPI ID (Virtual Payment Address)
                </label>
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleChange}
                  placeholder="username@okhdfcbank"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white outline-none"
                />
                {errors.upiId && (
                  <p className="text-[10px] text-red-500 mt-1">{errors.upiId}</p>
                )}
              </div>
            )}
          </div>

          {/* Section 4: Order Items Summary preview */}
          <div className="pt-2 border-t border-stone-100 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <h4 className="text-xs font-extrabold text-stone-900 mb-2 flex items-center justify-between">
              <span>Order Summary ({cartItems.length} items)</span>
              <span className="text-brand-600 font-black">${grandTotal.toFixed(2)}</span>
            </h4>
            <div className="space-y-1 text-xs text-stone-600 max-h-32 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-1 border-b border-stone-200/50">
                  <span className="truncate max-w-[70%]">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-semibold text-stone-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Modal Action Footer */}
        <div className="p-5 bg-white border-t border-stone-200 flex items-center justify-between gap-4 flex-shrink-0">
          <div>
            <span className="text-xs text-stone-400 block font-medium">Final Payable</span>
            <span className="text-2xl font-black text-brand-600">
              ${grandTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-100 transition-colors"
            >
              Back to Cart
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-orange-500 hover:from-brand-700 hover:to-orange-600 text-white font-black text-sm shadow-xl shadow-orange-500/25 transition-all transform active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <span>Confirm Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
