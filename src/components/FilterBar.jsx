import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { categories } from '../data/categories';

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  dietaryFilter,
  setDietaryFilter,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  totalResults,
}) => {
  const isAnyFilterActive =
    searchQuery ||
    selectedCategory !== 'all' ||
    dietaryFilter !== 'all' ||
    priceRange !== 'all' ||
    sortBy !== 'recommended';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDietaryFilter('all');
    setPriceRange('all');
    setSortBy('recommended');
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm space-y-4">
      {/* Top row: Search input + Results counter + Clear button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dish name, restaurant or ingredients..."
            className="w-full pl-10 pr-10 py-2.5 bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-stone-800 placeholder-stone-400 text-sm rounded-2xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3">
          <span className="text-xs font-semibold text-stone-500">
            Showing <strong className="text-stone-900">{totalResults}</strong> items
          </span>

          {isAnyFilterActive && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Middle row: Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px] mr-1 hidden sm:inline">
          Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <span className="mr-1">{cat.emoji}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Bottom row: Dietary, Price, and Sorting */}
      <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Dietary toggles */}
        <div className="flex items-center gap-1.5">
          <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px] mr-1">
            Diet:
          </span>
          <button
            onClick={() => setDietaryFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              dietaryFilter === 'all'
                ? 'bg-stone-800 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setDietaryFilter('veg')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1 ${
              dietaryFilter === 'veg'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            Pure Veg
          </button>
          <button
            onClick={() => setDietaryFilter('non-veg')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1 ${
              dietaryFilter === 'non-veg'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            Non-Veg
          </button>
        </div>

        {/* Price & Sort Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Price Range */}
          <div className="flex items-center gap-1.5">
            <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
              Price:
            </span>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl px-2.5 py-1.5 border-none outline-none cursor-pointer text-xs"
            >
              <option value="all">All Prices</option>
              <option value="under-10">Under $10</option>
              <option value="10-15">$10 - $15</option>
              <option value="15-plus">$15 & Above</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl px-2.5 py-1.5 border-none outline-none cursor-pointer text-xs"
            >
              <option value="recommended">Sort: Popularity</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="prep-time">Fastest Delivery</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
