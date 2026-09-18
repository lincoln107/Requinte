import { MenuItem, SizeOption, NeighborhoodInfo } from '../types';
import heroMarmitaImg from '../assets/images/hero_gourmet_marmita_1789773140527.jpg';
import feijoadaImg from '../assets/images/feijoada_gourmet_1789773150675.jpg';

export const RESTAURANT_INFO = {
  name: "Requinte Marmitex",
  tagline: "Alta Gastronomia Caseira & Marmitas Gourmet",
  chef: "Chefe Ágatha Urbano",
  city: "Itaquaquecetuba - SP",
  fullAddress: "Av. Emancipação, 620 - Centro, Itaquaquecetuba - SP",
  whatsappNumber: "5511998765432",
  formattedPhone: "(11) 99876-5432",
  openingHours: "Segunda a Sábado, das 11h às 15h",
  openingDaysText: "Segunda a Sábado",
  saturdaySpecial: "Feijoada Gourmet Completa",
  openingHourStart: 11,
  openingHourEnd: 15,
};

export const SIZES_DATA: SizeOption[] = [
  {
    id: 'P',
    name: 'Marmita P (Individual Leve)',
    weight: 'Aprox. 450g',
    serves: '1 pessoa com apetite moderado ou refeição leve balanceada',
    description: '1 porção de proteína nobre grelhada ou ao molho, arroz, feijão, 1 guarnição à sua escolha e salada fresca selecionada.',
    badge: 'Equilibrada & Leve',
    recommendedFor: 'Ideal para quem busca leveza no meio do expediente sem abrir mão do sabor artesanal.'
  },
  {
    id: 'M',
    name: 'Marmita M (Executivo Requinte)',
    weight: 'Aprox. 680g',
    serves: '1 pessoa com apetite generoso (Nossa mais pedida!)',
    description: 'Porção caprichada de proteína nobre, arroz soltinho, feijão com tempero da chefe, até 2 guarnições e potinho de salada fresca.',
    badge: 'Mais Pedida ⭐',
    recommendedFor: 'Perfeita para o almoço completo de trabalho e energia para a tarde toda.'
  },
  {
    id: 'G',
    name: 'Marmita G (Apetite Gourmet / Família)',
    weight: 'Aprox. 920g',
    serves: 'Serve com fartura 1 pessoa de grande apetite ou até 2 pessoas para compartilhar',
    description: 'Fartura de proteína nobre, porções generosas de arroz e feijão, até 3 guarnições e salada completa em embalagem térmica especial.',
    badge: 'Super Farta',
    recommendedFor: 'Para quem adora um prato cheio de respeito ou deseja dividir a dois com conforto.'
  }
];

