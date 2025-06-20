import { getDb } from '../db';
import { products } from '../models/product';
import { productMeta as productMetaTable } from '../models/productMeta';
import { categories } from '../models/categories';
import { getMerchantById } from './merchantService';
import { generateUniqueSKU } from '../helpers/generateUniqueSku';
import { eq, and, like } from 'drizzle-orm';
import { filterProduct, Product } from '../types';
import { productCategories } from '../models/productCategories';
import { productStockLogs } from '../models/productStockLog';
import { groupProductRows } from '../helpers/groupProductRows';
import {imageUpload} from '../helpers/aws';
import { batches } from '../models/batch';

export const getProducts = async (query: filterProduct) => {
  const db = await getDb();

  const whereConditions = [eq(products.merchantId, query.merchantId!)];
  if (query.name) whereConditions.push(like(products.name, `%${query.name}%`));
  if (query.productId) whereConditions.push(eq(products.id, query.productId));
  if (query.categoryId) whereConditions.push(eq(categories.id, query.categoryId));



  const result = await db
    .select({
        products: products,
        productMeta:productMetaTable,
        categories:categories
    })
    .from(products)
    .leftJoin(productMetaTable, eq(products.id, productMetaTable.productId)) 
    .leftJoin(batches, eq(batches.productId, productMetaTable.productId)) 
    .leftJoin(productCategories, eq(products.id, productCategories.productId))
    .leftJoin(categories, eq(productCategories.categoryId, categories.id))
    .where(and(...whereConditions));
    
    return groupProductRows(result);
};

export const setupProducts = async (
  data: Product,
  meta?: JSON
) => {
  const db = await getDb();

  const sku = await generateUniqueSKU({
    categoryId: data.categories[0],
    name: data.name,
    price: data.price,
  });
  

  const productPayload = {
    id: data.id,
    merchantId: data.merchantId,
    name: data.name,
    logo: data?.logo,
    description: data.description,
    price: data.price,
    sku,
    quantity: data.quantity ?? 0
  };

  if (productPayload.logo) {
     let productUrl =  await imageUpload(productPayload.logo,productPayload.id);
     productPayload.logo = productUrl
  }


  await db.transaction(async (tx) => {
    await tx.insert(products).values(productPayload);

    if (meta) {
      await tx.insert(productMetaTable).values({
        productId: data.id,
        meta: JSON.stringify(meta),
      });
    }

    for (const categoryId of data.categories) {
      await tx.insert(productCategories).values({
        productId: data.id,
        categoryId: categoryId,
      });
    }

    if (data.quantity && data.quantity > 0) {
      await tx.insert(productStockLogs).values({
        id: crypto.randomUUID(),
        productId: data.id,
        quantity: data.quantity,
        type: 'initial',
        remarks: 'Initial product stock',
      });
    }
  });

  return await getProductById(data.merchantId, data.id);
};

export const updateProduct = async (updates: Product, meta?: JSON) => {
   console.log('received request to upate Product',updates,meta);
   
    const db = await getDb();

    if (updates.logo) {
        let productUrl = await imageUpload(updates.logo, updates.id);
        updates.logo = productUrl;
    }
    await db.transaction(async (tx) => {
        await tx
            .update(products)
            .set(updates)
            .where(and(eq(products.id, updates.id!), eq(products.merchantId, updates.merchantId!)));

        if (meta) {
            await tx
                .update(productMetaTable)
                .set({ meta: JSON.stringify(meta) })
                .where(eq(productMetaTable.productId, updates.id!));
        }

        if (updates.categories && Array.isArray(updates.categories)) {
            for (const categoryId of updates.categories) {
                await tx
                    .delete(productCategories)
                    .where(
                        and(
                            eq(productCategories.categoryId, categoryId),
                            eq(productCategories.productId, updates.id ),
                        ),
                    );

                await tx.insert(productCategories).values({
                    categoryId: categoryId,
                    productId: updates.id
                });
            }
        }
    });

    return await getProductById(updates.merchantId!, updates.id!);
};


export const getProductById = async (merchantId: string, productId: string) => {
  const db = await getDb();

  type JoinedProductRow = {
    product: typeof products.$inferSelect;
    productMeta: any;
    category: typeof categories.$inferSelect | null;
  };

  const result:JoinedProductRow[] = await db
    .select({
      product: products,
      productMeta: productMetaTable,
      category: categories,
    })
    .from(products)
    .leftJoin(productMetaTable, eq(products.id, productMetaTable.productId))
    .leftJoin(productCategories, eq(products.id, productCategories.productId))
    .leftJoin(categories, eq(productCategories.categoryId, categories.id))

    .where(and(eq(products.merchantId, merchantId), eq(products.id, productId)));

    if (!result.length) return null;

  const { product, productMeta } = result[0];
  const categoryList = result
    .map((r) => r.category)
    .filter((cat) => cat && cat.id !== undefined);

  return {
    ...product,
    meta: productMeta?.meta ? JSON.parse(productMeta.meta) : null,
    categories: categoryList
  };
    

 // return toCamelCase(record)
};

