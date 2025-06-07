import { categories } from "../models/categories";
import { products } from "../models/product";
import { productMeta as productMetaTable } from "../models/productMeta";

type JoinedProductRow = {
    products: typeof products.$inferSelect;
    productMeta: any;
    categories: typeof categories.$inferSelect | null;
  };
  
  type GroupedProduct = typeof products.$inferSelect & {
    meta: Record<string, any> | null;
    categories: typeof categories.$inferSelect[];
  };

  
  export const groupProductRows = (rows: JoinedProductRow[]): GroupedProduct[] => {
    const grouped = new Map<string, GroupedProduct>();
  
    for (const row of rows) {
      const productId = row.products.id;
  
      if (!grouped.has(productId)) {
        grouped.set(productId, {
          ...row.products,
          meta: row.productMeta?.meta ? JSON.parse(row.productMeta.meta) : null,
          categories: [],
        });
      }
  
      if (row.categories) {
        grouped.get(productId)!.categories.push(row.categories);
      }
    }
  
    return Array.from(grouped.values());
  };