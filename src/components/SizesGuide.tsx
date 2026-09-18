import { useState } from 'react';
import { Sparkles, CheckCircle2, Utensils, Award, Users, Scale } from 'lucide-react';
import { SIZES_DATA } from '../data/menuData';
import { MarmitaSize } from '../types';

interface SizesGuideProps {
  onSelectSizeForMenu: (size: MarmitaSize) => void;
}

export default function SizesGuide({ onSelectSizeForMenu }: SizesGuideProps) {
  const [activeSize, setActiveSize] = useState<MarmitaSize>('M');

  return (
    <section id="tamanhos" className="py-16 sm:py-20 bg-stone-900 text-stone-100 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Scale className="w-3.5 h-3.5" />
            Guia de Porções Exclusivas
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white mb-4">
            Escolha a sua medida perfeita: <br className="hidden sm:inline" />
            <span className="text-amber-400">Tamanhos P, M e G</span>
          </h2>
          <p className="text-stone-300 text-base leading-relaxed">
            No <span className="text-amber-200 font-semibold">Requinte Marmitex</span>, cada marmita é pesada e montada com rigor técnico pela equipe da Chefe Ágatha Urbano em embalagens térmicas com divisórias seladas.
          </p>
        </div>

        {/* 3 Size Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {SIZES_DATA.map((size) => {
            const isFeatured = size.id === 'M';
            const isSelected = activeSize === size.id;

            return (
              <div
                key={size.id}
                onClick={() => setActiveSize(size.id)}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isFeatured 
                    ? 'bg-gradient-to-b from-stone-800 to-stone-950 border-2 border-amber-500 shadow-2xl shadow-amber-950/60 scale-[1.02]' 
                    : 'bg-stone-950/80 border border-stone-800 hover:border-stone-700'
                } ${isSelected ? 'ring-2 ring-amber-400/50' : ''}`}
                id={`card-size-${size.id.toLowerCase()}`}
              >
                {/* Popular pill for M */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-extrabold text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Mais Pedida em Itaquá ⭐
                  </div>
                )}

                <div>
                  {/* Top size badge & weight */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                      <span className="font-serif-title text-2xl font-bold text-amber-400">
                        {size.id}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-400 block font-medium">Peso Médio</span>
                      <span className="text-sm font-extrabold text-stone-100 flex items-center justify-end gap-1">
                        <Scale className="w-3.5 h-3.5 text-amber-400" />
                        {size.weight}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {size.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-4 pb-3 border-b border-stone-800">
                    <Users className="w-3.5 h-3.5" />
                    <span>{size.serves}</span>
                  </div>

                  <p className="text-stone-300 text-sm leading-relaxed mb-6">
                    {size.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2.5 mb-6 text-xs text-stone-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{size.recommendedFor}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Embalagem térmica selada (mantém quentinha por até 45 min)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Pote de salada fresca à parte higienizada</span>
                    </div>
                  </div>
                </div>

                {/* Bottom action button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSizeForMenu(size.id);
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isFeatured
                      ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-950/40'
                      : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700'
                  }`}
                  id={`btn-choose-size-${size.id.toLowerCase()}`}
                >
                  <Utensils className="w-4 h-4" />
                  <span>Ver Pratos no Tamanho {size.id}</span>
                </button>

              </div>
            );
          })}
        </div>

        {/* Comparison Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Higiene e Embalagem Padrão Restaurante</h4>
              <p className="text-stone-400 text-xs sm:text-sm">
                Todas as marmitas são lacradas com selo de segurança da Chefe Ágatha Urbano. A salada nunca vai misturada com o prato quente.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectSizeForMenu('M')}
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-md cursor-pointer transition-colors"
          >
            Abrir Cardápio Completo
          </button>
        </div>

      </div>
    </section>
  );
}
