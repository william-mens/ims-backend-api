  import { z } from "zod/v4";

  export const ProductCategoriesSchema = z.object({
    id: z.string(),
    merchantId: z.string().max(36),
    name: z.string().max(100).trim(),
    description: z.string().trim(),
  });
  
  export const CreateProductCategorySchema = ProductCategoriesSchema.omit({ id: true});
  
  export const UpdateProductCategorySchema = ProductCategoriesSchema.partial();
