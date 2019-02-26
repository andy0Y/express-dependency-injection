import { Inject } from "./decorators/inject.decorator";
import { Service } from "./decorators/service.decorator";
import { register } from "./container/register";
import { Request, Response } from "express";
import { ExMiddleware } from "./decorators/middleware.decorator";
import { AbstractMiddleware } from "./middlewares/middleware.abstract";
import { AbstractRouter } from "./router/router.abstract";
import { ExRoute } from "./decorators/route.decorator";
import { ExRouter } from "./decorators/router.decorator";
import { HttpVerbs } from "./enums/http.verbs.enum";
import { Repository } from "./mixin/repository.mixin";
import { ExRepository } from "./decorators/repository.decorator";
import { AbstractServer } from "./server/server.abstract";
import { ExServer } from "./decorators/server.decorator";

register({
    statics: [{
        key: 'lol',
        value: 'je suis la valeuuuuuuuur !'
    },{
        key: 'loul',
        value: new Object('je suis la 2e valeur !')
    }]
});

@Service()
export class Injected {
    
    constructor(@Inject('loul') public inception :string, public test: string = 'je me suis fait injecter !') {
        
    }
    log() {
        console.log('injected class working');
    }
}


@Service()
export class Test {
    
    @Inject('lol') public loul: string;
    
    constructor(
    @Inject(Injected) public first?: Injected,
    @Inject('lol') public second?: string,
    public already: string = 'test') {
        
    }
    
    @Inject('lol')
    test() {
        
        return 'not the good one !';
    }
    
    @Inject('lol')
    get lel() {
        
        return 'getted !';
    }
}

@ExMiddleware()
class TestMiddleware extends AbstractMiddleware {

    run(req: Request, res: Response) {

        console.log('middleware has been called');
    }
}

ExRepository()
class Repo extends Repository(Test) {

    public getModel() {

        return 'loooool';
    }
}

@ExRouter({
    path: '/subLog',
    middlewares: [TestMiddleware]
})
class Router2 extends AbstractRouter {
}

@ExRouter({
    path: '/log',
    middlewares: [TestMiddleware],
    routers: [Router2]
})
class Router extends AbstractRouter {


    constructor(@Inject(Repo) repo?: Repo) {

        super();

    }
    @ExRoute({
        path: '/lool',
        verb: HttpVerbs.POST,
        middlewares: [TestMiddleware]
    })
    public betweenDates(req: Request, res: Response) {

        console.log('route called !');
        res.send('bitch, please !');
    }
}


@ExServer({
    main: Router
})
class App extends AbstractServer {


}

const app = new App();
app.listen(3000, () => console.log('listening !'));

