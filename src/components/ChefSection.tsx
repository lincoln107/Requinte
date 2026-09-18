import { Award, Sparkles, Heart, ShieldCheck, Flame, Utensils } from 'lucide-react';
import chefPhoto from '../assets/images/chefe_agatha_urbano_1789773161042.jpg';
import { RESTAURANT_INFO } from '../data/menuData';

export default function ChefSection() {
  return (
    <section id="chefe" className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-b border-stone-800 relative overflow-hidden">
      {/* Background warm aesthetic circle */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Chef Image Column */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl p-2 bg-gradient-to-tr from-amber-500/40 via-stone-800 to-stone-900 border border-amber-500/40 shadow-2xl shadow-amber-950/60">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-stone-950 relative">
                <img 
                  src={chefPhoto} 
                  alt="Chefe de Cozinha Ágatha Urbano em Itaquaquecetuba" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                
                {/* Overlay badge at bottom */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-950/90 backdrop-blur-md border border-amber-500/30">
                  <p className="font-serif-title text-xl font-bold text-white">
                    Ágatha Urbano
                  </p>
                  <p className="text-xs text-amber-400 font-medium">
                    Chefe Executiva & Fundadora do Requinte Marmitex
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Itaquaquecetuba - São Paulo
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Stamp */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-stone-950 border border-amber-400/60 p-3 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-extrabold text-sm">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-stone-100 block">Alta Gastronomia</span>
                <span className="text-stone-400">Tempero 100% Autoral</span>
              </div>
            </div>
          </div>

          {/* Chef Philosophy & Story */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              A Alma Gastronômica do Requinte
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              A Chefe de Cozinha <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                Ágatha Urbano
              </span>
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              <em>"Marmita não precisa ser apenas uma refeição rápida — ela deve ser o ponto alto do seu dia, um momento de conforto, prazer e requinte."</em>
            </p>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Com formação em gastronomia e uma paixão declarada pela riqueza dos sabores brasileiros, a <strong className="text-white">Chefe Ágatha Urbano</strong> criou o <strong className="text-amber-300 font-semibold">Requinte Marmitex</strong> para transformar o almoço corporativo e familiar em Itaquaquecetuba. 
            </p>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Aqui, caldos prontos industriais e temperos ultraprocessados não entram. Todas as marinadas são feitas com ervas frescas colhidas no dia, alho dourado lentamente, cebola caramelizada e carnes nobres grelhadas no ponto perfeito.
            </p>

            {/* Chef Commitments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Feijoada Tradicional Autoral</span>
                </div>
                <p className="text-xs text-stone-400">
                  A receita de família aos sábados que virou referência na cidade pela leveza e sabor inconfundível.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Rigor Sanitário Absoluto</span>
                </div>
                <p className="text-xs text-stone-400">
                  Cozinha profissional com processos rigorosos de sanitização e embalagens térmicas 100% seladas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Utensils className="w-4 h-4" />
                  <span>Equilíbrio & Porções Fartas</span>
                </div>
                <p className="text-xs text-stone-400">
                  Dosagens pensadas para nutrir e satisfazer nos tamanhos P, M e G sem desperdício.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Heart className="w-4 h-4" />
                  <span>Amor por Itaquaquecetuba</span>
                </div>
                <p className="text-xs text-stone-400">
                  Atendimento caloroso e dedicação com cada cliente, empresa e família da nossa região.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
