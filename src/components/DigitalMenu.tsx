import { useState, useMemo } from 'react';
import { Search, Sparkles, Flame, Heart, Utensils, Coffee, ChevronRight, Plus } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem, MenuCategory, MarmitaSize } from '../types';
import { formatCurrency } from '../utils/orderUtils';

interface DigitalMenuProps {
  onSelectItem: (item: MenuItem, defaultSize?: MarmitaSize) => void;
  selectedCategory: MenuCategory;
  onSelectCategory: (cat: MenuCategory) => void;
  preferredSize?: MarmitaSize;
}

export default function DigitalMenu({
  onSelectItem,
  selectedCategory,
  onSelectCategory,
  preferredSize = 'M'
}: DigitalMenuProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const categories: { id: MenuCategory; label: string; icon: any }[] = [
    { id: 'todos', label: 'Todos os Pratos', icon: Utensils },
    { id: 'especial_sabado', label: 'Especial de Sábado (Feijoada)', icon: Flame },
    { id: 'pratos_dia', label: 'Pratos do Dia', icon: Sparkles },
    { id: 'classicos', label: 'Clássicos Gourmet', icon: Utensils },
    { id: 'gourmet_fit', label: 'Gourmet Fit & Leve', icon: Heart },
    { id: 'bebidas_sobremesas', label: 'Sobremesas & Bebidas', icon: Coffee }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <section id="cardapio" className="py-16 sm:py-24 bg-stone-950 text-stone-100 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Cardápio Digital Interativo
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white">
              Culinária Nobre em Cada Marmita
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              Escolha seu prato, selecione entre os tamanhos <strong className="text-amber-300">P, M ou G</strong> e personalize o arroz, feijão e acompanhamentos da Chefe Ágatha.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar prato, ingrediente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors"
              id="input-menu-search"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-950/40 font-bold'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:border-stone-700'
                }`}
                id={`tab-category-${cat.id}`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-stone-950' : 'text-amber-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/50 rounded-3xl border border-stone-800 p-8">
            <Utensils className="w-12 h-12 text-stone-600 mx-auto mb-3" />
            <p className="text-stone-300 font-medium">Nenhum prato encontrado com esse termo.</p>
            <p className="text-stone-500 text-xs mt-1">Tente buscar por "feijoada", "filé", "frango" ou limpe a busca.</p>
            <button
              onClick={() => { setSearchTerm(''); onSelectCategory('todos'); }}
              className="mt-4 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold rounded-lg transition-colors"
            >
              Ver Cardápio Completo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isFeijoada = item.isFeijoada;
              const hasSizes = !!item.prices.M;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item, preferredSize)}
                  className={`group bg-stone-900 rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-xl ${
                    isFeijoada 
                      ? 'border-amber-500/60 shadow-amber-950/30' 
                      : 'border-stone-800 hover:border-stone-700'
                  }`}
                  id={`item-card-${item.id}`}
                >
                  <div>
                    {/* Item Image with tags */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Category / Chef badge */}
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                        {isFeijoada && (
                          <span className="bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Flame className="w-3 h-3" /> Especial de Sábado
                          </span>
                        )}
                        {item.isChefSpecial && !isFeijoada && (
                          <span className="bg-stone-950/85 backdrop-blur-md text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-400" /> Especial da Chefe
                          </span>
                        )}
                        {item.isFit && (
                          <span className="bg-emerald-950/85 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Heart className="w-3 h-3 text-emerald-400" /> Gourmet Fit
                          </span>
                        )}
                      </div>

                      {/* Available days badge */}
                      {isFeijoada && (
                        <div className="absolute bottom-2.5 left-2.5 bg-stone-950/90 text-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-stone-800">
                          Disponível aos Sábados
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors leading-snug mb-2">
                        {item.name}
                      </h3>
                      <p className="text-stone-400 text-xs leading-relaxed line-clamp-3 mb-4">
                        {item.description}
                      </p>

                      {/* Sizes indication */}
                      {hasSizes && (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-stone-400 mb-4 bg-stone-950/60 p-2 rounded-lg border border-stone-800/80">
                          <span className="text-amber-400 font-semibold">Tamanhos:</span>
                          <span className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">P (450g)</span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">M (680g)</span>
                          <span className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">G (920g)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Footer Price & Action */}
                  <div className="p-5 pt-0 border-t border-stone-800/60 mt-2 flex items-center justify-between">
                    <div>
                      {hasSizes ? (
                        <>
                          <span className="text-[10px] text-stone-400 block font-medium">A partir de (Tam P)</span>
                          <span className="text-lg font-bold text-amber-400">
                            {formatCurrency(item.prices.P || 0)}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-[10px] text-stone-400 block font-medium">Preço</span>
                          <span className="text-lg font-bold text-amber-400">
                            {formatCurrency(item.prices.single || 0)}
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item, preferredSize);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-stone-950 font-bold text-xs transition-all duration-200 border border-amber-500/30 hover:border-amber-400 cursor-pointer active:scale-95"
                      id={`btn-customize-${item.id}`}
                    >
                      <span>{hasSizes ? 'Montar Marmita' : 'Adicionar'}</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
