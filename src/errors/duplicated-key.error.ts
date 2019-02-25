
export class DuplicatedKeyError extends Error {

    constructor() {

        super('duplicated key in registry');
    }
}