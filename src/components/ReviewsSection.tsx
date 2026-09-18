import { Star, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-stone-100 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Quem Experimenta, Recomenda
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white mb-3">
            O Que Dizem Nossos Clientes em Itaquá
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Mais de 1.500 marmitas gourmet entregues com aprovação quase unânime da Chefe Ágatha Urbano.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review, i) => (
            <div
              key={i}
              className="bg-stone-950 p-6 rounded-2xl border border-stone-800 flex flex-col justify-between relative shadow-lg"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-amber-500/20 mb-2" />

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80">
                <p className="font-bold text-white text-sm">
                  {review.name}
                </p>
                <p className="text-stone-400 text-xs">
                  {review.role}
                </p>
                <div className="mt-2 inline-block text-[11px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
                  {review.marmita}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
