import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Percent, 
  Check, 
  AlertCircle,
  Bike
} from 'lucide-react';

export const CartDrawer = ({ onProceedToCheckout, onStartShopping }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    taxesAndFees,
    discountAmount,
    grandTotal,
    appliedPromo,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const res = applyPromo(promoInput);
    if (res.success) {
      setPromoInput('');
    } else {
      setPromoError(res.message);
    }
  };

  const freeDeliveryThreshold = 35;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 shadow-2xl flex flex-col justify-between transform transition-transform animate-slideLeft">
          {/* Drawer Header */}
          <div className="p-5 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-brand-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-stone-900">Your Cart</h2>
                <p className="text-xs text-stone-400 font-medium">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-stone-400 hover:text-red-500 px-2 py-1 transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Delivery Threshold Bar */}
          {cartItems.length > 0 && (
            <div className="bg-amber-50 border-b border-amber-100 px-5 py-3 text-xs">
              <div className="flex items-center justify-between font-bold text-amber-900 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Bike className="w-4 h-4 text-amber-600" />
                  <span>
                    {remainingForFreeDelivery === 0
                      ? '🎉 You unlocked Free Delivery!'
                      : `Add $${remainingForFreeDelivery.toFixed(2)} more for FREE Delivery!`}
                  </span>
                </div>
                <span>{Math.round(freeDeliveryProgress)}%</span>
              </div>
              <div className="w-full h-2 bg-amber-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-brand-500 rounded-full transition-all duration-500"
                  style={{ width: `${freeDeliveryProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-24 h-24 rounded-full bg-orange-100/60 flex items-center justify-center text-4xl shadow-inner">
                  🍽️
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-900">Your cart is empty</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Good food is waiting for you! Explore top restaurants and mouthwatering dishes now.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    if (onStartShopping) onStartShopping();
                  }}
                  className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all"
                >
                  Browse Menu Now
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center gap-3.5"
                >
                  {/* Item Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-stone-100 flex-shrink-0"
                  />

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 font-medium">
                      ${item.price.toFixed(2)} each
                    </p>
                    {item.specialNotes && (
                      <p className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-1 truncate">
                        Note: {item.specialNotes}
                      </p>
                    )}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 bg-stone-100 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white text-stone-700 hover:bg-stone-200 flex items-center justify-center font-bold text-xs shadow-xs"
                      title="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-black text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-stone-900 text-white hover:bg-stone-800 flex items-center justify-center font-bold text-xs shadow-xs"
                      title="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Subtotal per item & Delete */}
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="text-xs font-black text-stone-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-300 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer: Promo & Calculations */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200 space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-extrabold text-emerald-800">
                          {appliedPromo.code}
                        </span>
                        <span className="text-stone-500 ml-1.5">
                          (-${discountAmount.toFixed(2)})
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs text-red-500 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                          placeholder="Promo code (e.g. TASTY50)"
                          className="w-full pl-8 pr-3 py-2 bg-stone-100 rounded-xl border border-stone-200 text-xs uppercase font-bold text-stone-800 outline-none focus:border-brand-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" /> {promoError}
                      </p>
                    )}
                  </form>
                )}
              </div>

              {/* Bill Details */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-stone-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-extrabold uppercase text-[11px]">
                        FREE
                      </span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes & Packaging (5%)</span>
                  <span className="font-semibold text-stone-900">
                    ${taxesAndFees.toFixed(2)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount Savings</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm">
                  <span className="font-black text-stone-900">To Pay</span>
                  <span className="text-xl font-black text-brand-600">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-between px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 hover:from-brand-700 hover:to-orange-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 transition-all transform active:scale-98"
              >
                <span>Checkout</span>
                <span className="flex items-center gap-1">
                  ${grandTotal.toFixed(2)} <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
