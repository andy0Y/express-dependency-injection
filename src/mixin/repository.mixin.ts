import { Constructor } from "../types/function.type";
import { RepositoryInterface } from "../repository/repository.interface";
import { ModelInterface } from "../model/model.interface";

export const Repository = <T extends Constructor, U extends ModelInterface>
(target: T) => {

    abstract class Repository extends target implements RepositoryInterface<U> {

        constructor(...args: any[]) {

            super(...args);
        }
        public abstract getModel(model : U);
    };
    return Repository;
}