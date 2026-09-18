import { useState, useEffect } from 'react';
import { UtensilsCrossed, ShoppingBag, Clock, MapPin, Phone, Menu, X, Sparkles, ChefHat } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { checkRestaurantStatus, formatCurrency } from '../utils/orderUtils';

interface HeaderProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onSelectCategory: (cat: any) => void;
}

export default function Header({
  cartItemCount,
  cartTotal,
  onOpenCart,
  onSelectCategory,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState(checkRestaurantStatus());

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(checkRestaurantStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (sectionId: string, category?: string) => {
    setMobileMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 text-stone-100 backdrop-blur-md border-b border-stone-800 shadow-md">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-stone-50 py-1.5 px-4 text-xs font-medium text-center flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {RESTAURANT_INFO.openingHours}
        </span>
        <span className="hidden md:inline">•</span>
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          {RESTAURANT_INFO.city}
        </span>
        <span className="hidden md:inline">•</span>
        <span className="flex items-center gap-1.5 font-semibold text-amber-100">
          <Sparkles className="w-3.5 h-3.5" />
          Sábado: Feijoada Gourmet Completa
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Chef subtitle */}
          <a 
            href="#hero" 
            className="flex items-center gap-3.5 group cursor-pointer"
            id="brand-header-link"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-900/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-brand text-2xl font-bold tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors">
                  REQUINTE
                </span>
                <span className="text-xl font-light tracking-wide text-stone-200">
                  MARMITEX
                </span>
              </div>
              <p className="text-[11px] font-medium text-stone-400 tracking-wide flex items-center gap-1">
                <span>Por</span>
                <span className="text-amber-200 font-semibold">{RESTAURANT_INFO.chef}</span>
                <span className="text-stone-500">•</span>
                <span>Marmitas Gourmet</span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('cardapio')}
              className="text-stone-300 hover:text-amber-400 text-sm font-medium transition-colors cursor-pointer"
              id="nav-cardapio"
            >
              Cardápio Digital
            </button>
            <button
              onClick={() => handleNavClick('tamanhos')}
              className="text-stone-300 hover:text-amber-400 text-sm font-medium transition-colors cursor-pointer"
              id="nav-tamanhos"
            >
              Tamanhos P, M e G
            </button>
            <button
              onClick={() => handleNavClick('feijoada')}
              className="text-amber-400 hover:text-amber-300 text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              id="nav-feijoada"
            >
              <Sparkles className="w-4 h-4" />
              Feijoada de Sábado
            </button>
            <button
              onClick={() => handleNavClick('chefe')}
              className="text-stone-300 hover:text-amber-400 text-sm font-medium transition-colors cursor-pointer"
              id="nav-chefe"
            >
              Chefe Ágatha Urbano
            </button>
            <button
              onClick={() => handleNavClick('entrega-agendada')}
              className="text-stone-300 hover:text-amber-400 text-sm font-medium transition-colors cursor-pointer"
              id="nav-entrega"
            >
              Entrega Agendada
            </button>
          </nav>

          {/* Action Area: Live status pill + Cart button */}
          <div className="flex items-center gap-3">
            {/* Live Operational Status badge */}
            <div 
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
                status.isOpen 
                  ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300' 
                  : 'bg-stone-800/80 border-stone-700 text-amber-300'
              }`}
              title={status.nextScheduleAdvice}
            >
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{status.isOpen ? 'Aberto Agora (11h-15h)' : 'Agendamento Ativo'}</span>
            </div>

            {/* Cart trigger button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-md hover:shadow-amber-500/20 transition-all duration-200 cursor-pointer active:scale-95"
              id="btn-header-cart"
              aria-label="Abrir Sacola de Pedidos"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-stone-950" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-stone-950 text-amber-400 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-amber-400 shadow-sm animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartItemCount === 0 ? 'Minha Sacola' : formatCurrency(cartTotal)}
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Abrir Menu"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-5 space-y-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-800/80 text-xs text-stone-300">
            <span className={`w-2.5 h-2.5 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>{status.message}</span>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            <button
              onClick={() => handleNavClick('cardapio')}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium text-stone-200 hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              Cardápio Digital Interativo
            </button>
            <button
              onClick={() => handleNavClick('tamanhos')}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium text-stone-200 hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              <span className="font-bold text-amber-400 text-xs px-1.5 py-0.5 border border-amber-400/40 rounded">P • M • G</span>
              Guia de Tamanhos
            </button>
            <button
              onClick={() => handleNavClick('feijoada')}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold text-amber-300 bg-amber-950/40 border border-amber-500/30"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Feijoada Gourmet de Sábado
            </button>
            <button
              onClick={() => handleNavClick('chefe')}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium text-stone-200 hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              <ChefHat className="w-4 h-4 text-amber-400" />
              A Chefe Ágatha Urbano
            </button>
            <button
              onClick={() => handleNavClick('entrega-agendada')}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium text-stone-200 hover:bg-stone-800 hover:text-amber-400 transition-colors"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              Entrega Agendada em Itaquaquecetuba
            </button>
          </div>

          <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 px-1">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp: {RESTAURANT_INFO.formattedPhone}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
