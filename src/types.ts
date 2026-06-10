export interface MenuItem {
  id: string;
  name: string;
  category: 'cakes' | 'cheesecakes' | 'brownies' | 'desserts' | 'ice-cream' | 'waffles' | 'coffee' | 'mocktails' | 'platters';
  price: number;
  description: string;
  rating: number;
  image: string; // Unsplash URLs and fallbacks
  isSignature?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  price?: number;
  discount?: string;
  timing?: string;
  description: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface ReservationData {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface OrderData {
  id: string;
  items: CartItem[];
  subtotal: number;
  gst: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: 'UPI' | 'Card';
  status: 'pending' | 'preparing' | 'dispatched' | 'delivered';
  timestamp: string;
}
