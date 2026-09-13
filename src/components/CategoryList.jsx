import React from 'react';
import { categories } from '../data/categories';

export const CategoryList = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            Popular Categories
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            What are you in the mood for today?
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-200 group ${
                isSelected
                  ? 'bg-gradient-to-r from-brand-500 to-orange-500 text-white border-transparent shadow-md shadow-orange-500/25 scale-[1.02]'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-brand-300 hover:bg-orange-50/40 shadow-sm'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center text-lg ${
                  isSelected ? 'bg-white/20' : 'bg-stone-100 group-hover:bg-orange-100/60'
                }`}
              >
                {cat.iconImage ? (
                  <img
                    src={cat.iconImage}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{cat.emoji}</span>
                )}
              </div>
              <div className="text-left">
                <span className="text-sm font-bold block whitespace-nowrap">
                  {cat.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