export const BASE_SIDES = {
  bases: [
    "Arroz Branco Soltinho ao Alho",
    "Arroz Integral com Ervas Finas",
    "Arroz com Brócolis Fresco"
  ],
  feijoes: [
    "Feijão Carioca Caldo Caseiro (Louro & Alho)",
    "Feijão Preto Temperado",
    "Feijão Tropeiro Tradicional (+R$ 3,00)"
  ],
  complements: [
    "Farofa Crocante de Bacon Artesanal",
    "Batatas Rústicas Douradas no Alecrim",
    "Legumes Salteados na Manteiga de Garrafa",
    "Purê de Mandioquinha Aveludado",
    "Mandioca Frita Crocante",
    "Banana da Terra Grelhada"
  ],
  salads: [
    "Salada Fresca Requinte (Mix de folhas, tomate cereja e cenoura ralada)",
    "Salada Caesar com Parmesão e Croutons",
    "Vinagrete Tradicional Fresco da Chefe",
    "Sem salada (Mais guarnição)"
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'feijoada-sabado',
    name: 'Feijoada Gourmet Completa da Chefe Ágatha',
    category: 'especial_sabado',
    isFeijoada: true,
    isChefSpecial: true,
    availableDays: ['Sáb'],
    description: 'O prato nobre dos nossos sábados em Itaquaquecetuba! Feita com carnes selecionadas: costelinha defumada, paio artesanal, lombo macio e carne seca desfiada. Acompanha arroz branquinho, couve à mineira refogada no alho, farofa crocante de bacon, vinagrete e laranjas frescas.',
    image: feijoadaImg,
    prices: {
      P: 31.90,
      M: 39.90,
      G: 49.90
    },
    sidesOptions: {
      bases: ["Arroz Branco Soltinho", "Arroz Integral"],
      feijoes: ["Caldo de Feijoada Completo com Carnes Nobres"],
      complements: [
        "Couve à Mineira no Alho Dourado",
        "Farofa Crocante de Bacon Artesanal",
        "Laranjas Frescas Fatiadas",
        "Torresmo Pururuca Crocante (+R$ 4,00)"
      ],
      salads: [
        "Vinagrete Especial da Chefe Ágatha",
        "Salada de Folhas Frescas",
        "Sem vinagrete"
      ]
    }
  },
  {
    id: 'parmegiana-mignon',
    name: 'Parmegiana de Filé ao Sugo Rústico',
    category: 'classicos',
    isChefSpecial: true,
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Bife empanado à perfeição, coberto com molho de tomates frescos da Chefe Ágatha aromatizado com manjericão e gratinado com queijo muçarela derretido. Acompanha batata rústica ou purê.',
    image: heroMarmitaImg,
    prices: {
      P: 29.90,
      M: 38.90,
      G: 48.90
    },
    sidesOptions: BASE_SIDES
  },
  {
    id: 'picanha-alho-dourado',
    name: 'Picanha Nobre Grelhada com Alho Dourado',
    category: 'pratos_dia',
    isChefSpecial: true,
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Cortes nobres de picanha marinada com chimichurri fresco e finalizada na chapa bem quente com chips de alho dourado e manteiga de ervas. Sabor irresistível e maciez incomparável.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    prices: {
      P: 33.90,
      M: 43.90,
      G: 54.90
    },
    sidesOptions: BASE_SIDES
  },
  {
    id: 'strogonoff-gourmet',
    name: 'Strogonoff Gourmet de Filé com Batata Palha Rústica',
    category: 'classicos',
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Tiras macias de filé em creme suave com toque de mostarda Dijon, conhaque flambado e cogumelos frescos Paris fatiados. Acompanha batata palha artesanal ultra crocante feita na casa.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    prices: {
      P: 27.90,
      M: 35.90,
      G: 45.90
    },
    sidesOptions: BASE_SIDES
  },
  {
    id: 'costelinha-barbecue-goiabada',
    name: 'Costelinha Suína ao Barbecue Artesanal de Goiabada',
    category: 'pratos_dia',
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Costelinha assada lentamente no forno por 6 horas até desmanchar. Glaciada com molho barbecue autoral de goiabada cascão e pimenta biquinho, agridoce na medida certa.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    prices: {
      P: 28.90,
      M: 36.90,
      G: 46.90
    },
    sidesOptions: BASE_SIDES
  },
  {
    id: 'frango-ervas-finas',
    name: 'Frango Dourado com Ervas Finas e Limão Siciliano',
    category: 'pratos_dia',
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Filé de peito ou sobrecoxa desossada marinada por 24h em infusão de tomilho, alecrim, azeite extravirgem e raspas de limão siciliano. Suculento, aromático e dourado.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    prices: {
      P: 23.90,
      M: 30.90,
      G: 39.90
    },
    sidesOptions: BASE_SIDES
  },
  {
    id: 'salmao-crosta-castanhas',
    name: 'Salmão Grelhado com Crosta de Castanhas do Pará',
    category: 'gourmet_fit',
    isFit: true,
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Posta nobre de salmão fresco selada na manteiga ghee, coberta com crosta crocante de castanhas e ervas frescas. Servido com mix de legumes grelhados e arroz integral.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    prices: {
      P: 34.90,
      M: 45.90,
      G: 58.90
    },
    sidesOptions: {
      bases: ["Arroz Integral com Ervas", "Arroz Branco Soltinho", "Sem arroz (Dobro de Legumes)"],
      feijoes: ["Feijão Carioca sem gordura", "Sem feijão"],
      complements: [
        "Legumes Salteados no Azeite Extravirgem",
        "Purê de Mandioquinha",
        "Brócolis e Cenoura ao Vapor",
        "Batata Doce Rústica Assada"
      ],
      salads: [
        "Mix de Folhas Verdes com Tomate Cereja",
        "Salada Especial com Sementes",
        "Sem salada"
      ]
    }
  },
  {
    id: 'picadinho-carioca-chefe',
    name: 'Picadinho de Carne Nobre da Chefe com Banana Frita',
    category: 'classicos',
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Cubos macios de alcatra cozidos lentamente em molho aveludado de cerveja preta e especiarias. Acompanha farofa de ovos, banana da terra frita e arroz soltinho.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    prices: {
      P: 26.90,
      M: 34.90,
      G: 43.90
    },
    sidesOptions: BASE_SIDES
  },
  {
    id: 'fit-frango-mandioquinha',
    name: 'Combo Fit: Peito de Frango com Purê de Mandioquinha & Brócolis',
    category: 'gourmet_fit',
    isFit: true,
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Opção leve e nutritiva sem perder o toque gourmet da Chefe Ágatha. Peito de frango grelhado suculento, purê de mandioquinha sem lactose e brócolis ninja refogado.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prices: {
      P: 24.90,
      M: 31.90,
      G: 39.90
    },
    sidesOptions: {
      bases: ["Arroz Integral com Quinoa", "Arroz Branco", "Sem arroz (Dobro de Legumes)"],
      feijoes: ["Feijão Carioca Leve", "Sem feijão"],
      complements: [
        "Purê de Mandioquinha Aveludado",
        "Brócolis Ninja ao Alho Suave",
        "Cenoura Glaciada no Azeite",
        "Batata Doce Assada com Alecrim"
      ],
      salads: [
        "Salada Requinte Fresca com Azeite de Ervas",
        "Sem salada"
      ]
    }
  },
  {
    id: 'pudim-leite-ninho',
    name: 'Pudim de Leite Condensado da Chefe com Fava de Baunilha',
    category: 'bebidas_sobremesas',
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Textura aveludada lisinha sem furinhos, calda de caramelo dourado brilhante e infusão autêntica de baunilha. Sobremesa artesanal individual em pote lacrado.',
    image: 'https://images.unsplash.com/photo-1514944298352-f472251a243c?auto=format&fit=crop&w=800&q=80',
    prices: {
      single: 12.00
    }
  },
  {
    id: 'mousse-maracuja-trufado',
    name: 'Mousse de Maracujá com Ganache Meio Amargo',
    category: 'bebidas_sobremesas',
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Camadas de mousse aerado feito com a polpa da fruta fresca e uma camada generosa de ganache de chocolate 54% cacau. Uma explosão de sabores.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    prices: {
      single: 13.00
    }
  },
  {
    id: 'suco-natural-fruta',
    name: 'Suco Natural da Fruta 500ml',
    category: 'bebidas_sobremesas',
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Preparado na hora com frutas frescas selecionadas: Laranja espremida, Abacaxi com hortelã fresca, Maracujá concentrado ou Limonada Suíça.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    prices: {
      single: 9.90
    }
  },
  {
    id: 'refrigerante-lata',
    name: 'Refrigerante em Lata 350ml (Gelado)',
    category: 'bebidas_sobremesas',
    availableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    description: 'Coca-Cola Original, Coca-Cola Zero Açúcar, Guaraná Antarctica ou Guaraná Zero. Entregue geladinho.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    prices: {
      single: 6.50
    }
  }
];

