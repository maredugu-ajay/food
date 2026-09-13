import React, { useState, useMemo } from 'react';
import { restaurants } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { Search, UtensilsCrossed, Star, Clock, Filter, X } from 'lucide-react';

export const RestaurantsView = ({ onSelectRestaurant, searchQuery, setSearchQuery }) => {
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [minRating, setMinRating] = useState('all');
  const [onlyOpen, setOnlyOpen] = useState(false);

  // Extract unique cuisines
  const allCuisines = useMemo(() => {
    const list = new Set();
    restaurants.forEach((r) => r.cuisine.forEach((c) => list.add(c)));
    return ['all', ...Array.from(list)];
  }, []);

  // Filtered restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((rest) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = rest.name.toLowerCase().includes(q);
        const matchesCuisine = rest.cuisine.some((c) => c.toLowerCase().includes(q));
        const matchesAddress = rest.address.toLowerCase().includes(q);
        if (!matchesName && !matchesCuisine && !matchesAddress) return false;
      }

      // Cuisine
      if (selectedCuisine !== 'all') {
        if (!rest.cuisine.includes(selectedCuisine)) return false;
      }

      // Rating
      if (minRating === '4.7') {
        if (rest.rating < 4.7) return false;
      }

      // Open now
      if (onlyOpen && !rest.isOpen) return false;

      return true;
    });
  }, [searchQuery, selectedCuisine, minRating, onlyOpen]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('all');
    setMinRating('all');
    setOnlyOpen(false);
  };

  const isFiltered =
    searchQuery || selectedCuisine !== 'all' || minRating !== 'all' || onlyOpen;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-600 mb-1">
          <UtensilsCrossed className="w-4 h-4" />
          <span>Curated Partners</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Explore Restaurants & Cafes
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Browse handcrafted menus from our highest-rated partner kitchens
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurant by name, cuisine, or street..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-stone-800 placeholder-stone-400 text-sm rounded-2xl border border-stone-200 focus:border-brand-500 outline-none"
            />
          </div>

          {/* Active stats & clear */}
          <div className="flex items-center justify-between md:justify-end gap-3 text-xs font-semibold">
            <span className="text-stone-500">
              <strong className="text-stone-900">{filteredRestaurants.length}</strong> restaurants open
            </span>

            {isFiltered && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors font-bold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Cuisines */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-stone-400 font-bold uppercase text-[10px] mr-1">
              Cuisine:
            </span>
            {allCuisines.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                  selectedCuisine === c
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {c === 'all' ? 'All Cuisines' : c}
              </button>
            ))}
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMinRating(minRating === 'all' ? '4.7' : 'all')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-colors ${
                minRating === '4.7'
                  ? 'bg-amber-500 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>4.7+ Rated</span>
            </button>

            <button
              onClick={() => setOnlyOpen(!onlyOpen)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                onlyOpen
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Open Now Only
            </button>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      {filteredRestaurants.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-brand-600 mx-auto flex items-center justify-center text-2xl">
            🔍
          </div>
          <h3 className="text-lg font-black text-stone-900">No restaurants found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            We couldn't find any restaurants matching your current search or filters. Try adjusting your criteria.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelectRestaurant={onSelectRestaurant}
            />
          ))}
        </div>
      )}
    </div>
  );
};
