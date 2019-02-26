
export class DecoratorMissusedError extends Error {

    constructor(decoratorName: string, target: string) {

        super(`${decoratorName} cannot be used for ${target}`);
    }
}