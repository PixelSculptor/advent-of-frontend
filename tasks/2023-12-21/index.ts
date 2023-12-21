interface Injectable<T> {
    new (): T;
  }
  
  export class FactoryInjector {
    private classRegistry: Record<string, Injectable<any>> = {};
    private valueRegistry: Record<string, any> = {};
  
    registerClass<T>(classRef: Injectable<T>): void {
      this.classRegistry[classRef.name] = classRef;
    }
  
    get<T>(token: Injectable<T> | InjectionToken<T>): T {
        if (token instanceof InjectionToken) {
            const injectionToken = token as InjectionToken<T>;
            const dynamicProperty = injectionToken.getDynamicProperty('value');
            if (typeof dynamicProperty === 'string' && dynamicProperty in this.valueRegistry) {
              return this.valueRegistry[dynamicProperty];
            } else {
              throw new Error(`Value for ${token.constructor.name} not found`);
            }
        }
  
      const classRef = this.classRegistry[token.name];
      if (!classRef) {
        throw new Error(`Class ${token.name} is not registered`);
      }
  
      const instance = new classRef();
      return instance;
    }
  
    provideValue<T>(token: InjectionToken<T>, value: T): void {
        const dynamicProperty = token.getDynamicProperty('value') as string;
        if (dynamicProperty !== null) {
          this.valueRegistry[dynamicProperty] = value;
        }
      }
  }
  
  export class InjectionToken<T> {
    private properties: Record<string, T | null> = {};
  
    constructor(keyName: string) {
      this.properties[keyName] = null;
    }
  
    setDynamicProperty(key: string, value: T): void {
      this.properties[key] = value;
    }
  
    getDynamicProperty(key: string): T | null {
      return this.properties[key];
    }
  }