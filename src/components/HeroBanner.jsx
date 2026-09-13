import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, Star } from 'lucide-react';

export const HeroBanner = ({ onExploreMenu, onExploreRestaurants }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/40 to-white py-12 md:py-16 border-b border-orange-100/60">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute -bottom-10 right-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs sm:text-sm font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-600 fill-orange-500" />
              <span>Free Delivery on your first order with code <strong>FREEDEL</strong></span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12]">
              Super-Fast Food Delivery <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500">
                Straight to Your Table
              </span>
            </h1>

            <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Satisfy your cravings with handcrafted wood-fired pizzas, gourmet smashed burgers, fresh wholesome salads, and sweet artisan treats from your neighborhood’s highest-rated kitchens.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreMenu}
                className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-brand-600 to-orange-500 hover:from-brand-700 hover:to-orange-600 text-white font-bold text-base rounded-2xl shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Order Food Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreRestaurants}
                className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-100 text-stone-800 font-bold text-base rounded-2xl border border-stone-200 shadow-sm transition-all hover:border-stone-300"
              >
                <span>Browse Restaurants</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-stone-200/70 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-stone-900">25-35 Min</div>
                  <div className="text-xs text-stone-500">Speedy Delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-stone-900">Top Rated</div>
                  <div className="text-xs text-stone-500">Curated Kitchens</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-stone-900">100% Safe</div>
                  <div className="text-xs text-stone-500">Hygienic Prep</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Circular Food Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
                  alt="Delicious food feast"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-brand-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Chef's Daily Pick
                  </span>
                  <h3 className="text-xl font-bold mt-1">Woodfire Artisanal Pizza</h3>
                  <p className="text-xs text-stone-200">Fresh buffalo mozzarella & organic basil</p>
                </div>
              </div>

              {/* Floating Review Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3 animate-bounce-subtle">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-black text-sm">
                  ★ 4.9
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">15k+ Happy Customers</div>
                  <div className="text-[11px] text-stone-500 flex items-center gap-1">
                    <span>Verified Reviews</span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  </div>
                </div>
              </div>

              {/* Floating Promo Pill */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-stone-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-stone-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-extrabold text-sm">
                  %
                </div>
                <div>
                  <div className="text-xs font-extrabold text-amber-300">Special Promo Deal</div>
                  <div className="text-[11px] text-stone-300">Use code <strong>TASTY50</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
