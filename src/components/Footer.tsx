import { ChefHat, Heart, MapPin, Clock, Phone, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <span className="font-brand text-xl font-bold tracking-wider text-amber-400">
                  REQUINTE
                </span>
                <span className="text-lg font-light text-stone-200 ml-1.5">
                  MARMITEX
                </span>
                <p className="text-[11px] text-stone-400">
                  Marmitas Gourmet por <strong className="text-amber-300 font-semibold">{RESTAURANT_INFO.chef}</strong>
                </p>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Alta gastronomia caseira com padrão executivo e afeto. Tamanhos P, M e G montados em embalagens térmicas herméticas com entrega agendada em Itaquaquecetuba.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{RESTAURANT_INFO.fullAddress}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#cardapio" className="hover:text-amber-400 transition-colors">
                  Cardápio Digital Interativo
                </a>
              </li>
              <li>
                <a href="#tamanhos" className="hover:text-amber-400 transition-colors">
                  Tamanhos P, M e G
                </a>
              </li>
              <li>
                <a href="#feijoada" className="text-amber-400 hover:text-amber-300 transition-colors font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Feijoada de Sábado
                </a>
              </li>
              <li>
                <a href="#chefe" className="hover:text-amber-400 transition-colors">
                  Chefe Ágatha Urbano
                </a>
              </li>
              <li>
                <a href="#entrega-agendada" className="hover:text-amber-400 transition-colors">
                  Entrega Agendada & Bairros
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Horários & Contato
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-200 block">Segunda a Sábado</span>
                  <span>11:00 às 15:00</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300 block">Sábado Gourmet</span>
                  <span>Feijoada Completa como Prato Principal</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-stone-200">{RESTAURANT_INFO.formattedPhone}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>
            © {new Date().getFullYear()} Requinte Marmitex. Todos os direitos reservados. Itaquaquecetuba - SP.
          </p>
          <p className="flex items-center gap-1">
            <span>Comandado com dedicação pela</span>
            <strong className="text-stone-300 font-semibold">Chefe Ágatha Urbano</strong>
          </p>
        </div>

      </div>
    </footer>
  );
}
