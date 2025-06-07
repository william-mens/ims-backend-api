import { Context } from 'hono';
import { getProducts, setupProducts, updateProduct } from '../services/productService';
import { filterProduct, Product } from '../types';
import { prepareResponse } from '../helpers/response';


export const getAll = async (c: Context) => {
    try {
      const merchantId = c.req.param('merchantId');
      const params = c.req.query();
  
      const filters: filterProduct = {
        name: params?.name,
        merchantId,
        productId: params?.productId,
        categoryId: params?.categoryId,
      };
  
      const products = await getProducts(filters);
      return c.json(prepareResponse('success', products ));
    } catch (error) {
      console.error('Error retrieving products:', error);
      return c.json(prepareResponse('failure', {} ));
    }
  };


export const store = async (c: Context) => {
    try {
        const merchantId = c.req.param('merchantId');
        console.log('All Params:', c.req.param());

        if (!merchantId || merchantId.trim() === '' || merchantId === ':merchantId') {
            return c.json(
                prepareResponse(
                    'bad_request',
                    {},
                     
                    'merchantId is required. Kindly check your parameters.',
                ),
            );
        }

        const body = await c.req.json<Product>();
        const uuid = crypto.randomUUID();
        const { meta, ...data } = body;

        const productPayload = {
            ...data,
            id: uuid,
            merchantId: merchantId,
        };

        const response = await setupProducts(productPayload, meta);
        if (!response) {
            return c.json(
                prepareResponse(
                    'bad_request',
                    {},
                     
                    'merchantId does not exist. Kindly check your parameters.',
                ),
            );
        }

        return c.json(prepareResponse('success_resource_created', response ));
    } catch (error: any) {
        console.error('Error creating product:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return c.json(
                prepareResponse(
                    'bad_request',
                    {},
                     
                    'Record already exists. Check your merchantId.',
                ),
            );
        }

        return c.json(prepareResponse('failure', {} ));
    }
};

export const update = async (c: Context) => {
    try {
      const body = await c.req.json<Product>();
      const merchantId = c.req.param('merchantId');
  
      const { meta, ...rest } = body;
      const updated = await updateProduct({ ...rest, merchantId }, meta);
  
      return c.json(prepareResponse('success', updated ));
    } catch (error) {
      console.error('Error updating product:', error);
      return c.json(prepareResponse('failure', {} ));
    }
  };