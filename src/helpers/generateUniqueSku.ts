import { getDb } from '../db';
import { products } from '../models/product';
import { categories } from '../models/categories';
import { eq } from "drizzle-orm";

interface SKUInput {
  categoryId: string;
  name: string;
  price: string;
}

export async function generateUniqueSKU({ categoryId, name, price }: SKUInput): Promise<string> {
  const db = await getDb();

  const [category] = await db
    .select({ name: categories.name })
    .from(categories)
    .where(eq(categories.id, categoryId))
    .limit(1);

  if (!category) {
    throw new Error('Invalid categoryId. Category not found.');
  }

  const catPrefix = category.name.substring(0, 3).toUpperCase();
  const prodPrefix = name.substring(0, 3).toUpperCase();
  const pricePart = Math.floor(Number(price)).toString();

  let sequence = 1;
  let sku = '';
  let exists = true;

  while (exists) {
    const paddedSeq = sequence.toString().padStart(4, '0');
    sku = `${catPrefix}-${prodPrefix}-${pricePart}-${paddedSeq}`;

    const [existing] = await db
      .select({ sku: products.sku })
      .from(products)
      .where(eq(products.sku, sku))
      .limit(1);

    if (!existing) {
      exists = false;
    } else {
      sequence++;
    }

    if (sequence > 9999) {
      throw new Error('SKU sequence overflow. Cannot generate unique SKU.');
    }
  }

  return sku;
}
