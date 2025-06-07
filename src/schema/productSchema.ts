import { string, z } from "zod/v4";

const meta = z.object({

})


export const ProductSchema = z.object({
    id: z.string(),
    name: z.string().max(100).trim(),
    categories: z.array(z.string()),
    description: z.string().trim(),
    price: z.number().positive(),
    sku: z.string(),
    meta: meta
  });

  
  export const CreateProductSchema = ProductSchema.omit({ id: true, sku: true,meta:true });
  
  export const UpdateProductSchema = ProductSchema.partial();
