import React from 'react';
import { useOrder } from '../context/OrderContext';
import { 
  CheckCircle2, 
  X, 
  MapPin, 
  Phone, 
  Calendar, 
  Clock, 
  Utensils, 
  Bike, 
  CheckCheck, 
  Sparkles,
  ArrowRight,
  Printer
} from 'lucide-react';

export const OrderSummaryModal = ({ isOpen, onClose, onViewHistory }) => {
  const { currentOrder, advanceOrderStatus } = useOrder();

  if (!isOpen || !currentOrder) return null;

  const steps = [
    { step: 1, label: 'Order Confirmed', icon: CheckCircle2, desc: 'Received by kitchen' },
    { step: 2, label: 'Cooking & Packing', icon: Utensils, desc: 'Freshly prepared' },
    { step: 3, label: 'Out for Delivery', icon: Bike, desc: 'Rider is on the way' },
    { step: 4, label: 'Delivered', icon: CheckCheck, desc: 'Enjoy your meal!' },
  ];

  const currentStep = currentOrder.statusStep || 1;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-100 flex flex-col max-h-[92vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 relative overflow-hidden flex-shrink-0">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 fill-emerald-600" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-100">
                Order Placed Successfully!
              </span>
              <h2 className="text-2xl font-black text-white">
                Thank You, {currentOrder.customer.fullName}!
              </h2>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between text-xs text-emerald-50">
            <div>
              <span className="opacity-75">Order ID: </span>
              <strong className="font-mono text-white text-sm tracking-wider">
                #{currentOrder.id}
              </strong>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-200" />
              <span>Est. Delivery: <strong>25 - 35 mins</strong></span>
            </div>
          </div>
        </div>

        {/* Scrollable Order Details */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-800">
          {/* Status Tracker */}
          <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Live Order Tracker
              </span>
              {currentStep < 4 && (
                <button
                  onClick={() => advanceOrderStatus(currentOrder.id)}
                  className="text-xs font-extrabold text-brand-600 hover:text-brand-700 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-xl transition-all flex items-center gap-1 border border-orange-200"
                >
                  <span>Simulate Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {steps.map((s) => {
                const isPassed = currentStep >= s.step;
                const isCurrent = currentStep === s.step;
                const Icon = s.icon;

                return (
                  <div
                    key={s.step}
                    className={`p-3 rounded-2xl border transition-all text-center flex flex-col items-center justify-between ${
                      isCurrent
                        ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                        : isPassed
                        ? 'border-stone-200 bg-white opacity-85'
                        : 'border-dashed border-stone-200 bg-stone-100/60 opacity-40'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${
                        isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-stone-900 leading-tight">
                        {s.label}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer & Delivery Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs space-y-1.5">
              <span className="font-extrabold text-stone-400 uppercase tracking-wider block text-[10px]">
                Delivering To
              </span>
              <p className="font-bold text-stone-900 text-sm">
                {currentOrder.customer.fullName}
              </p>
              <p className="text-stone-600 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span>{currentOrder.customer.address}</span>
              </p>
              <p className="text-stone-500 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>{currentOrder.customer.phone}</span>
              </p>
              {currentOrder.customer.instructions && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 mt-2">
                  <strong>Notes:</strong> {currentOrder.customer.instructions}
                </p>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs space-y-1.5">
              <span className="font-extrabold text-stone-400 uppercase tracking-wider block text-[10px]">
                Payment & Order Info
              </span>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Payment Mode:</span>
                <span className="font-bold text-stone-900 uppercase">
                  {currentOrder.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : currentOrder.paymentMethod === 'card'
                    ? 'Credit / Debit Card'
                    : 'UPI / Digital Wallet'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Order Placed:</span>
                <span className="font-semibold text-stone-800">
                  {new Date(currentOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Promo Applied:</span>
                <span className="font-extrabold text-emerald-600">
                  {currentOrder.pricing.promoCode || 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Itemized Order Details */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              Items Ordered ({currentOrder.items.length})
            </h4>
            <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover bg-stone-100"
                    />
                    <div>
                      <div className="font-bold text-stone-900">{item.name}</div>
                      <div className="text-[11px] text-stone-400">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="font-black text-stone-900 text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="p-4 rounded-2xl bg-stone-100/70 space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-stone-900">
                ${currentOrder.pricing.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-stone-900">
                {currentOrder.pricing.deliveryFee === 0 ? (
                  <span className="text-emerald-600 font-black">FREE</span>
                ) : (
                  `$${currentOrder.pricing.deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Service</span>
              <span className="font-bold text-stone-900">
                ${currentOrder.pricing.taxesAndFees.toFixed(2)}
              </span>
            </div>
            {currentOrder.pricing.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount Applied</span>
                <span>-${currentOrder.pricing.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm">
              <span className="font-black text-stone-900">Total Amount Paid</span>
              <span className="text-xl font-black text-brand-600">
                ${currentOrder.pricing.grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 text-xs font-bold transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                if (onViewHistory) onViewHistory();
              }}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 hover:bg-stone-100 text-xs font-bold transition-colors"
            >
              View in My Orders
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-black transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
