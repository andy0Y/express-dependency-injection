import { Class } from "./class.type";

export type ClassDecorator = (constructor: Function) => void | any;

export type MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void | PropertyDescriptor;

export type AccessorDecorator = MethodDecorator;

export type PropertyDecorator = (target: any, propertyKey: string) => void | any;

export type ParameterDecorator = (target: Function, propertyKey: string, index: number) => void | any;