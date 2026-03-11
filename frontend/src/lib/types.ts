export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  products_count: number;
};

export type Product = {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  discount_percent: number;
  rating: number;
  stock: number;
  image_url: string;
  is_featured: boolean;
  category: Category;
};

export type CartItem = {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  product: Product;
};

export type Cart = {
  id: number;
  guest_token: string;
  items: CartItem[];
};

export type Payment = {
  id: number;
  guest_token: string;
  payment_method: "upi" | "card" | "cod";
  amount: string;
  status: string;
  transaction_ref: string;
  created_at: string;
};

export type DashboardSummary = {
  products_count: number;
  featured_products_count: number;
  low_stock_products_count: number;
  active_carts_count: number;
  contact_messages_count: number;
};

export type DashboardData = {
  summary: DashboardSummary;
  latest_contacts: Array<{
    id: number;
    name: string;
    email: string;
    subject: string;
    created_at: string;
  }>;
};
