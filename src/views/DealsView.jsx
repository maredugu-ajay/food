import React from 'react';
import { promoCodes } from '../data/promoCodes';
import { useCart } from '../context/CartContext';
import { Tag, Sparkles, Copy, Check, ArrowRight, Percent, Gift } from 'lucide-react';

export const DealsView = ({ onNavigateTab }) => {
  const { applyPromo, appliedPromo, showToast, setIsCartOpen } = useCart();
  const [copiedCode, setCopiedCode] = React.useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Code "${code}" copied to clipboard!`, 'info');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApply = (code) => {
    const res = applyPromo(code);
    if (res.success) {
      setIsCartOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-600 mb-1">
          <Percent className="w-4 h-4" />
          <span>Save Big Today</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Foodie Deals, Coupons & Discounts
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Apply any voucher code below to save on your favorite pizzas, burgers, bowls, and treats
        </p>
      </div>

      {/* Hero Discount Card */}
      <div className="bg-gradient-to-r from-orange-600 via-brand-600 to-amber-500 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-xl space-y-3 relative z-10">
          <span className="bg-white/20 text-white text-xs font-black uppercase px-3 py-1 rounded-full backdrop-blur-md">
            Grand Launch Offer
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            50% OFF Your Order
          </h2>
          <p className="text-sm text-orange-100 leading-relaxed">
            Get up to $10 off instantly with voucher code <strong>TASTY50</strong>. Free delivery also available on all gourmet orders above $35!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleApply('TASTY50')}
              className="px-6 py-3 bg-stone-900 hover:bg-black text-white font-extrabold text-xs rounded-xl shadow-lg transition-transform active:scale-95"
            >
              Apply TASTY50 to Cart
            </button>
            <button
              onClick={() => onNavigateTab('menu')}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl backdrop-blur-md transition-colors"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promoCodes.map((promo) => {
          const isApplied = appliedPromo?.code === promo.code;
          const isCopied = copiedCode === promo.code;

          return (
            <div
              key={promo.code}
              className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                isApplied
                  ? 'bg-emerald-50/70 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                  : 'bg-white border-stone-200 hover:border-brand-400 hover:shadow-lg'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-xl bg-orange-100 text-brand-700">
                    {promo.tag}
                  </span>
                  {isApplied && (
                    <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Active in Cart
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-black text-stone-900 tracking-wide font-mono">
                    {promo.code}
                  </span>
                  <button
                    onClick={() => handleCopy(promo.code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                  {promo.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-400 font-medium">
                  Min Spend: <strong>${promo.minOrder}</strong>
                </span>

                <button
                  onClick={() => handleApply(promo.code)}
                  disabled={isApplied}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all ${
                    isApplied
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-stone-900 hover:bg-brand-600 text-white'
                  }`}
                >
                  {isApplied ? 'Applied to Cart' : 'Apply Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
