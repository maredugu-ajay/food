import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Search, 
  Clock, 
  Percent, 
  Compass, 
  BookOpen, 
  Menu as MenuIcon, 
  X,
  PhoneCall,
  Flame
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, searchQuery, setSearchQuery }) => {
  const { totalCount, grandTotal, setIsCartOpen } = useCart();
  const { orders } = useOrder();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { id: 'menu', label: 'Explore Menu', icon: BookOpen },
    { id: 'deals', label: 'Deals & Offers', icon: Percent },
    { 
      id: 'orders', 
      label: 'My Orders', 
      icon: Clock, 
      badge: orders.length > 0 ? orders.length : null 
    },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white fill-white animate-bounce-subtle" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-stone-900 flex items-center">
                Foodie<span className="text-brand-500">Express</span>
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-stone-400 -mt-1 tracking-wider uppercase">
                Fast & Fresh Delivery
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'menu' && activeTab !== 'restaurants') {
                    setActiveTab('menu');
                  }
                }}
                placeholder="Search pizzas, burgers, cafes, cuisines..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-stone-800 placeholder-stone-400 text-sm rounded-full border border-stone-200/80 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs bg-stone-200 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-brand-600 bg-orange-50'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 bg-brand-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Cart & Quick Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white shadow-md shadow-stone-900/10 transition-all transform active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                {totalCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-brand-500 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse-fast">
                    {totalCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-stone-300 leading-tight">My Cart</span>
                <span className="text-xs font-extrabold text-amber-400 leading-tight">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (visible on small screens) */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'menu' && activeTab !== 'restaurants') {
                  setActiveTab('menu');
                }
              }}
              placeholder="Search dishes, restaurants..."
              className="w-full pl-10 pr-4 py-2 bg-stone-100 text-stone-800 placeholder-stone-400 text-sm rounded-full border border-stone-200 focus:border-brand-500 focus:bg-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-1.5 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? 'text-brand-600 bg-orange-50'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 px-2">
            <span>Customer Helpline</span>
            <span className="font-semibold text-stone-700 flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-brand-500" /> 1-800-FOODIE
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
