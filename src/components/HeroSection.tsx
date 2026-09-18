import { motion } from 'motion/react';
import { ChefHat, ArrowRight, Sparkles, Clock, ShieldCheck, Flame, Bike } from 'lucide-react';
import heroImage from '../assets/images/hero_gourmet_marmita_1789773140527.jpg';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOpenFeijoada: () => void;
}

export default function HeroSection({ onExploreMenu, onOpenFeijoada }: HeroSectionProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-stone-950 text-stone-100 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-800">
      {/* Subtle warm glow background accent */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Chef badge tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-amber-200">
                Criado pela Chefe Ágatha Urbano
              </span>
              <span className="text-stone-500 hidden sm:inline">|</span>
              <span className="text-xs text-stone-300 hidden sm:inline">Itaquaquecetuba - SP</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              A elegância de um <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                restaurante gourmet
              </span><br />
              na sua marmita diária.
            </h1>

            {/* Sub-description with all prompt elements */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl font-light leading-relaxed">
              Descubra o padrão <strong className="text-amber-300 font-medium">Requinte Marmitex</strong>: 
              ingredientes nobres, temperos autorais e preparo artesanal comandado pela 
              <strong className="text-stone-100 font-medium"> Chefe Ágatha Urbano</strong>. 
              Disponível nos tamanhos <strong className="text-amber-300 font-semibold">P, M e G</strong> com 
              entrega pontual agendada direto pelo WhatsApp em toda Itaquaquecetuba.
            </p>

            {/* Saturday Feijoada Micro Banner */}
            <div 
              onClick={onOpenFeijoada}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-amber-500/30 flex items-center justify-between gap-4 cursor-pointer hover:border-amber-400/60 transition-colors shadow-lg"
              id="hero-feijoada-callout"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 border border-amber-500/30">
                  <Flame className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Prato Principal de Sábado</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-medium">Tradicional</span>
                  </div>
                  <p className="text-sm font-semibold text-stone-100">Feijoada Gourmet Completa da Chefe Ágatha</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 flex-shrink-0">
                Ver Detalhes <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-bold text-base shadow-xl shadow-amber-950/50 hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                id="btn-hero-order"
              >
                <span>Montar Minha Marmita</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20o%20card%C3%A1pio%20do%20Requinte%20Marmitex%20de%20hoje!`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 font-semibold text-base border border-stone-700 hover:border-amber-400/40 transition-colors"
                id="btn-hero-whatsapp"
              >
                <span>Agendar via WhatsApp</span>
              </a>
            </div>

            {/* Key Quality Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-800/80">
              <div className="flex flex-col gap-1">
                <span className="text-amber-400 flex items-center gap-1.5 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" /> 100% Selada
                </span>
                <span className="text-[12px] text-stone-400">Embalagem térmica anti-vazamento</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-amber-400 flex items-center gap-1.5 text-xs font-bold">
                  <Clock className="w-4 h-4" /> 11h às 15h
                </span>
                <span className="text-[12px] text-stone-400">Segunda a Sábado com horário agendado</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-amber-400 flex items-center gap-1.5 text-xs font-bold">
                  <Bike className="w-4 h-4" /> Itaquaquecetuba
                </span>
                <span className="text-[12px] text-stone-400">Entrega rápida e segura</span>
              </div>
            </div>

          </motion.div>

          {/* Right Visual Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden p-2 bg-gradient-to-b from-amber-500/30 to-stone-900/60 border border-amber-500/30 shadow-2xl shadow-amber-950/80">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900">
                <img 
                  src={heroImage} 
                  alt="Marmita Gourmet do Requinte Marmitex montada com ingredientes nobres" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual badge overlaid */}
                <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md border border-amber-500/40 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Padrão Executivo Gourmet
                </div>

                {/* Bottom caption overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="text-stone-300 text-[11px]">Tamanhos Disponíveis</p>
                      <p className="text-white font-bold text-sm">P (450g) • M (680g) • G (920g)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 text-[11px] font-semibold">A partir de</p>
                      <p className="text-amber-300 font-extrabold text-lg">R$ 22,90</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-5 -left-4 sm:bottom-4 sm:-left-6 bg-stone-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-amber-500/30 shadow-xl hidden sm:flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg border border-amber-500/30">
                4.9
              </div>
              <div className="text-xs">
                <p className="font-bold text-stone-100">Avaliação Média dos Clientes</p>
                <p className="text-stone-400">+1.500 marmitas gourmet entregues em Itaquá</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
