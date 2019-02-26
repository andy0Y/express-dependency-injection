import { Express } from 'express';

export abstract class AbstractServer {

    protected app: Express;

    public listen(port: number, callback?: Function) {

        return this.app.listen(port, callback ? callback : undefined);
    }
}