import React from 'react';
import { Star, Clock, Bike, Tag, MapPin } from 'lucide-react';

export const RestaurantCard = ({ restaurant, onSelectRestaurant }) => {
  return (
    <div
      onClick={() => onSelectRestaurant(restaurant)}
      className="group bg-white rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Banner Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-stone-100">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Status Badge Top Left */}
          <div className="absolute top-3 left-3">
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm flex items-center gap-1 ${
                restaurant.isOpen
                  ? 'bg-emerald-500/90 text-white'
                  : 'bg-stone-900/80 text-stone-300'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  restaurant.isOpen ? 'bg-white animate-pulse-fast' : 'bg-stone-400'
                }`}
              ></span>
              {restaurant.isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>

          {/* Offer text badge Top Right */}
          {restaurant.offerText && (
            <div className="absolute top-3 right-3 bg-brand-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span>{restaurant.offerText}</span>
            </div>
          )}

          {/* Logo badge overlapping image bottom */}
          <div className="absolute -bottom-4 left-4 w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white">
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Rating Badge bottom right of image */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1 text-xs font-black text-stone-900">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{restaurant.rating}</span>
            <span className="text-[10px] text-stone-400 font-medium">
              ({restaurant.reviewsCount})
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="pt-6 p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-extrabold text-stone-900 group-hover:text-brand-600 transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <span className="text-xs font-bold text-stone-400">
              {restaurant.priceRange}
            </span>
          </div>

          {/* Cuisines */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-1">
            {restaurant.cuisine.join(' • ')}
          </p>

          <p className="text-xs text-stone-400 mt-2 line-clamp-2">
            {restaurant.description}
          </p>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="p-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center gap-1.5 font-semibold">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span>{restaurant.deliveryTime}</span>
        </div>

        <div className="flex items-center gap-1.5 font-semibold">
          <Bike className="w-3.5 h-3.5 text-stone-400" />
          <span>
            {restaurant.deliveryFee === 0 ? (
              <strong className="text-emerald-600">Free</strong>
            ) : (
              `$${restaurant.deliveryFee.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="text-[11px] text-stone-400 font-medium">
          Min ${restaurant.minOrder}
        </div>
      </div>
    </div>
  );
};
