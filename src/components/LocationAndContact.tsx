import { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function LocationAndContact() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Qual a diferença real entre os tamanhos P, M e G das marmitas?",
      a: "A marmita P pesa aproximadamente 450g e é ideal para quem prefere uma refeição mais leve e equilibrada. A marmita M pesa em torno de 680g e é o nosso padrão executivo mais vendido, perfeita para o dia a dia. Já a marmita G possui cerca de 920g de fartura de respeito, indicada para grande apetite ou para dividir a dois."
    },
    {
      q: "Como funciona a entrega agendada em Itaquaquecetuba?",
      a: "Você escolhe seus pratos e define a faixa de horário que prefere receber entre 11h00 e 15h00 (por exemplo: 11h30 às 12h00, 12h00 às 12h30). Produzimos com o tempo exato para que a comida saia da panela e chegue no pico do calor e frescor até o seu endereço."
    },
    {
      q: "A feijoada gourmet aos sábados esgota rápido?",
      a: "Sim! A Feijoada Gourmet Completa da Chefe Ágatha Urbano é o nosso prato principal de todos os sábados e possui grande procura em Itaquaquecetuba. Recomendamos agendar seu pedido com antecedência pelo cardápio digital ou WhatsApp para garantir sua porção antes de esgotar."
    },
    {
      q: "Quais bairros de Itaquaquecetuba vocês atendem?",
      a: "Atendemos praticamente todos os bairros da cidade: Centro, Vila Virgínia, Aracaré, Manoel Feio, Piratininga, Jardim Odete, Monte Belo, Rancho Grande, Vila São Carlos, Jardim Caiuby, Pequeno Coração, Terra Prometida, Louzada, Rio Abaixo e empresas ao longo da Rodovia Henrique Eroles e SP-66."
    },
    {
      q: "Como são as embalagens do Requinte Marmitex?",
      a: "Utilizamos embalagens térmicas de alta tecnologia hermeticamente seladas. Elas mantêm a comida fumegando por até 45 minutos e não misturam os alimentos nem deixam vazar caldos no transporte. Além disso, a salada sempre é enviada em pote separado e higienizado."
    }
  ];

  return (
    <section id="contato-faq" className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Location & Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-2">
                <MapPin className="w-3.5 h-3.5" />
                Nossa Localização
              </div>
              <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white mb-3">
                Requinte Marmitex em Itaquaquecetuba
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                Produzido no coração de Itaquaquecetuba com fácil acesso para entregas rápidas em todos os bairros e opção de retirada rápida no balcão.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Endereço Principal</h4>
                  <p className="text-xs text-stone-300 mt-0.5">{RESTAURANT_INFO.fullAddress}</p>
                  <span className="text-[11px] text-amber-400 font-semibold block mt-1">Disponível para Entrega e Retirada</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Horário de Atendimento</h4>
                  <p className="text-xs text-stone-300 mt-0.5">{RESTAURANT_INFO.openingHours}</p>
                  <p className="text-[11px] text-amber-300 mt-1 font-medium">Sábados: Feijoada Gourmet Completa como Prato Principal</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">WhatsApp & Pedidos Diretos</h4>
                  <p className="text-xs text-stone-300 mt-0.5">{RESTAURANT_INFO.formattedPhone}</p>
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20Requinte%20Marmitex!`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold mt-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chamar no WhatsApp Agora</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                Dúvidas Frequentes
              </div>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mb-2">
                Perguntas Frequentes
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm">
                Tudo o que você precisa saber antes de fazer seu pedido gourmet.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-stone-950 border border-stone-800 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-amber-400 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/80 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
