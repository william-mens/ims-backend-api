import { Context } from 'hono';
import { getCatetories, setupCategory, updateCategory } from '../services/productCategoriesService';
import { ProductCategory } from '../types';
import { prepareResponse } from '../helpers/response';

export const getAll = async (c: Context) => {
    try {

        const merchantId = c.req.param('merchantId');
        const params = c.req.query();

        const requests: ProductCategory = {
            id: params?.productId,
            name: params?.name,
            description: params?.description,
            merchantId: merchantId
        };

        const merchants = await getCatetories(requests);
        return c.json(prepareResponse('success', merchants ));
    } catch (error) {
        
        console.log('an error occurred retrieving product categories', [error]);
        return c.json(prepareResponse('failure', {} ));
    }
};

export const store = async (c: Context) => {
  
   const requests = await c.req.json<ProductCategory>();
   console.log('about to create product category', requests);
   const uuid = crypto.randomUUID() as string;

  try {

    const categoryPayload = {
      ...requests,
      ...{
        id: uuid
      },
    };
    const category = await setupCategory(categoryPayload);
    console.log('response from setting up category',category);
    
    return c.json(prepareResponse('success_resource_created', category ));
  } catch (error: any) {
    console.log('an error occurred creating product category', [error]);
    if (error.code == 'ER_DUP_ENTRY') {
      return c.json(
        prepareResponse(
          'bad_request',
          {},
           
          'record already exist check your parameter for name',
        ),
      );
    }
    return c.json(prepareResponse('failure', {} ));
  }
};

export const update = async (c: Context) => {
    try {
      const body = await c.req.json<ProductCategory>();
      const merchantId = c.req.param('merchantId');
  
      console.log(`Updating product category for merchant ${merchantId}`, body);
  
      const { id, ...rest } = body;
      const updated = await updateCategory(id as string, rest, merchantId);
  
      return c.json(prepareResponse('success', updated ));
    } catch (error) {
      console.error('Error updating product category:', error);
      return c.json(prepareResponse('failure', {} ));
    }
  };