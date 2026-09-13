import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, Clock, Flame, Plus, Minus, ShoppingBag, Check } from 'lucide-react';

export const FoodDetailModal = ({ food, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');

  if (!food) return null;

  const handleAddToCart = () => {
    addToCart(food, quantity, specialNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-100 transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-64 sm:h-72 bg-stone-100">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1.5 text-xs font-bold">
              <div
                className={`w-3 h-3 border flex items-center justify-center ${
                  food.isVeg ? 'border-emerald-600' : 'border-red-600'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    food.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                  }`}
                ></div>
              </div>
              <span className={food.isVeg ? 'text-emerald-700' : 'text-red-700'}>
                {food.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              </span>
            </div>

            {food.isBestseller && (
              <span className="bg-brand-500 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-md">
                ★ Bestseller
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
              {food.restaurantName}
            </span>
            <h2 className="text-2xl font-black text-white mt-0.5">{food.name}</h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Quick Metrics */}
          <div className="flex items-center justify-between py-2 px-4 bg-stone-50 rounded-2xl border border-stone-100 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-stone-800">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{food.rating} ({food.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-600 font-medium">
              <Clock className="w-4 h-4 text-stone-400" />
              <span>{food.prepTime}</span>
            </div>
            <div className="flex items-center gap-1 text-stone-600 font-medium">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{food.calories} kcal</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
              Description
            </h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              {food.description}
            </p>
          </div>

          {/* Ingredients */}
          {food.ingredients && food.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                Fresh Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {food.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2.5 py-1 rounded-xl bg-stone-100 text-stone-700 border border-stone-200/60"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Dressing on the side, extra spicy, no onions..."
              className="w-full text-xs p-3 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-brand-500 outline-none transition-all"
            />
          </div>

          {/* Footer Controls: Quantity and Total */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center bg-stone-100 rounded-2xl p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-xl bg-white hover:bg-stone-200 text-stone-800 flex items-center justify-center font-bold transition-colors shadow-xs"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-black text-stone-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center font-bold transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-between px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-orange-500 hover:from-brand-700 hover:to-orange-600 text-white font-extrabold shadow-lg shadow-orange-500/25 transition-all transform active:scale-98"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </span>
              <span className="text-base">
                ${(food.price * quantity).toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
