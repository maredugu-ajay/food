import React from 'react';
import { foodItems } from '../data/foodItems';
import { FoodCard } from './FoodCard';
import { X, Star, Clock, Bike, Phone, MapPin, Tag } from 'lucide-react';

export const RestaurantDetailModal = ({ restaurant, onClose, onSelectFood }) => {
  if (!restaurant) return null;

  const restaurantFoods = foodItems.filter((f) => f.restaurantId === restaurant.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-stone-50 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-stone-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with cover image */}
        <div className="relative w-full h-48 sm:h-60 flex-shrink-0 bg-stone-900">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

          <div className="absolute bottom-4 left-4 sm:left-6 right-4 flex items-end justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-white flex-shrink-0">
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black">{restaurant.name}</h2>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      restaurant.isOpen ? 'bg-emerald-500 text-white' : 'bg-stone-600 text-stone-300'
                    }`}
                  >
                    {restaurant.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
                  {restaurant.cuisine.join(' • ')} • {restaurant.priceRange}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl text-stone-900 font-extrabold text-sm shadow-md">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{restaurant.rating}</span>
              <span className="text-xs text-stone-400 font-normal">
                ({restaurant.reviewsCount})
              </span>
            </div>
          </div>
        </div>

        {/* Info Strip */}
        <div className="bg-white border-b border-stone-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span className="truncate">{restaurant.address}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span>{restaurant.phone}</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-stone-800">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-stone-800">
              <Bike className="w-3.5 h-3.5 text-stone-400" />
              <span>
                {restaurant.deliveryFee === 0 ? 'Free Delivery' : `$${restaurant.deliveryFee.toFixed(2)} Fee`}
              </span>
            </div>
          </div>
        </div>

        {/* Body: Restaurant's Menu Items */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold text-stone-900">
              Menu Specialties ({restaurantFoods.length})
            </h3>
            {restaurant.offerText && (
              <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                <Tag className="w-3 h-3" /> {restaurant.offerText}
              </span>
            )}
          </div>

          {restaurantFoods.length === 0 ? (
            <div className="py-12 text-center text-stone-400">
              No items currently listed for this restaurant.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurantFoods.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  onSelectFood={onSelectFood}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
