import { Express } from 'express';
import { StaticSchema } from '../schema/router/static.schema';
import * as express from "express"

export abstract class AbstractServer {

    protected app: Express;
    protected statics : Array<StaticSchema>;

    public addStatics(args: Array<StaticSchema>) {

        args.forEach(staticSchema => staticSchema.path ?
            this.app.use(staticSchema.path, express.static(staticSchema.dir)) :
            this.app.use(express.static(staticSchema.dir))
        );
    }

    public listen(port: number, callback?: Function) {

        return this.app.listen(port, callback ? callback : undefined);
    }
}