export const NEIGHBORHOODS_ITAQUA: NeighborhoodInfo[] = [
  { name: 'Centro de Itaquaquecetuba', fee: 5.00, deliveryTime: '25-35 min' },
  { name: 'Vila Virgínia', fee: 5.00, deliveryTime: '25-35 min' },
  { name: 'Vila Monte Belo', fee: 6.00, deliveryTime: '30-40 min' },
  { name: 'Rancho Grande', fee: 6.00, deliveryTime: '30-40 min' },
  { name: 'Aracaré', fee: 7.00, deliveryTime: '30-45 min' },
  { name: 'Manoel Feio', fee: 7.00, deliveryTime: '30-45 min' },
  { name: 'Piratininga', fee: 8.00, deliveryTime: '35-45 min' },
  { name: 'Jardim Odete', fee: 7.00, deliveryTime: '30-45 min' },
  { name: 'Vila São Carlos', fee: 6.00, deliveryTime: '30-40 min' },
  { name: 'Jardim Caiuby', fee: 8.00, deliveryTime: '35-50 min' },
  { name: 'Terra Prometida', fee: 8.00, deliveryTime: '35-50 min' },
  { name: 'Jardim Louzada', fee: 7.00, deliveryTime: '30-45 min' },
  { name: 'Pequeno Coração', fee: 8.00, deliveryTime: '35-50 min' },
  { name: 'Rio Abaixo', fee: 9.00, deliveryTime: '40-55 min' },
  { name: 'Outro Bairro em Itaquaquecetuba', fee: 8.00, deliveryTime: '35-50 min' }
];

export const TIME_SLOTS = [
  "11:00 às 11:30 (Primeira Rodada)",
  "11:30 às 12:00 (Almoço Executivo)",
  "12:00 às 12:30 (Horário Nobre)",
  "12:30 às 13:00 (Almoço Padrão)",
  "13:00 às 13:30 (Tarde)",
  "13:30 às 14:00 (Tarde)",
  "14:00 às 14:30 (Última Rodada)",
  "14:30 às 15:00 (Encerramento do Dia)"
];

export const TESTIMONIALS = [
  {
    name: "Dr. Marcelo Siqueira",
    role: "Advogado no Centro de Itaquaquecetuba",
    text: "O Requinte Marmitex mudou a rotina do meu escritório. A comida vem com apresentação impecável, quente na embalagem térmica selada e o tempero da Chefe Ágatha é de restaurante cinco estrelas!",
    rating: 5,
    marmita: "Tamanho M - Parmegiana ao Sugo Rústico"
  },
  {
    name: "Patrícia Menezes",
    role: "Gerente Administrativa em Manoel Feio",
    text: "Agendamos o almoço da nossa equipe toda semana às 11h45 e chega com pontualidade suíça. A feijoada de sábado é sagrada na minha casa, carne nobre de verdade sem gordura excessiva.",
    rating: 5,
    marmita: "Tamanho G - Feijoada Gourmet Completa"
  },
  {
    name: "Carlos Eduardo Ribeiro",
    role: "Morador de Vila Virgínia",
    text: "Pedi o tamanho G para dividir com minha esposa e sobrou comida! Fartura, qualidade de ingredientes e a praticidade de pedir pelo WhatsApp com horário marcado é sensacional.",
    rating: 5,
    marmita: "Tamanho G - Picanha Nobre Grelhada"
  }
];
