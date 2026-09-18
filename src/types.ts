export type MarmitaSize = 'P' | 'M' | 'G';

export interface SizeOption {
  id: MarmitaSize;
  name: string;
  weight: string;
  serves: string;
  description: string;
  badge: string;
  recommendedFor: string;
}

export type MenuCategory = 
  | 'todos' 
  | 'especial_sabado' 
  | 'pratos_dia' 
  | 'classicos' 
  | 'gourmet_fit' 
  | 'bebidas_sobremesas';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  image: string;
  prices: {
    P?: number;
    M?: number;
    G?: number;
    single?: number;
  };
  isFeijoada?: boolean;
  isChefSpecial?: boolean;
  isFit?: boolean;
  availableDays: string[]; // e.g. ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] or ['Sáb']
  sidesOptions?: {
    bases: string[];
    feijoes: string[];
    complements: string[];
    salads: string[];
  };
}

export interface CartItem {
  cartItemId: string;
  menuItemId: string;
  name: string;
  size?: MarmitaSize;
  unitPrice: number;
  quantity: number;
  selectedBase?: string;
  selectedFeijao?: string;
  selectedComplements?: string[];
  selectedSalad?: string;
  notes?: string;
  image: string;
  isFeijoada?: boolean;
}

export interface NeighborhoodInfo {
  name: string;
  fee: number;
  deliveryTime: string;
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  deliveryType: 'delivery' | 'retirada';
  deliveryDate: string;
  deliveryTimeSlot: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  reference: string;
  paymentMethod: 'pix' | 'cartao_entrega' | 'dinheiro';
  changeAmount?: string;
  generalNotes: string;
}
