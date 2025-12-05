import { api } from "./http";

export type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  product_category_id: number;
};
export type ProductResp = {
  ok: boolean;
  product: Product[];
};
export const getProducts = () =>
  api<ProductResp>("/api/products", { method: "GET" });
