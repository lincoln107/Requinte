import { useState, useEffect } from 'react';
import { MenuItem, MenuCategory, MarmitaSize, CartItem } from './types';
import { MENU_ITEMS, RESTAURANT_INFO } from './data/menuData';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SizesGuide from './components/SizesGuide';
import SaturdayFeijoadaSection from './components/SaturdayFeijoadaSection';
import DigitalMenu from './components/DigitalMenu';
import MarmitaCustomizerModal from './components/MarmitaCustomizerModal';
import ChefSection from './components/ChefSection';
import ScheduleDeliveryGuide from './components/ScheduleDeliveryGuide';
import ReviewsSection from './components/ReviewsSection';
import LocationAndContact from './components/LocationAndContact';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { ShoppingBag, ArrowUp, Sparkles } from 'lucide-react';
import { formatCurrency } from './utils/orderUtils';

const STORAGE_KEY = 'requinte_marmitex_cart_v1';

export default function App() {
  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('todos');
  const [preferredSize, setPreferredSize] = useState<MarmitaSize>('M');

  // Customizer modal state
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Quick toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleOpenCustomizer = (item: MenuItem, defaultSize: MarmitaSize = 'M') => {
    setCustomizerItem(item);
    setPreferredSize(defaultSize);
    setIsCustomizerOpen(true);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // Check if identical item configuration already exists
      const existingIndex = prev.findIndex(
        (it) =>
          it.menuItemId === newItem.menuItemId &&
          it.size === newItem.size &&
          it.selectedBase === newItem.selectedBase &&
          it.selectedFeijao === newItem.selectedFeijao &&
          JSON.stringify(it.selectedComplements) === JSON.stringify(newItem.selectedComplements) &&
          it.selectedSalad === newItem.selectedSalad &&
          it.notes === newItem.notes
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });

    showToast(`${newItem.name} adicionado à sacola!`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => (it.cartItemId === cartItemId ? { ...it, quantity: newQuantity } : it))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectSizeFromGuide = (size: MarmitaSize) => {
    setPreferredSize(size);
    const cardapioElem = document.getElementById('cardapio');
    if (cardapioElem) {
      cardapioElem.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Filtrando para o tamanho ${size}! Escolha seu prato.`);
  };

  const scrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const feijoadaItem = MENU_ITEMS.find((i) => i.isFeijoada) || MENU_ITEMS[0];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Header with Navigation & Live Cart */}
      <Header
        cartItemCount={totalCartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Landing Page Content */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <HeroSection
          onExploreMenu={() => scrollToSection('cardapio')}
          onOpenFeijoada={() => scrollToSection('feijoada')}
        />

        {/* Sizes Guide Section (P, M, G) */}
        <SizesGuide onSelectSizeForMenu={handleSelectSizeFromGuide} />

        {/* Saturday Feijoada Special Section */}
        <SaturdayFeijoadaSection
          feijoadaItem={feijoadaItem}
          onOpenCustomizer={(item) => handleOpenCustomizer(item, 'M')}
        />

        {/* Interactive Digital Menu */}
        <DigitalMenu
          onSelectItem={(item, size) => handleOpenCustomizer(item, size || preferredSize)}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          preferredSize={preferredSize}
        />

        {/* Chef Ágatha Urbano Section */}
        <ChefSection />

        {/* Scheduled Delivery & Itaquaquecetuba Simulator */}
        <ScheduleDeliveryGuide
          onOpenCartWithSchedule={() => setIsCartOpen(true)}
        />

        {/* Reviews Section */}
        <ReviewsSection />

        {/* Location, Hours & FAQ */}
        <LocationAndContact />

      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Marmita Customizer Modal */}
      <MarmitaCustomizerModal
        item={customizerItem}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddToCart={handleAddToCart}
        initialSize={preferredSize}
      />

      {/* Cart & WhatsApp Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Bottom Bar on Mobile / Desktop when Cart has items */}
      {totalCartCount > 0 && !isCartOpen && (
        <aside 
          aria-label="Resumo da Sacola"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 animate-in slide-in-from-bottom-4 duration-300"
        >
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-extrabold text-sm shadow-2xl shadow-amber-950 flex items-center justify-between sm:gap-6 border border-amber-300 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            id="floating-cart-btn"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-stone-950" />
                <span className="absolute -top-2 -right-2 bg-stone-950 text-amber-300 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                  {totalCartCount}
                </span>
              </div>
              <span>Ver Minha Sacola</span>
            </div>
            <span className="text-base font-black bg-stone-950/10 px-2 py-0.5 rounded-lg">
              {formatCurrency(cartSubtotal)}
            </span>
          </button>
        </aside>
      )}

      {/* Scroll to Top button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 left-6 z-30 p-3 rounded-full bg-stone-900/90 text-stone-300 hover:text-amber-400 hover:bg-stone-800 border border-stone-800 shadow-xl transition-all hidden md:flex items-center justify-center"
          aria-label="Voltar ao topo"
          id="btn-scroll-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-stone-900 border border-amber-400/80 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-2 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
