import React from 'react';
import { Flame, Phone, Mail, MapPin, Heart, ArrowUp } from 'lucide-react';

export const Footer = ({ onNavigateCategory, onNavigateTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 lg:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Flame className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Foodie<span className="text-brand-500">Express</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Your favorite neighborhood meals delivered hot, fresh, and fast. Discover top restaurants, gourmet pizzas, smashed burgers, and sweet desserts in minutes.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-500" />
                <span>+1 (800) 366-3431 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-500" />
                <span>orders@foodie-express.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>100 Culinary Blvd, Suite 500, Tech City</span>
              </div>
            </div>
          </div>

          {/* Categories Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">
              Food Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateCategory('pizza')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Woodfire Pizzas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('burgers')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Smashed Burgers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('fast-food')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Fast Food & Tacos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('healthy-meals')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Healthy Power Bowls
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('desserts')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Artisan Bakery & Desserts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateCategory('beverages')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Cold Brews & Smoothies
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateTab('home')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Homepage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('restaurants')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Featured Restaurants
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('menu')}
                  className="hover:text-brand-400 transition-colors"
                >
                  All Food Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('deals')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Promos & Coupons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('orders')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Order History & Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Project Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">
              Operating Hours
            </h4>
            <div className="text-xs text-stone-400 space-y-1.5">
              <p>
                <strong className="text-stone-200">Monday - Friday:</strong><br />
                8:00 AM – 11:30 PM
              </p>
              <p>
                <strong className="text-stone-200">Saturday - Sunday:</strong><br />
                8:00 AM – 12:30 AM
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Kitchens Open for Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>© {new Date().getFullYear()} FoodieExpress Food Delivery System. Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>in React.js & Tailwind CSS</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
