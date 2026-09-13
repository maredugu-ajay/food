import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { PromoBanner } from '../components/PromoBanner';
import { CategoryList } from '../components/CategoryList';
import { RestaurantCard } from '../components/RestaurantCard';
import { FoodCard } from '../components/FoodCard';
import { restaurants } from '../data/restaurants';
import { foodItems } from '../data/foodItems';
import { ArrowRight, Sparkles, Utensils, Award, ShieldCheck, Zap } from 'lucide-react';

export const HomeView = ({
  onNavigateTab,
  onSelectCategory,
  onSelectRestaurant,
  onSelectFood,
}) => {
  // Top 4 featured restaurants
  const featuredRestaurants = restaurants.slice(0, 4);

  // Top 8 bestsellers or featured food items
  const featuredDishes = foodItems.filter((f) => f.isBestseller).slice(0, 8);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner */}
      <HeroBanner
        onExploreMenu={() => onNavigateTab('menu')}
        onExploreRestaurants={() => onNavigateTab('restaurants')}
      />

      {/* Promos & Coupon Codes Strip */}
      <PromoBanner />

      {/* Categories Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryList
          selectedCategory="all"
          onSelectCategory={(catId) => {
            onSelectCategory(catId);
            onNavigateTab('menu');
          }}
        />
      </section>

      {/* Popular Restaurants Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-600 mb-1">
              <Award className="w-4 h-4" />
              <span>Top Curated Kitchens</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Popular Restaurants Around You
            </h2>
          </div>

          <button
            onClick={() => onNavigateTab('restaurants')}
            className="flex items-center gap-2 text-sm font-extrabold text-brand-600 hover:text-brand-700 transition-colors w-fit group"
          >
            <span>View All ({restaurants.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRestaurants.map((rest) => (
            <RestaurantCard
              key={rest.id}
              restaurant={rest}
              onSelectRestaurant={onSelectRestaurant}
            />
          ))}
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Trending & Bestseller Dishes
            </h2>
          </div>

          <button
            onClick={() => onNavigateTab('menu')}
            className="flex items-center gap-2 text-sm font-extrabold text-brand-600 hover:text-brand-700 transition-colors w-fit group"
          >
            <span>Explore Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredDishes.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onSelectFood={onSelectFood}
            />
          ))}
        </div>
      </section>

      {/* Value Proposition / Why Choose Foodie Express */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-xl mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-400">
              Why Foodie Express
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-2">
              The Best Online Food Ordering Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700/60">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-brand-400 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                Lightning Fast Delivery
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Smart driver routing ensures your food arrives piping hot in 30 minutes or less.
              </p>
            </div>

            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700/60">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                Fresh & Hygienic Prep
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                All partnered kitchens pass rigorous health inspections with tamper-evident packaging.
              </p>
            </div>

            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700/60">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                Best Rate Guarantee
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Get restaurant-direct prices with exclusive promo codes and free delivery deals.
              </p>
            </div>

            <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700/60">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                Live Order Tracking
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Real-time updates from the stove to your doorstep so you always know when food arrives.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
