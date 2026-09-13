import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { OrderProvider, useOrder } from './context/OrderContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { ToastContainer } from './components/Toast';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSummaryModal } from './components/OrderSummaryModal';
import { FoodDetailModal } from './components/FoodDetailModal';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { Footer } from './components/Footer';

// Views
import { HomeView } from './views/HomeView';
import { RestaurantsView } from './views/RestaurantsView';
import { MenuView } from './views/MenuView';
import { DealsView } from './views/DealsView';
import { OrderHistoryView } from './views/OrderHistoryView';

function FoodDeliveryApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals state
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { isOrderModalOpen, setIsOrderModalOpen } = useOrder();

  const handleNavigateTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setActiveTab('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-brand-500 selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigateTab={handleNavigateTab}
            onSelectCategory={handleCategorySelect}
            onSelectRestaurant={(rest) => setSelectedRestaurant(rest)}
            onSelectFood={(food) => setSelectedFood(food)}
          />
        )}

        {activeTab === 'restaurants' && (
          <RestaurantsView
            onSelectRestaurant={(rest) => setSelectedRestaurant(rest)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activeTab === 'menu' && (
          <MenuView
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectFood={(food) => setSelectedFood(food)}
          />
        )}

        {activeTab === 'deals' && (
          <DealsView
            onNavigateTab={handleNavigateTab}
          />
        )}

        {activeTab === 'orders' && (
          <OrderHistoryView
            onNavigateTab={handleNavigateTab}
          />
        )}
      </main>

      {/* Cart Sliding Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onStartShopping={() => handleNavigateTab('menu')}
      />

      {/* Checkout Form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Order Confirmation & Tracking Modal */}
      <OrderSummaryModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onViewHistory={() => {
          setIsOrderModalOpen(false);
          handleNavigateTab('orders');
        }}
      />

      {/* Food Item Detail Modal */}
      <FoodDetailModal
        food={selectedFood}
        onClose={() => setSelectedFood(null)}
      />

      {/* Restaurant Detail Modal */}
      <RestaurantDetailModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onSelectFood={(food) => setSelectedFood(food)}
      />

      {/* Sticky Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
      />

      {/* Footer */}
      <Footer
        onNavigateCategory={handleCategorySelect}
        onNavigateTab={handleNavigateTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <FoodDeliveryApp />
      </OrderProvider>
    </CartProvider>
  );
}
