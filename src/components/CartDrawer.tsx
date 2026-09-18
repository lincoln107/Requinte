import { useState, useMemo } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, Copy, Check, Clock, MapPin, Bike, Store, CreditCard, Banknote, QrCode } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { NEIGHBORHOODS_ITAQUA, TIME_SLOTS, RESTAURANT_INFO } from '../data/menuData';
import { formatCurrency, generateWhatsAppMessage } from '../utils/orderUtils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  if (!isOpen) return null;

  // Order Details state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'retirada'>('delivery');
  
  // Date scheduling
  const todayDateStr = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
  }, []);

  const [deliveryDate, setDeliveryDate] = useState(`Hoje (${todayDateStr})`);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(TIME_SLOTS[1]); // 11:30 às 12:00

  // Address
  const [neighborhood, setNeighborhood] = useState(NEIGHBORHOODS_ITAQUA[0].name);
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [reference, setReference] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao_entrega' | 'dinheiro'>('pix');
  const [changeAmount, setChangeAmount] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  // Copied feedback
  const [copied, setCopied] = useState(false);

  // Delivery fee calculation
  const currentNeighborhoodObj = NEIGHBORHOODS_ITAQUA.find(n => n.name === neighborhood) || NEIGHBORHOODS_ITAQUA[0];
  const deliveryFee = deliveryType === 'delivery' ? currentNeighborhoodObj.fee : 0;

  const subtotal = items.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);
  const total = subtotal + deliveryFee;

  const currentOrder: OrderDetails = {
    customerName: customerName.trim() || 'Cliente Especial',
    phone: phone.trim() || 'WhatsApp',
    deliveryType,
    deliveryDate,
    deliveryTimeSlot,
    neighborhood,
    street: street.trim(),
    number: number.trim(),
    complement: complement.trim(),
    reference: reference.trim(),
    paymentMethod,
    changeAmount: paymentMethod === 'dinheiro' && changeAmount ? changeAmount : undefined,
    generalNotes: generalNotes.trim()
  };

  const { text: generatedText, url: whatsappUrl } = generateWhatsAppMessage(
    currentOrder,
    items,
    deliveryFee
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-stone-900 h-full flex flex-col shadow-2xl border-l border-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base sm:text-lg">
                Sua Sacola Gourmet
              </h2>
              <p className="text-xs text-stone-400">
                {items.length} {items.length === 1 ? 'item' : 'itens'} no pedido
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Fechar Sacola"
            id="btn-close-cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 text-stone-200">
          
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-stone-800 text-stone-600 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-white text-lg mb-1">
                Sua sacola está vazia
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm max-w-xs mx-auto mb-6">
                Explore o cardápio da Chefe Ágatha e monte sua marmita com os tamanhos P, M ou G.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-colors cursor-pointer"
              >
                Ver Cardápio
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 pb-1 border-b border-stone-800">
                  <span>Itens Selecionados</span>
                  <button
                    onClick={onClearCart}
                    className="text-stone-500 hover:text-red-400 transition-colors"
                  >
                    Esvaziar
                  </button>
                </div>

                {items.map((it) => (
                  <div
                    key={it.cartItemId}
                    className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={it.image} 
                          alt={it.name}
                          className="w-12 h-12 rounded-xl object-cover border border-stone-800 flex-shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-white leading-tight">
                              {it.name}
                            </h4>
                            {it.size && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold text-[10px] border border-amber-500/30">
                                Tam {it.size}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-amber-400">
                            {formatCurrency(it.unitPrice)} cada
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(it.cartItemId)}
                        className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                        title="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Custom sides breakdown */}
                    {(it.selectedBase || it.selectedFeijao || it.selectedComplements || it.selectedSalad) && (
                      <div className="text-[11px] text-stone-400 bg-stone-900/90 p-2.5 rounded-xl space-y-1 border border-stone-800/80">
                        {it.selectedBase && (
                          <p><strong className="text-stone-300">Base:</strong> {it.selectedBase}</p>
                        )}
                        {it.selectedFeijao && (
                          <p><strong className="text-stone-300">Feijão:</strong> {it.selectedFeijao}</p>
                        )}
                        {it.selectedComplements && it.selectedComplements.length > 0 && (
                          <p><strong className="text-stone-300">Guarnições:</strong> {it.selectedComplements.join(', ')}</p>
                        )}
                        {it.selectedSalad && (
                          <p><strong className="text-stone-300">Salada:</strong> {it.selectedSalad}</p>
                        )}
                        {it.notes && (
                          <p className="text-amber-300/90 italic">Obs: {it.notes}</p>
                        )}
                      </div>
                    )}

                    {/* Quantity controls & Subtotal */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(it.cartItemId, it.quantity - 1)}
                          className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-white">
                          {it.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(it.cartItemId, it.quantity + 1)}
                          className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-extrabold text-sm text-stone-100">
                        {formatCurrency(it.unitPrice * it.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery vs Retirada Mode */}
              <div className="space-y-3 pt-4 border-t border-stone-800">
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                  Modalidade do Pedido:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      deliveryType === 'delivery'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Entrega Agendada</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('retirada')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      deliveryType === 'retirada'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Retirada no Balcão</span>
                  </button>
                </div>
              </div>

              {/* Delivery Schedule (Date & Time Window) */}
              <div className="space-y-3 pt-2 bg-stone-950 p-3.5 rounded-2xl border border-stone-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Clock className="w-4 h-4" />
                  <span>Agendamento do Almoço (11h às 15h):</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Dia da Entrega:</label>
                    <select
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                    >
                      <option value={`Hoje (${todayDateStr})`}>Hoje ({todayDateStr})</option>
                      <option value="Amanhã">Amanhã</option>
                      <option value="Próximo Sábado (Feijoada Gourmet)">Próximo Sábado (Feijoada Gourmet)</option>
                      <option value="Outro dia da semana (Seg a Sáb)">Outro dia da semana</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Janela de Horário:</label>
                    <select
                      value={deliveryTimeSlot}
                      onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 text-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="space-y-3 pt-2 border-t border-stone-800">
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                  Seus Dados para o Pedido:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Seu Nome:</label>
                    <input
                      type="text"
                      placeholder="Ex: Carlos Silva"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                      id="input-customer-name"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">WhatsApp / Telefone:</label>
                    <input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                      id="input-customer-phone"
                    />
                  </div>
                </div>
              </div>

              {/* Address in Itaquaquecetuba (if delivery) */}
              {deliveryType === 'delivery' && (
                <div className="space-y-3 pt-2 border-t border-stone-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Endereço em Itaquaquecetuba:</span>
                    </label>
                    <span className="text-[11px] text-amber-400 font-semibold">
                      Taxa: {formatCurrency(deliveryFee)}
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Bairro:</label>
                    <select
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 text-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                    >
                      {NEIGHBORHOODS_ITAQUA.map((n) => (
                        <option key={n.name} value={n.name}>
                          {n.name} - {formatCurrency(n.fee)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[11px] text-stone-400 block mb-1">Rua / Avenida:</label>
                      <input
                        type="text"
                        placeholder="Ex: Rua São Paulo"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                        id="input-customer-street"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-400 block mb-1">Número:</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                        id="input-customer-number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-stone-400 block mb-1">Complemento / Apto:</label>
                      <input
                        type="text"
                        placeholder="Apto 42, Bloco B"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-400 block mb-1">Ponto de Referência:</label>
                      <input
                        type="text"
                        placeholder="Próximo à praça..."
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="space-y-3 pt-2 border-t border-stone-800">
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                  Forma de Pagamento:
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'pix'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>PIX</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cartao_entrega')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'cartao_entrega'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Cartão</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('dinheiro')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'dinheiro'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span>Dinheiro</span>
                  </button>
                </div>

                {paymentMethod === 'dinheiro' && (
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Troco para quanto?</label>
                    <input
                      type="text"
                      placeholder="Ex: Troco para R$ 100,00 (ou deixe em branco se não precisar)"
                      value={changeAmount}
                      onChange={(e) => setChangeAmount(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100"
                    />
                  </div>
                )}
              </div>

              {/* General Order Notes */}
              <div className="pt-2 border-t border-stone-800">
                <label className="text-[11px] text-stone-400 block mb-1">
                  Alguma observação geral para o pedido?
                </label>
                <input
                  type="text"
                  placeholder="Ex: Tocar o interfone, embalar separado..."
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500"
                />
              </div>

            </>
          )}

        </div>

        {/* Footer with Totals and WhatsApp Action */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 space-y-3">
            {/* Financial breakdown */}
            <div className="space-y-1.5 text-xs text-stone-300">
              <div className="flex items-center justify-between">
                <span>Subtotal ({items.length} itens)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxa de Entrega ({deliveryType === 'delivery' ? neighborhood : 'Retirada'})</span>
                <span className={deliveryType === 'retirada' ? 'text-emerald-400 font-bold' : ''}>
                  {deliveryType === 'retirada' ? 'Grátis' : formatCurrency(deliveryFee)}
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-extrabold text-white pt-1 border-t border-stone-800">
                <span>Total do Pedido:</span>
                <span className="text-amber-400 text-lg">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Primary Action Button: WhatsApp Checkout */}
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-stone-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/40 transition-all cursor-pointer active:scale-98"
              id="btn-send-whatsapp-order"
            >
              <Send className="w-5 h-5" />
              <span>Enviar Pedido pelo WhatsApp</span>
            </button>

            {/* Secondary Action Button: Copy Order Message */}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 border border-stone-800 transition-colors cursor-pointer"
              id="btn-copy-order-text"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Mensagem Copiada com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span>Copiar Texto Formatado do Pedido</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-stone-400 text-center">
              Ao clicar, você será redirecionado para o WhatsApp da Chefe Ágatha Urbano para confirmação imediata.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
