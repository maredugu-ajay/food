import React from 'react';
import { useCart } from '../context/CartContext';
import { Star, Flame, Clock, Plus, Minus, Info } from 'lucide-react';

export const FoodCard = ({ item, onSelectFood }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartEntry = cartItems.find((i) => i.id === item.id);
  const inCartQty = cartEntry ? cartEntry.quantity : 0;

  return (
    <div className="group bg-white rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelectFood(item)}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-1.5 rounded-lg shadow-sm">
          <div
            className={`w-3.5 h-3.5 border flex items-center justify-center ${
              item.isVeg ? 'border-emerald-600' : 'border-red-600'
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
              }`}
            ></div>
          </div>
        </div>

        {/* Badges Top Right */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {item.isBestseller && (
            <span className="bg-brand-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
              ★ Bestseller
            </span>
          )}
          {item.isSpicy && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5 fill-current" /> Spicy
            </span>
          )}
        </div>

        {/* Rating and prep time pill at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <div className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-sm px-2 py-0.5 rounded-lg">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{item.rating}</span>
            <span className="text-[10px] text-stone-300">({item.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[11px]">
            <Clock className="w-3 h-3 text-stone-300" />
            <span>{item.prepTime}</span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Restaurant & Calories */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 font-medium mb-1">
            <span className="truncate max-w-[65%] text-stone-500 font-semibold">{item.restaurantName}</span>
            <span>{item.calories} kcal</span>
          </div>

          {/* Dish Name */}
          <h3 
            onClick={() => onSelectFood(item)}
            className="text-base font-extrabold text-stone-900 hover:text-brand-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {item.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Footer: Price & Add to Cart Controls */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 font-medium">Price</span>
            <div className="text-lg font-black text-stone-900">
              ${item.price.toFixed(2)}
            </div>
          </div>

          {/* Cart Quantity Control or Add Button */}
          {inCartQty > 0 ? (
            <div className="flex items-center bg-orange-50 border border-brand-300 rounded-2xl p-1 shadow-sm">
              <button
                onClick={() => updateQuantity(item.id, inCartQty - 1)}
                className="w-8 h-8 rounded-xl bg-white hover:bg-orange-100 text-brand-700 flex items-center justify-center font-black transition-colors shadow-xs"
                title="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-black text-brand-900">
                {inCartQty}
              </span>
              <button
                onClick={() => updateQuantity(item.id, inCartQty + 1)}
                className="w-8 h-8 rounded-xl bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center font-black transition-colors shadow-xs"
                title="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(item)}
              className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-brand-600 text-white font-bold text-xs rounded-2xl shadow-sm transition-all duration-200 transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
