import { CartItem, OrderDetails } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
}

export function checkRestaurantStatus(): {
  isOpen: boolean;
  message: string;
  nextScheduleAdvice: string;
} {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeInMinutes = hour * 60 + minutes;

  const openingMinutes = RESTAURANT_INFO.openingHourStart * 60; // 11 * 60 = 660
  const closingMinutes = RESTAURANT_INFO.openingHourEnd * 60; // 15 * 60 = 900

  const isWorkingDay = dayOfWeek >= 1 && dayOfWeek <= 6;
  const isDuringHours = currentTimeInMinutes >= openingMinutes && currentTimeInMinutes < closingMinutes;

  if (isWorkingDay && isDuringHours) {
    return {
      isOpen: true,
      message: "Aberto Agora! Produzindo & Entregando Marmitas Quentinhas",
      nextScheduleAdvice: "Faça seu pedido imediato ou agende para o melhor horário do seu almoço hoje."
    };
  }

  if (dayOfWeek === 0) {
    return {
      isOpen: false,
      message: "Fechado aos Domingos",
      nextScheduleAdvice: "Atendimento de Segunda a Sábado das 11h às 15h. Você já pode agendar sua marmita para Segunda-feira!"
    };
  }

  if (currentTimeInMinutes < openingMinutes) {
    return {
      isOpen: false,
      message: "Cozinha em Preparação (Abre às 11:00)",
      nextScheduleAdvice: "Agende com antecedência para receber seu almoço quentinho sem fila no primeiro horário!"
    };
  }

  return {
    isOpen: false,
    message: "Expediente de Hoje Encerrado",
    nextScheduleAdvice: "Nosso atendimento é das 11h às 15h. Agende seu almoço gourmet para amanhã ou garanta a Feijoada de Sábado!"
  };
}

export function generateWhatsAppMessage(
  order: OrderDetails,
  items: CartItem[],
  deliveryFee: number
): { text: string; url: string } {
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const total = subtotal + (order.deliveryType === 'delivery' ? deliveryFee : 0);

  const lines: string[] = [];
  lines.push(`✨ *PEDIDO NO REQUINTE MARMITEX* ✨`);
  lines.push(`_Marmitas Gourmet da Chefe Ágatha Urbano - Itaquaquecetuba_`);
  lines.push(`----------------------------------------`);
  lines.push(`👤 *Cliente:* ${order.customerName}`);
  lines.push(`📱 *Telefone/WhatsApp:* ${order.phone}`);
  lines.push(``);
  lines.push(`🗓 *AGENDAMENTO DE ALMOÇO:*`);
  lines.push(`🛵 *Tipo:* ${order.deliveryType === 'delivery' ? 'Entrega em Domicílio / Trabalho' : 'Retirada no Balcão'}`);
  lines.push(`📆 *Data:* ${order.deliveryDate}`);
  lines.push(`⏰ *Janela de Horário:* ${order.deliveryTimeSlot}`);
  lines.push(``);

  if (order.deliveryType === 'delivery') {
    lines.push(`📍 *ENDEREÇO DE ENTREGA (ITAQUAQUECETUBA):*`);
    lines.push(`• Bairro: ${order.neighborhood}`);
    lines.push(`• Endereço: ${order.street}, nº ${order.number}`);
    if (order.complement) lines.push(`• Complemento: ${order.complement}`);
    if (order.reference) lines.push(`• Ponto de Referência: ${order.reference}`);
    lines.push(``);
  }

  lines.push(`🍲 *ITENS SELECIONADOS (${items.length}):*`);
  items.forEach((item, idx) => {
    lines.push(`\n*${idx + 1}. ${item.name}*`);
    if (item.size) {
      lines.push(`   ▸ Tamanho: *Marmita ${item.size}*`);
    }
    lines.push(`   ▸ Quantidade: ${item.quantity}x (${formatCurrency(item.unitPrice)} un.)`);
    
    if (item.selectedBase) {
      lines.push(`   ▸ Base: ${item.selectedBase}`);
    }
    if (item.selectedFeijao) {
      lines.push(`   ▸ Feijão: ${item.selectedFeijao}`);
    }
    if (item.selectedComplements && item.selectedComplements.length > 0) {
      lines.push(`   ▸ Guarnições: ${item.selectedComplements.join(', ')}`);
    }
    if (item.selectedSalad) {
      lines.push(`   ▸ Salada: ${item.selectedSalad}`);
    }
    if (item.notes) {
      lines.push(`   ▸ Observações: ${item.notes}`);
    }
    lines.push(`   ▸ Subtotal: ${formatCurrency(item.unitPrice * item.quantity)}`);
  });

  lines.push(``);
  lines.push(`----------------------------------------`);
  lines.push(`💵 *RESUMO FINANCEIRO:*`);
  lines.push(`Subtotal das Marmitas: ${formatCurrency(subtotal)}`);
  if (order.deliveryType === 'delivery') {
    lines.push(`Taxa de Entrega (${order.neighborhood}): ${formatCurrency(deliveryFee)}`);
  } else {
    lines.push(`Taxa de Entrega: Grátis (Retirada)`);
  }
  lines.push(`*VALOR TOTAL: ${formatCurrency(total)}*`);
  lines.push(``);

  const paymentLabels: Record<string, string> = {
    pix: 'PIX (Chave imediata enviada pelo restaurante)',
    cartao_entrega: 'Cartão de Débito/Crédito na Máquina Móvel',
    dinheiro: `Dinheiro em espécie ${order.changeAmount ? `(Troco para ${order.changeAmount})` : '(Sem necessidade de troco)'}`
  };

  lines.push(`💳 *FORMA DE PAGAMENTO:* ${paymentLabels[order.paymentMethod] || order.paymentMethod}`);

  if (order.generalNotes) {
    lines.push(``);
    lines.push(`📝 *OBSERVAÇÃO GERAL:* ${order.generalNotes}`);
  }

  lines.push(``);
  lines.push(`_Aguardando confirmação da cozinha da Chefe Ágatha Urbano. Obrigado pela preferência!_`);

  const rawMessage = lines.join('\n');
  const encoded = encodeURIComponent(rawMessage);
  const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;

  return {
    text: rawMessage,
    url
  };
}
