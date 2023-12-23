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
      if(schema.type !== typeof jsonObject) return false;
      if(schema.properties){
          const {properties} = schema;
          for(const [key, value] of Object.entries(properties)){
              if(key in jsonObject){
                  if(value.type === 'array'){
                      if(value.nullable){
                          return jsonObject[key].every((item: unknown) => typeof item === value.type || item === null);
                      }
                  }
                  if(value.nullable){
                      return (typeof jsonObject[key] === value.type || jsonObject[key] === null);
                  }
              }
          }
      }
      const requiredProperties = Object.keys(jsonObject);
      if(!schema.required?.every(reqProp => requiredProperties.includes(reqProp))) return false;
      
      return true;
      
  };