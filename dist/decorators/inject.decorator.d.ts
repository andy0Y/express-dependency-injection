import { Class } from "../types/class.type";
import { ServiceInterface } from "../service/service.inteface";
import 'reflect-metadata';
export declare const Inject: (paramTarget: string | Class<ServiceInterface>) => (target: any, propertyKey: string | symbol, indexOrDescriptor?: number | PropertyDescriptor) => void;
