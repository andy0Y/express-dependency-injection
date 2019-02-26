import { ModelInterface } from "../model/model.interface";

export interface RepositoryInterface<T extends ModelInterface> {

    getModel(model: T): any
}