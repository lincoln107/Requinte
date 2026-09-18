import { Sparkles, Flame, Clock, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import feijoadaImg from '../assets/images/feijoada_gourmet_1789773150675.jpg';
import { MenuItem } from '../types';
import { formatCurrency } from '../utils/orderUtils';

interface SaturdayFeijoadaSectionProps {
  feijoadaItem: MenuItem;
  onOpenCustomizer: (item: MenuItem) => void;
}

export default function SaturdayFeijoadaSection({
  feijoadaItem,
  onOpenCustomizer
}: SaturdayFeijoadaSectionProps) {
  return (
    <section id="feijoada" className="py-16 sm:py-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-100 border-b border-stone-800 relative overflow-hidden">
      {/* Background visual flair */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Tag */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Flame className="w-4 h-4 text-amber-400" />
            Tradição & Alta Gastronomia de Sábado
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-3xl leading-tight">
            A Famosa <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Feijoada Gourmet</span> de Sábado
          </h2>
          <p className="text-stone-300 text-base max-w-2xl mt-3">
            Prato principal dos nossos sábados em Itaquaquecetuba, preparado com carnes nobres desengorduradas e tempero artesanal exclusivo da Chefe Ágatha Urbano.
          </p>
        </div>

        {/* Spotlight Card */}
        <div className="rounded-3xl bg-stone-900/90 border border-amber-500/40 p-6 sm:p-10 shadow-2xl shadow-amber-950/40 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image Side */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-stone-950 border border-stone-800 shadow-xl relative group">
                <img 
                  src={feijoadaImg} 
                  alt="Feijoada Gourmet Completa da Chefe Ágatha Urbano" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Prato Principal do Sábado
                </div>
                <div className="absolute bottom-3 right-3 bg-amber-500 text-stone-950 px-3 py-1 rounded-lg text-xs font-extrabold shadow-md">
                  Carnes Selecionadas Nobres
                </div>
              </div>

              {/* Saturday hours badge below image */}
              <div className="mt-4 flex items-center justify-between text-xs text-stone-300 bg-stone-950/80 p-3 rounded-xl border border-stone-800">
                <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                  <Clock className="w-4 h-4" /> Sábados das 11h às 15h
                </span>
                <span className="text-stone-400">Recomendamos agendar com antecedência!</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-serif-title">
                  Feijoada Completa da Chefe Ágatha
                </h3>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  Cozida lentamente em fogo brando por horas para apurar o caldo aromático e encorpado, sem excesso de gordura. Cada corte de carne é selecionado a dedo.
                </p>
              </div>

              {/* Composition of the dish */}
              <div className="bg-stone-950/60 rounded-2xl p-4 border border-stone-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" /> O que acompanha a sua Feijoada Gourmet:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Costelinha suína defumada & Paio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Lombo nobre & Carne seca desfiada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Arroz branco soltinho ao alho</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Couve à mineira no alho dourado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Farofa crocante de bacon artesanal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Vinagrete fresco & Laranjas doces</span>
                  </div>
                </div>
              </div>

              {/* Pricing by sizes P, M, G */}
              <div>
                <span className="text-xs text-stone-400 block mb-2 font-medium">Tamanhos e Valores da Feijoada:</span>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-center">
                    <span className="text-[11px] font-bold text-amber-400 block">TAMANHO P</span>
                    <span className="text-xs text-stone-400 block">450g</span>
                    <span className="text-base font-extrabold text-white">{formatCurrency(feijoadaItem.prices.P || 31.90)}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border-2 border-amber-500 text-center relative shadow-md">
                    <span className="text-[9px] bg-amber-500 text-stone-950 font-bold px-1.5 py-0.5 rounded-full absolute -top-2 left-1/2 -translate-x-1/2 uppercase">
                      Ideal
                    </span>
                    <span className="text-[11px] font-bold text-amber-300 block">TAMANHO M</span>
                    <span className="text-xs text-stone-400 block">680g</span>
                    <span className="text-base font-extrabold text-amber-300">{formatCurrency(feijoadaItem.prices.M || 39.90)}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-center">
                    <span className="text-[11px] font-bold text-amber-400 block">TAMANHO G</span>
                    <span className="text-xs text-stone-400 block">920g (Farta)</span>
                    <span className="text-base font-extrabold text-white">{formatCurrency(feijoadaItem.prices.G || 49.90)}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenCustomizer(feijoadaItem)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  id="btn-order-feijoada"
                >
                  <span>Pedir ou Agendar Minha Feijoada</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-stone-400 flex items-center gap-1 justify-center sm:justify-start">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Garantia de frescor e embalagem 100% à prova de vazamento
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
