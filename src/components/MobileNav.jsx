import React from 'react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { Compass, UtensilsCrossed, BookOpen, Clock, ShoppingBag } from 'lucide-react';

export const MobileNav = ({ activeTab, setActiveTab }) => {
  const { totalCount, setIsCartOpen } = useCart();
  const { orders } = useOrder();

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'restaurants', label: 'Places', icon: UtensilsCrossed },
    { id: 'menu', label: 'Menu', icon: BookOpen },
    { id: 'orders', label: 'Orders', icon: Clock, badge: orders.length > 0 ? orders.length : null },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-brand-500 font-bold' : 'text-stone-500 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-brand-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-0.5"></span>
              )}
            </button>
          );
        })}

        {/* Cart Quick Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl text-stone-700 hover:text-brand-600 transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2 text-stone-800" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-brand-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce-subtle">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1 font-semibold text-stone-800">Cart</span>
        </button>
      </div>
    </div>
  );
};
