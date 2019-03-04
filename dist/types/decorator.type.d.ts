export declare type ClassDecorator = (constructor: Function) => void | any;
export declare type MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void | PropertyDescriptor;
export declare type AccessorDecorator = MethodDecorator;
export declare type PropertyDecorator = (target: any, propertyKey: string) => void | any;
export declare type ParameterDecorator = (target: Function, propertyKey: string, index: number) => void | any;
