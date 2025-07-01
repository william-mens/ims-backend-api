import { getDb } from '../db';
import { categories } from '../models/categories';
import { eq,and } from 'drizzle-orm';

export const getCatetories = async (
    query: Partial<typeof categories.$inferSelect>,
) => {
    const db = await getDb();

    const result = await db
        .select()
        .from(categories)
        .where(eq(categories.merchantId, query.merchantId as string));
    return result;
};

export const setupCategory = async (data: typeof categories.$inferInsert) => {
    console.log('about to create a category', data);
    const db = await getDb();
    const result = await db.insert(categories).values(data);
    console.log('response from creating a category from db', result);
    return await getCategoryById(data.id);
};

// product.service.ts
export const updateCategory = async (
    id: string,
    updates: Partial<Omit<typeof categories.$inferInsert, 'id' | 'merchantId'>>,
    merchantId: string,
  ) => {
    const db = await getDb();
  
    const result = await db
      .update(categories)
      .set(updates)
      .where(
        and(
          eq(categories.id, id),
          eq(categories.merchantId, merchantId)
        )
      );
  
    console.log(`Updated category result:`, result);
  
    return await getCategoryById(id);
  };


 const getCategoryById = async (id: string) => {
  const db = await getDb()

  const result = await db.select().from(categories).where(eq(categories.id, id));
  console.log('response from querying from the db',result);

  return result[0];
};