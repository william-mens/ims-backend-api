import {  ZodError, ZodType } from "zod/v4";
 
export function validate<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
     console.log('error failed',result.error);    
    throw new Error(`Validation failed`);
  }
  return result.data;
}
