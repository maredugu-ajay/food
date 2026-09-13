import React from 'react';
import { promoCodes } from '../data/promoCodes';
import { useCart } from '../context/CartContext';
import { Tag, Copy, Check, Sparkles } from 'lucide-react';

export const PromoBanner = () => {
  const { applyPromo, appliedPromo, showToast } = useCart();
  const [copiedCode, setCopiedCode] = React.useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Code "${code}" copied to clipboard!`, 'info');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-8 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Exclusive Deals & Coupons
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Apply at checkout or tap any voucher to copy code
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-stone-100 text-stone-600 rounded-full w-fit">
            Limited time offers
          </span>
        </div>

        {/* Promo cards horizontal scroller / grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promoCodes.map((promo) => {
            const isApplied = appliedPromo?.code === promo.code;
            const isCopied = copiedCode === promo.code;

            return (
              <div
                key={promo.code}
                className={`relative rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                  isApplied
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-1 ring-emerald-500'
                    : 'border-dashed border-stone-300 bg-gradient-to-br from-stone-50 to-white hover:border-brand-500 hover:shadow-md'
                }`}
              >
                {/* Promo Tag */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                    {promo.tag}
                  </span>
                  {isApplied && (
                    <span className="text-[11px] font-extrabold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Applied
                    </span>
                  )}
                </div>

                {/* Promo Code & Desc */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black tracking-wide text-brand-600">
                      {promo.code}
                    </span>
                    <button
                      onClick={() => handleCopy(promo.code)}
                      title="Copy code"
                      className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-200/60 transition-colors"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                    {promo.description}
                  </p>
                </div>

                {/* Apply Button */}
                <div className="mt-4 pt-3 border-t border-stone-200/70 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-stone-400">
                    Min order: ${promo.minOrder}
                  </span>
                  <button
                    onClick={() => applyPromo(promo.code)}
                    disabled={isApplied}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                      isApplied
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-stone-900 hover:bg-brand-600 text-white'
                    }`}
                  >
                    {isApplied ? 'In Cart' : 'Apply'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
