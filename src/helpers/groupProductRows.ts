import { categories } from "../models/categories";
import {batches} from "../models/batch";
import { products } from "../models/product";
import { productMeta as productMetaTable } from "../models/productMeta";

type JoinedProductRow = {
    products: typeof products.$inferSelect;
    productMeta: any;
    categories: typeof categories.$inferSelect | null;
    batches: typeof batches.$inferInsert | null;
  };
  
  type GroupedProduct = typeof products.$inferSelect & {
    meta: Record<string, any> | null;
    categories: typeof categories.$inferSelect[];
    batches: typeof batches.$inferInsert[]
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
          batches: []
        });
      }
  
      if (row.categories) {
         grouped.get(productId)!.categories.push(row.categories);
      }
      if (row.batches) {
        grouped.get(productId)!.batches.push(row.batches)
      }
    }
  
    return Array.from(grouped.values());
  };