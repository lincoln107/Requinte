import { useState, useEffect } from 'react';
import { X, Check, Plus, Minus, Sparkles, Scale, AlertCircle, ShoppingBag } from 'lucide-react';
import { MenuItem, MarmitaSize, CartItem } from '../types';
import { SIZES_DATA } from '../data/menuData';
import { formatCurrency } from '../utils/orderUtils';

interface MarmitaCustomizerModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  initialSize?: MarmitaSize;
}

export default function MarmitaCustomizerModal({
  item,
  isOpen,
  onClose,
  onAddToCart,
  initialSize = 'M'
}: MarmitaCustomizerModalProps) {
  if (!isOpen || !item) return null;

  const hasSizes = !!item.prices.M;

  // Selected state
  const [selectedSize, setSelectedSize] = useState<MarmitaSize>(initialSize);
  const [selectedBase, setSelectedBase] = useState<string>('');
  const [selectedFeijao, setSelectedFeijao] = useState<string>('');
  const [selectedComplements, setSelectedComplements] = useState<string[]>([]);
  const [selectedSalad, setSelectedSalad] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Initialize defaults whenever item opens
  useEffect(() => {
    if (item.sidesOptions) {
      setSelectedBase(item.sidesOptions.bases[0] || '');
      setSelectedFeijao(item.sidesOptions.feijoes[0] || '');
      // Default 1 or 2 complements
      setSelectedComplements(item.sidesOptions.complements.slice(0, 1));
      setSelectedSalad(item.sidesOptions.salads[0] || '');
    }
    setQuantity(1);
    setNotes('');
    if (hasSizes) {
      setSelectedSize(initialSize || 'M');
    }
  }, [item, initialSize, hasSizes]);

  // Pricing calculation
  const unitPrice = hasSizes 
    ? (item.prices[selectedSize] || item.prices.M || 0)
    : (item.prices.single || 0);

  // Additional fees for special items like Tropeiro or Torresmo if selected
  const hasExtraTropeiro = selectedFeijao.includes('+R$ 3,00');
  const hasExtraTorresmo = selectedComplements.some(c => c.includes('+R$ 4,00'));
  const extrasTotal = (hasExtraTropeiro ? 3.00 : 0) + (hasExtraTorresmo ? 4.00 : 0);
  const finalUnitPrice = unitPrice + extrasTotal;
  const totalPrice = finalUnitPrice * quantity;

  // Maximum complements based on size: P: 1-2, M: 2-3, G: 3
  const maxComplements = selectedSize === 'P' ? 2 : selectedSize === 'M' ? 3 : 4;

  const handleToggleComplement = (complement: string) => {
    if (selectedComplements.includes(complement)) {
      setSelectedComplements(selectedComplements.filter(c => c !== complement));
    } else {
      if (selectedComplements.length < maxComplements) {
        setSelectedComplements([...selectedComplements, complement]);
      }
    }
  };

  const handleConfirm = () => {
    const newCartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      size: hasSizes ? selectedSize : undefined,
      unitPrice: finalUnitPrice,
      quantity,
      selectedBase: hasSizes ? selectedBase : undefined,
      selectedFeijao: hasSizes ? selectedFeijao : undefined,
      selectedComplements: hasSizes ? selectedComplements : undefined,
      selectedSalad: hasSizes ? selectedSalad : undefined,
      notes: notes.trim() ? notes.trim() : undefined,
      image: item.image,
      isFeijoada: item.isFeijoada
    };

    onAddToCart(newCartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-stone-900 border border-amber-500/30 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Photo */}
        <div className="relative h-44 sm:h-52 w-full flex-shrink-0 bg-stone-950">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-stone-950/80 text-stone-200 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Fechar"
            id="btn-close-modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
              {item.isFeijoada ? 'Especial de Sábado' : 'Cardápio Gourmet Requinte'}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white font-serif-title leading-tight">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-stone-200">
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            {item.description}
          </p>

          {/* 1. SIZE SELECTION (P, M, G) */}
          {hasSizes && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  1. Escolha o Tamanho da Marmita:
                </label>
                <span className="text-xs text-amber-300 font-semibold">Obrigatório</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {SIZES_DATA.map((sizeOpt) => {
                  const price = item.prices[sizeOpt.id] || 0;
                  const isSelected = selectedSize === sizeOpt.id;

                  return (
                    <button
                      key={sizeOpt.id}
                      type="button"
                      onClick={() => setSelectedSize(sizeOpt.id)}
                      className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-md ring-1 ring-amber-400' 
                          : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                      }`}
                      id={`modal-size-${sizeOpt.id.toLowerCase()}`}
                    >
                      {sizeOpt.id === 'M' && (
                        <span className="absolute -top-2 right-2 bg-amber-500 text-stone-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                          Ideal
                        </span>
                      )}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-base text-amber-400">
                            {sizeOpt.id}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {sizeOpt.weight.replace('Aprox. ', '')}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-300 font-medium leading-tight mb-2 line-clamp-2">
                          {sizeOpt.badge}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-stone-100">
                        {formatCurrency(price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. BASE (ARROZ) */}
          {hasSizes && item.sidesOptions && (
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <label className="text-sm font-bold text-white flex items-center justify-between">
                <span>2. Escolha o Arroz / Base:</span>
                <span className="text-xs text-amber-300 font-normal">Escolha 1</span>
              </label>
              <div className="space-y-2">
                {item.sidesOptions.bases.map((base) => (
                  <label
                    key={base}
                    onClick={() => setSelectedBase(base)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                      selectedBase === base
                        ? 'bg-amber-500/10 border-amber-400/80 text-white'
                        : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <span>{base}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedBase === base ? 'border-amber-400 bg-amber-400 text-stone-950' : 'border-stone-600'
                    }`}>
                      {selectedBase === base && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 3. FEIJÃO */}
          {hasSizes && item.sidesOptions && (
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <label className="text-sm font-bold text-white flex items-center justify-between">
                <span>3. Escolha o Feijão / Caldo:</span>
                <span className="text-xs text-amber-300 font-normal">Escolha 1</span>
              </label>
              <div className="space-y-2">
                {item.sidesOptions.feijoes.map((feijao) => (
                  <label
                    key={feijao}
                    onClick={() => setSelectedFeijao(feijao)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                      selectedFeijao === feijao
                        ? 'bg-amber-500/10 border-amber-400/80 text-white'
                        : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <span>{feijao}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedFeijao === feijao ? 'border-amber-400 bg-amber-400 text-stone-950' : 'border-stone-600'
                    }`}>
                      {selectedFeijao === feijao && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 4. GUARNIÇÕES / COMPLEMENTOS */}
          {hasSizes && item.sidesOptions && (
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white">
                  4. Guarnições Artesanais:
                </label>
                <span className="text-xs text-stone-400">
                  (Até {maxComplements} para o tamanho {selectedSize})
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.sidesOptions.complements.map((comp) => {
                  const isChecked = selectedComplements.includes(comp);
                  return (
                    <div
                      key={comp}
                      onClick={() => handleToggleComplement(comp)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                      }`}
                    >
                      <span className="font-medium">{comp}</span>
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isChecked ? 'border-amber-400 bg-amber-400 text-stone-950' : 'border-stone-600'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. SALADA */}
          {hasSizes && item.sidesOptions && (
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <label className="text-sm font-bold text-white flex items-center justify-between">
                <span>5. Salada Fresca (Pote Separado):</span>
                <span className="text-xs text-amber-300 font-normal">Inclusa</span>
              </label>
              <div className="space-y-2">
                {item.sidesOptions.salads.map((salad) => (
                  <label
                    key={salad}
                    onClick={() => setSelectedSalad(salad)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                      selectedSalad === salad
                        ? 'bg-amber-500/10 border-amber-400/80 text-white'
                        : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <span>{salad}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedSalad === salad ? 'border-amber-400 bg-amber-400 text-stone-950' : 'border-stone-600'
                    }`}>
                      {selectedSalad === salad && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 6. OBSERVAÇÕES */}
          <div className="space-y-2 pt-2 border-t border-stone-800">
            <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
              <span>Alguma observação para a Chefe Ágatha?</span>
              <span className="text-stone-500 text-[11px] font-normal">(Opcional)</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Sem cebola, caprichar no alho, ponto da carne..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
              maxLength={150}
              id="input-customizer-notes"
            />
          </div>

        </div>

        {/* Sticky Modal Footer: Quantity & Add to Cart */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs text-stone-400 font-medium sm:hidden">Quantidade:</span>
            <div className="flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-9 text-center text-sm font-bold text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-auto flex-1 flex items-center justify-between px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-950/50 transition-all cursor-pointer"
            id="btn-confirm-add-marmita"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Adicionar à Sacola</span>
            </div>
            <span className="font-extrabold text-base">
              {formatCurrency(totalPrice)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
