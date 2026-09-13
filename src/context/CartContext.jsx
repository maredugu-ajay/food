import React, { createContext, useContext, useState, useEffect } from 'react';
import { promoCodes } from '../data/promoCodes';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('foodie_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState(() => {
    try {
      const saved = localStorage.getItem('foodie_promo');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('foodie_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem('foodie_promo', JSON.stringify(appliedPromo));
    } else {
      localStorage.removeItem('foodie_promo');
    }
  }, [appliedPromo]);

  // Toast system
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (item, quantity = 1, specialNotes = '') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          specialNotes: specialNotes || updated[existingIndex].specialNotes,
        };
        return updated;
      } else {
        return [...prev, { ...item, quantity, specialNotes }];
      }
    });
    showToast(`Added "${item.name}" to cart! 🛒`, 'success');
  };

  const removeFromCart = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    if (item) {
      showToast(`Removed "${item.name}" from cart`, 'info');
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
    showToast('Cart has been cleared', 'info');
  };

  // Promo code validation and calculation
  const applyPromo = (codeStr) => {
    const code = (codeStr || '').trim().toUpperCase();
    if (!code) {
      showToast('Please enter a coupon code', 'error');
      return { success: false, message: 'Please enter a coupon code' };
    }

    const promo = promoCodes.find((p) => p.code === code);
    if (!promo) {
      showToast('Invalid coupon code. Try TASTY50 or FREEDEL!', 'error');
      return { success: false, message: 'Invalid promo code' };
    }

    if (subtotal < promo.minOrder) {
      const diff = (promo.minOrder - subtotal).toFixed(2);
      showToast(`Add $${diff} more to apply code "${promo.code}"`, 'warning');
      return {
        success: false,
        message: `Min order of $${promo.minOrder} required. Add $${diff} more.`,
      };
    }

    setAppliedPromo(promo);
    showToast(`Promo "${promo.code}" applied successfully! 🎉`, 'success');
    return { success: true, message: 'Promo applied!' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  // Financial calculations
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Delivery fee logic: standard $2.99, free if subtotal >= $35 or promo is FREEDEL
  let rawDeliveryFee = subtotal > 0 ? 2.99 : 0;
  if (subtotal >= 35 || (appliedPromo && appliedPromo.freeDelivery)) {
    rawDeliveryFee = 0;
  }
  const deliveryFee = rawDeliveryFee;

  // Platform and tax fees: 5% of subtotal
  const taxesAndFees = subtotal > 0 ? +(subtotal * 0.05).toFixed(2) : 0;

  // Discount calculation
  let discountAmount = 0;
  if (appliedPromo && subtotal >= (appliedPromo.minOrder || 0)) {
    if (appliedPromo.discountPercent) {
      const calc = (subtotal * appliedPromo.discountPercent) / 100;
      discountAmount = appliedPromo.maxDiscount ? Math.min(calc, appliedPromo.maxDiscount) : calc;
    } else if (appliedPromo.flatDiscount) {
      discountAmount = appliedPromo.flatDiscount;
    }
  }
  discountAmount = +discountAmount.toFixed(2);

  // Grand total
  const grandTotal = Math.max(0, +(subtotal + deliveryFee + taxesAndFees - discountAmount).toFixed(2));

  // Check if promo still valid whenever subtotal changes
  useEffect(() => {
    if (appliedPromo && subtotal < appliedPromo.minOrder) {
      setAppliedPromo(null);
      showToast(`Cart subtotal dropped below min order for promo "${appliedPromo.code}"`, 'warning');
    }
  }, [subtotal, appliedPromo]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount,
        subtotal,
        deliveryFee,
        taxesAndFees,
        discountAmount,
        grandTotal,
        appliedPromo,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromo,
        removePromo,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
