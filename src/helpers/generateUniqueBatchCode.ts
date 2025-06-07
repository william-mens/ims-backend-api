import { getMerchantById } from "../services/merchantService";
import {customAlphabet} from 'nanoid'

const generateRandomCode = (alias: string): string => {
    let code = '';

    const safeAlphabet = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    const shortdate = compactDate();

    const generateId = customAlphabet(safeAlphabet, 8);
    code = `${alias}${shortdate}${generateId()}`;

    return code;
};

  function compactDate(date = new Date()) {
    return date.toISOString().slice(2, 10).replace(/-/g, '');
  }


  export const generateUniqueBatchCode = async (merchantId: string): Promise<string> => {
      let code: string;
      let exists: boolean;
      do {
          const result = await getMerchantById(merchantId);
          if (!result) {
              throw new Error(`merchantId does not exist cant generate a batchCode`);
          }
          const { alias } = result;

          code = generateRandomCode(alias);
          exists = alias === code ? true : false;
      } while (exists);

      return code;
  };