// Tutaj skopiuj kod zadania
export type JsonSchema = {
    type: string;
    properties?: Record<string, JsonSchema>;
    required?: string[];
    items?: JsonSchema;
    nullable?: boolean;
  };
  
  export const generateSchema = (schemaDefinition: JsonSchema): JsonSchema => {
    return schemaDefinition;
  };
  
  export const validate = (schema: JsonSchema, jsonObject: any): boolean => {
    return true;
  };