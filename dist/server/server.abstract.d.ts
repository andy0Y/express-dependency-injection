/// <reference types="node" />
import { Express } from 'express';
export declare abstract class AbstractServer {
    protected app: Express;
    listen(port: number, callback?: Function): import("http").Server;
}
