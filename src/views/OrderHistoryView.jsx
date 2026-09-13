import React from 'react';
import { useOrder } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { 
  Clock, 
  MapPin, 
  RotateCcw, 
  Receipt, 
  ExternalLink, 
  ShoppingBag,
  CheckCircle2,
  Utensils,
  Bike
} from 'lucide-react';

export const OrderHistoryView = ({ onNavigateTab }) => {
  const { orders, setCurrentOrder, setIsOrderModalOpen } = useOrder();
  const { addToCart, setIsCartOpen } = useCart();

  const handleTrackOrder = (order) => {
    setCurrentOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart(item, item.quantity);
    });
    setIsCartOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-600 mb-1">
          <Clock className="w-4 h-4" />
          <span>Activity</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          My Food Orders
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Review past receipts, live status tracking, and 1-click re-ordering
        </p>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <div className="w-20 h-20 rounded-full bg-orange-100 text-brand-500 mx-auto flex items-center justify-center text-3xl">
            📦
          </div>
          <div>
            <h3 className="text-xl font-black text-stone-900">No orders placed yet</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Once you checkout from our partnered restaurants, your order receipt and live tracking will appear here!
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('menu')}
            className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
          >
            Start Ordering Food
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const statusStep = order.statusStep || 1;

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-5 sm:p-6 space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black text-brand-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200/60">
                        #{order.id}
                      </span>
                      <span className="text-xs text-stone-400">
                        {new Date(order.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}{' '}
                        at{' '}
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                        statusStep === 4
                          ? 'bg-stone-100 text-stone-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          statusStep === 4 ? 'bg-stone-500' : 'bg-emerald-500 animate-pulse'
                        }`}
                      ></span>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-600">
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                      Ordered Dishes ({order.items.length})
                    </span>
                    <div className="space-y-1.5">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <span className="truncate max-w-[75%] font-medium text-stone-800">
                            <strong className="text-stone-900 font-bold">{item.quantity}x</strong>{' '}
                            {item.name}
                          </span>
                          <span className="text-stone-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer and Delivery info */}
                  <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-100 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Delivery Address
                    </span>
                    <p className="font-bold text-stone-900">{order.customer.fullName}</p>
                    <p className="text-stone-600 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-500 mt-0.5 flex-shrink-0" />
                      <span>{order.customer.address}</span>
                    </p>
                    <p className="text-stone-500">
                      Payment: <strong className="text-stone-800 uppercase">{order.paymentMethod}</strong>
                    </p>
                  </div>
                </div>

                {/* Total & Action Buttons */}
                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-stone-400 font-medium block">
                      Total Paid
                    </span>
                    <span className="text-xl font-black text-stone-900">
                      ${order.pricing.grandTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReorder(order)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 text-stone-800 hover:bg-stone-100 text-xs font-bold transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder Items</span>
                    </button>

                    <button
                      onClick={() => handleTrackOrder(order)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-brand-600 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Receipt & Live Tracker</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
