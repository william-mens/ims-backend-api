import { getDb } from '../db';
import { merchants } from '../models/merchant';
import { eq } from 'drizzle-orm';

export const getMerchants = async () => {
  const db = await getDb();
  const result = await db.select().from(merchants);
  return result;
};

export const setupMerchants = async (data:typeof merchants.$inferInsert) => {
    console.log('data payload for merchants',data);
    const db = await getDb();
   const result =  await db.insert(merchants).values(data);
   console.log('final output for result',result);

    return await getMerchantById(data.id);
}

export const updateMerchant = async (id: string, data: Partial<typeof merchants.$inferInsert>) => {
  console.log('updating merchant data',data);
  
  const db = await getDb()
  const result = await db
    .update(merchants)
    .set(data)
    .where(eq(merchants.id, id))
  console.log('result from updating merchats',result);
  return await getMerchantById(id);
  
  
};


 export const getMerchantById = async (id: string) => {
  const db = await getDb()
  console.log('id recieved from merchant',id);
  

  const result = await db.select().from(merchants).where(eq(merchants.id, id));
  console.log('results form select',result);

  return result[0];
};