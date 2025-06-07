export function toCamelCase(input: any): any {
    if (Array.isArray(input)) {
      return input.map(toCamelCase)
    }
  
    if (input !== null && typeof input === 'object') {
      return Object.entries(input).reduce((acc, [key, value]) => {
        const camelKey = key.replace(/_([a-z])/g, (_, g) => g.toUpperCase())
        acc[camelKey] = toCamelCase(value)
        return acc
      }, {} as Record<string, any>)
    }
  
    return input
  }