import { Class } from "../types/class.type";
import { RepositoryInterface } from "../repository/repository.interface";
import { ModelInterface } from "../model/model.interface";
export declare const ExRepository: <U extends ModelInterface, T extends Class<RepositoryInterface<U>>>() => any;
