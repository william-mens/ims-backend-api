import { MiddlewareHandler } from "hono";
import { prettifyError, treeifyError, ZodType } from "zod/v4";
import { prepareResponse } from "../helpers/response";

type ValidationTargets = 'json'| 'query' | 'param'

export function zodValidator<T>(
    schema: ZodType<T>,
    target: ValidationTargets = 'json'
  ): MiddlewareHandler {
    return async (c, next) => {
      let data: unknown
  
      switch (target) {
        case 'json':
          data = await c.req.json()
          break
        case 'query':
          data = c.req.query()
          break
        case 'param':
          data = c.req.param()
          break
        default:
          throw new Error('Unsupported validation target')
      }
  
      const result = schema.safeParse(data)
  
      if (!result.success) {
        const errors: string[] = result.error.issues.map((issue) => {
            const fieldPath = issue.path.join('.'); 
            return `${fieldPath} ${issue.message}`;
          });
        
          console.error('Validation error:', errors);
        
          return c.json(prepareResponse('bad_request', errors ));
      }
  
      c.set('validatedData', result.data)
      await next()
    }
  }