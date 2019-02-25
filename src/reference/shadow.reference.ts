import { Reference } from "./reference.interface";

export class ShadowReference implements Reference<null> {
    
    _inner: null = null;
    ressource: null = null;
}