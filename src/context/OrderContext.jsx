import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('foodie_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentOrder, setCurrentOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('foodie_orders', JSON.stringify(orders));
  }, [orders]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#eab308', '#10b981', '#3b82f6', '#ec4899'],
      });
    } catch (e) {
      console.log('Confetti not available:', e);
    }
  };

  const createOrder = (orderData) => {
    const orderId = `FD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'Confirmed', // 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered'
      statusStep: 1,
      estimatedDeliveryMinutes: 30,
      ...orderData,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    setIsOrderModalOpen(true);
    triggerConfetti();

    return newOrder;
  };

  // Simulate updating status over time for active order
  const advanceOrderStatus = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nextStep = Math.min(4, (ord.statusStep || 1) + 1);
          const statusMap = {
            1: 'Confirmed',
            2: 'Preparing in Kitchen',
            3: 'Out for Delivery',
            4: 'Delivered',
          };
          const updated = {
            ...ord,
            statusStep: nextStep,
            status: statusMap[nextStep],
          };
          if (currentOrder && currentOrder.id === orderId) {
            setCurrentOrder(updated);
          }
          return updated;
        }
        return ord;
      })
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        setCurrentOrder,
        isOrderModalOpen,
        setIsOrderModalOpen,
        createOrder,
        advanceOrderStatus,
        triggerConfetti,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
