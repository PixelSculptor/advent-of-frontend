// Tutaj skopiuj kod zadania
export type JsonSchema = {
    type: string;
    properties?: Record<string, JsonSchema>;
    required?: string[];
    items?: JsonSchema;
    nullable?: boolean;
  };
  
  export const generateSchema = (schemaDefinition: JsonSchema): JsonSchema => {
    // const {type, required} = schemaDefinition
    // const schema: JsonSchema = {type};
    // if(schemaDefinition.type === 'object' && schemaDefinition.properties){

    //     const { properties } = schemaDefinition;

    //     const generateProperties: Record<string, JsonSchema> = {};
    //     for(const [key, value] of Object.entries(properties)){
    //         generateProperties[key] = generateSchema(value);
    //     }
    //     const schema: JsonSchema = {type};

    //     schema.properties = {...generateProperties};


    //     if(required?.length){
    //         schema.required = required;
    //     }
    //     return schema;
    // }else if(type === 'array'){
    //     const {items, nullable} = schemaDefinition;
    //     const schemaItems = items ? generateSchema(items) : {};
    //     schema.items = {
    //         type: 'array',
    //         items: { type: typeof schemaItems[0]}
    //     }
    // }
    return schemaDefinition;
  };
  
  export const validate = (schema: JsonSchema, jsonObject: any): boolean => {
    const requiredProperties = Object.keys(jsonObject);
    if(!schema.required?.every(reqProp => requiredProperties.includes(reqProp))) return false;
    
    return true;
    
};