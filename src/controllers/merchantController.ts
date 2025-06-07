import { Context } from 'hono';
import { getMerchants, setupMerchants, updateMerchant } from '../services/merchantService';
import { SetupMerchant } from '../types';
import { generateUniqueMerchantCode } from '../helpers/generateUniqueMerchantCode';
import { prepareResponse } from '../helpers/response';
import { alias } from 'drizzle-orm/gel-core';

export const getAll = async (c: Context) => {
  try {

    const merchants = await getMerchants();
    return c.json(prepareResponse('success', merchants ));

  } catch (error) {
     console.log('failed to retrieve all merchats',[error]);
     return c.json(prepareResponse('failure', {} ));

  }
};

export const store = async (c: Context) => {

  const requests = await c.req.json<SetupMerchant>();
  console.log('about to store merchants', requests);
  const uuid = crypto.randomUUID() as string;

  try {
    const merchantPayload = {
      ...requests,
      ...{
        id: uuid,
      },
    };
    const merchant = await setupMerchants(merchantPayload);
    return c.json(prepareResponse('success_resource_created', merchant ));
  } catch (error: any) {
    
    console.log('an error occurred creating merchant', [error]);
    if (error.code == 'ER_DUP_ENTRY') {
      return c.json(
        prepareResponse(
          'bad_request',
          {},
           
          'record already exist check your parameter for name or code',
        ),
      );
    }
    return c.json(prepareResponse('failure', {} ));
  }
};

export const update = async (c: Context) => {
  try {

    const requests = await c.req.json<SetupMerchant>();
    const merchantId = c.req.param('id');
    const data = await updateMerchant(merchantId, requests);
    return c.json(prepareResponse('success', data ));

  } catch (error) {
    console.log('an error occurred updating merchants', [error]);
    return c.json(prepareResponse('failure', {} ));
  }
};
