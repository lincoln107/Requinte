import { useState } from 'react';
import { Clock, MapPin, Calendar, CheckCircle2, MessageCircle, Bike, Building2, Home } from 'lucide-react';
import { NEIGHBORHOODS_ITAQUA, RESTAURANT_INFO, TIME_SLOTS } from '../data/menuData';
import { formatCurrency } from '../utils/orderUtils';

interface ScheduleDeliveryGuideProps {
  onOpenCartWithSchedule?: () => void;
}

export default function ScheduleDeliveryGuide({ onOpenCartWithSchedule }: ScheduleDeliveryGuideProps) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(NEIGHBORHOODS_ITAQUA[0].name);

  const currentNeighborhood = NEIGHBORHOODS_ITAQUA.find(n => n.name === selectedNeighborhood) || NEIGHBORHOODS_ITAQUA[0];

  return (
    <section id="entrega-agendada" className="py-16 sm:py-24 bg-stone-950 text-stone-100 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Clock className="w-3.5 h-3.5" />
            Almoço Sem Fila & Sem Atraso
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white mb-4">
            Entrega Agendada em <br className="hidden sm:inline" />
            <span className="text-amber-400">Itaquaquecetuba e Região</span>
          </h2>
          <p className="text-stone-300 text-base leading-relaxed">
            Esqueça marmitas frias ou atrasos no seu intervalo. Com o sistema do <strong className="text-amber-300 font-semibold">Requinte Marmitex</strong>, você programa o horário exato da entrega direto pelo WhatsApp!
          </p>
        </div>

        {/* 3 Step Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-stone-900/90 rounded-2xl p-6 border border-stone-800 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-extrabold flex items-center justify-center text-lg mb-4 shadow-md">
              1
            </div>
            <h3 className="font-bold text-lg text-white mb-2">
              Escolha e Personalize
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Navegue pelo cardápio, escolha o tamanho (P, M ou G), seu prato favorito, as guarnições da Chefe Ágatha e bebidas ou sobremesa.
            </p>
          </div>

          <div className="bg-stone-900/90 rounded-2xl p-6 border border-amber-500/40 relative shadow-xl shadow-amber-950/30">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 font-extrabold flex items-center justify-center text-lg mb-4 shadow-md">
              2
            </div>
            <h3 className="font-bold text-lg text-white mb-2">
              Selecione o Horário Desejado
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Defina a faixa de horário perfeita para o seu almoço (de 11h às 15h, de segunda a sábado). Agende para hoje ou para os próximos dias.
            </p>
          </div>

          <div className="bg-stone-900/90 rounded-2xl p-6 border border-stone-800 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-stone-950 font-extrabold flex items-center justify-center text-lg mb-4 shadow-md">
              3
            </div>
            <h3 className="font-bold text-lg text-white mb-2">
              Confirme no WhatsApp
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              O sistema gera a mensagem completa formatada com endereço e itens. A cozinha recebe, confirma e produz na hora para chegar quentinha!
            </p>
          </div>
        </div>

        {/* Interactive Neighborhood & Simulator Card */}
        <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <MapPin className="w-4 h-4" />
                Simulador de Taxa & Bairros Atendidos
              </div>
              <h3 className="text-2xl font-bold text-white font-serif-title">
                Consulte o tempo e entrega para o seu bairro
              </h3>
              <p className="text-stone-300 text-sm">
                Entregamos em residências, condomínios, escritórios, consultórios, galpões e indústrias de Itaquaquecetuba com frota própria e motoboys dedicados.
              </p>

              {/* Selector */}
              <div className="pt-2">
                <label className="text-xs font-bold text-stone-300 block mb-1.5">
                  Selecione seu Bairro em Itaquaquecetuba:
                </label>
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-stone-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                  id="select-neighborhood-guide"
                >
                  {NEIGHBORHOODS_ITAQUA.map((n) => (
                    <option key={n.name} value={n.name}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic result pill */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block">Taxa de Entrega estimada</span>
                  <span className="text-xl font-extrabold text-amber-400">
                    {formatCurrency(currentNeighborhood.fee)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-400 block">Tempo médio no agendamento</span>
                  <span className="text-sm font-bold text-stone-100">
                    {currentNeighborhood.deliveryTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card: Corporate & Scheduled Delivery callout */}
            <div className="lg:col-span-6 bg-stone-950/70 rounded-2xl p-6 border border-stone-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Almoço Corporativo & Equipes</h4>
                  <p className="text-xs text-stone-400">Escritórios, comércios e polos industriais de Itaquá</p>
                </div>
              </div>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Precisa de marmitas para sua equipe toda com pontualidade às 12h00? Agende pedidos múltiplos pelo WhatsApp com nota ou recibo e garantia de entrega simultânea.
              </p>

              <div className="space-y-2 text-xs text-stone-300 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Embalagens identificadas com o nome de cada colaborador</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Pagamento unificado via PIX ou Faturamento para empresas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Feijoada de Sábado para confraternizações e plantões</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Ol%C3%A1%2C%20Chefe%20%C3%81gatha!%20Gostaria%20de%20combinar%20marmitas%20agendadas%20para%20minha%20empresa%2Fequipe%20em%20Itaquaquecetuba.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 border border-amber-500/30 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Falar com a Cozinha via WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
