import React, { useState, useMemo } from 'react';
import { foodItems } from '../data/foodItems';
import { FoodCard } from '../components/FoodCard';
import { FilterBar } from '../components/FilterBar';
import { Utensils, BookOpen } from 'lucide-react';

export const MenuView = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onSelectFood,
}) => {
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [priceRange, setPriceRange] = useState('all'); // 'all' | 'under-10' | '10-15' | '15-plus'
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'rating' | 'price-low' | 'price-high' | 'prep-time'

  // Filter and Sort Logic
  const filteredAndSortedFoods = useMemo(() => {
    let result = [...foodItems];

    // 1. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.restaurantName.toLowerCase().includes(q) ||
          (f.ingredients && f.ingredients.some((ing) => ing.toLowerCase().includes(q)))
      );
    }

    // 2. Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((f) => f.category === selectedCategory);
    }

    // 3. Dietary filter
    if (dietaryFilter === 'veg') {
      result = result.filter((f) => f.isVeg);
    } else if (dietaryFilter === 'non-veg') {
      result = result.filter((f) => !f.isVeg);
    }

    // 4. Price range filter
    if (priceRange === 'under-10') {
      result = result.filter((f) => f.price < 10);
    } else if (priceRange === '10-15') {
      result = result.filter((f) => f.price >= 10 && f.price <= 15);
    } else if (priceRange === '15-plus') {
      result = result.filter((f) => f.price > 15);
    }

    // 5. Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'prep-time') {
      result.sort((a, b) => {
        const timeA = parseInt(a.prepTime) || 20;
        const timeB = parseInt(b.prepTime) || 20;
        return timeA - timeB;
      });
    } else {
      // Recommended: Bestsellers first, then rating
      result.sort((a, b) => {
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return b.rating - a.rating;
      });
    }

    return result;
  }, [searchQuery, selectedCategory, dietaryFilter, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-600 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Full Food Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Explore Our Menu
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Discover dishes across pizzas, burgers, fresh bowls, desserts, and beverages
        </p>
      </div>

      {/* Filter and Search Bar Component */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        dietaryFilter={dietaryFilter}
        setDietaryFilter={setDietaryFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={filteredAndSortedFoods.length}
      />

      {/* Food Cards Grid */}
      {filteredAndSortedFoods.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-brand-600 mx-auto flex items-center justify-center text-2xl">
            🍲
          </div>
          <h3 className="text-lg font-black text-stone-900">No food items found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            We couldn't find any dishes matching your selected filters or search query.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setDietaryFilter('all');
              setPriceRange('all');
              setSortBy('recommended');
            }}
            className="px-5 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedFoods.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onSelectFood={onSelectFood}
            />
          ))}
        </div>
      )}
    </div>
  );
};
