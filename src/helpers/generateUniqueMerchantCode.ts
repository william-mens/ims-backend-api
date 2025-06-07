import { getDb } from '../db';
import { merchants } from '../models/merchant';
import { eq } from 'drizzle-orm'; 


const generateRandomCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) {
      const randIndex = Math.floor(Math.random() * chars.length);
      code += chars[randIndex];
    }
    return code;
  };

  export const generateUniqueMerchantCode = async (): Promise<string> => {
    let code: string;
    let exists: boolean;
    const db = await getDb();
  
    do {
      code = generateRandomCode();
  
      const result = await db
        .select()
        .from(merchants)
        .where(eq(merchants.code, code))
        .limit(1);
  
      exists = result.length > 0;
    } while (exists);
  
    return code;
  };