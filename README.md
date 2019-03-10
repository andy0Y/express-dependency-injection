[![Build Status](https://travis-ci.org/andy0Y/express-dependency-injection.svg?branch=master)](https://travis-ci.org/andy0Y/express-dependency-injection)
[![Coverage Status](https://coveralls.io/repos/github/andy0Y/express-dependency-injection/badge.svg?branch=master)](https://coveralls.io/github/andy0Y/express-dependency-injection?branch=master)

# express-dependency-injection

Build complete express web server in Typescript, using decorators to define your routers, routes and middlewares, giving you the full flexibility of dependency injection for test, and the performance optimisation of singleton class injection thanks to a custom container.

## Getting Started

Those instructions while help you get up and running with the express-dependency-injection module on your local machine

### Prerequisites

#### Run Dependencies

- node: ^8.11
- npm: ^5.6
- npm modules :
  - @types/express: ^4.16.1
  - express: ^4.16.4
  - reflect-metadata: ^0.1.13
  - typescript: ^3.3.3333
  
#### Test Dependencies

test dependencies should be added with the --save-dev flag using npm

*ts-node and mocha have to be installed globally using the -g flag using npm !*
- run dependencies
- chai: ^4.2.0
- chai-spies: ^1.0.0
- mocha: ^6.0.2
- ts-node: ^8.0.2

### Installing

#### From Scratch

To start using the express-dependency-injection module, simply initialise an empty typescript npm project as follow :
```
npm init #follow instructions to initialise your pakage.json
tsc --init #generate a generic tsconfig.json typescript transpiler configuration file
npm i --save express-dependency-injection # install the acutal module
```
turn in experimental decorators and decorator metadata in your tsconfig.json file :
```json
     "experimentalDecorators": true,
     "emitDecoratorMetadata": true 
```
start having fun !

#### Existing Project

Run the `npm i --save express-dependency-injection` command
turn in experimental decorators and decorator metadata in your tsconfig.json file :
```json
     "experimentalDecorators": true,
     "emitDecoratorMetadata": true 
```
you're ready to go !

## Running Tests

This package tests cover: 
- container functionnalities : registering, lazy-loading, retrieval, unicity of registered dependencies
- decorators functionnalities : routers, routes, middleware registering and automatic hooking to the generated express underlying object

to run test, clone the associated github repository, cd your way to the root project and do as following :

*make sure you have the correct versions of ts-node and mocha installed globally on your machine !*
```
npm install # install all dependencies
npm run-script test # run tests, output results as text, functionnalities wise
```
## API Documentation

### Building a basic application routing

**_this documentation follow the learn by example strategy and should be used with the dedicated example project
available at [express-dependency-injection-example](https://github.com/andy0Y/express-dependency-injection-example)_**

start by defining your application root class and root router :
---

root class :
```typescript
import { AbstractServer, ExServer } from "express-dependency-injection";
import { MainRouter } from "../routers/main.router";

/*
ExServer define the server entry point, check if extends AbstractServer,
and require a main router to be defined
AbstractServer provide the listen method to start the underlying express server
*/
@ExServer({
    main: MainRouter
})
export class App extends AbstractServer {

} 
```

---
main router :
```typescript
import { AbstractRouter, ExRouter } from "express-dependency-injection";
import { Router1 } from "./router1.router";
import { Router2 } from "./router2.router";
import { Example1Middleware } from "../middlewares/example1.middleware";

/*
Main router, showcasing the ability to bind branch routers,
can also declare actual routes within it's body
if you need a global middleware, declare it in this middleware array 
*/
@ExRouter({
    path: '/',
    routers: [
        Router1,
        Router2
    ],
    middlewares: [
        Example1Middleware
    ]
})
export class MainRouter extends AbstractRouter {


}
```

---
Define subrouters, as follow :
---
router2, showcasing post and get methods :
```typescript
import { Request, Response } from "express";
import { AbstractRouter, ExRouter, ExRoute, Inject } from "express-dependency-injection";
import { HttpVerbs } from "express-dependency-injection/dist/enums/http.verbs.enum";
import { ExampleRepository } from "../repositories/example.repository";
import { from } from "rxjs"; 
import { ExampleModel } from "../models/example.model";
import { Example2Middleware } from "../middlewares/example2.middleware";

/*
This Example router showcase how to integrates the module with mongoose through
the typegoose Typescript annotated API.
limited Here to GET and POST verbs, but all HTTP verbs are availables.
*/
@ExRouter({
    path: '/example'
})
export class Router2 extends AbstractRouter {

    @Inject(ExampleRepository)
    private repo: ExampleRepository;

    @ExRoute({
        path: "/get/:limit", //precise arguments with express syntax
        verb: HttpVerbs.GET
    })
    public findLasts(req: Request, res: Response, args: {params: {limit: string}, body: null}) {

        if(!! args.params.limit) {

            from(this.repo.getModel().findByProperty1(args.params.limit))
            .subscribe(
                data => res.json(data),
                err => res.status(500).send(err)
            )
        } else {

            res.status(400).send('bad parameters sent');
        }
    }
    @ExRoute({
        path: "/saveAll",
        verb: HttpVerbs.POST,
        middlewares: [
            Example2Middleware
        ]
    })
    public saveAll(req: Request, res: Response, args: {params: null, body: Array<ExampleModel>}) {

        const validated = args.body.reduce((acc, model) => {
            
            return acc && model.property1 !== undefined
            && model.property2 !== undefined
        
        }, true);
        if(validated) {

            from(this.repo.getModel().insertMany(args.body))
            .subscribe(
                data => res.json(data),
                err => res.status(500).send(err)
            )
        } else {

            res.status(400).send('bad request body sent');
        }
    }
}
```
http verbs compatible with a body will be injected the parsed body (require body-parser as middleware on the route) as args.body, wich you can type as the expected object you should receive. any arguments passed through uri while be available on args.params and can be typed just like body is.
A futur version will allow the apposition of guard like Classes on the route decorator parameters list.

---
router1, showcasing other HTTP verbs are available :
```typescript
import { AbstractRouter, ExRouter, ExRoute, HttpVerbs } from "express-dependency-injection";
import { SubRouter } from "./sub-router.router";
import { Example1Middleware } from "../middlewares/example1.middleware";
import { Request, Response } from "express";

/*
show some other HTTP verbs available
*/
@ExRouter({
    path: '/otherexample',
    routers: [
        SubRouter
    ],
    middlewares: [
        Example1Middleware
    ]
})
export class Router1 extends AbstractRouter {

    @ExRoute({
        path: "/delete/:id",
        verb: HttpVerbs.DELETE
    })
    public delete(req: Request, res: Response, args: {params: {id: string}, body: null}) {

        res.send(`called with DELETE verb with ${args.params.id} param`);
    }
}
```

---
Define Middlewares :
---
for project specific middleware logic, just implements the run method :
```typescript
import { AbstractMiddleware, ExMiddleware } from "express-dependency-injection";
import { Request, Response } from "express";

/*
ExMiddleware Class decorator works as Service one, but check class inheritance from
AbstractMiddleware at runtime, throw error if not
Abstract middleware force the implementation of run method, wich should implements
whatever logic the middlware has to perform on request or response objects
*/
@ExMiddleware()
export class Example1Middleware extends AbstractMiddleware {
    
    run(req: Request, res: Response) {

        //do something with request or response object !
        console.log('middleware called !');
    }



}
```
---

for imported module middelwares (like body-parser), overright the handle method as follow :
```typescript
import { AbstractMiddleware, ExMiddleware } from "express-dependency-injection";
import { Request, Response } from "express";
import bodyParser = require("body-parser");
import { ExpressMiddleware } from "express-dependency-injection/dist/types/function.type";

/*
ExMiddleware Class decorator works as Service one, but check class inheritance from
AbstractMiddleware at runtime, throw error if not
Abstract middleware force the implementation of run method, wich should implements
whatever logic the middlware has to perform on request or response objects
*/
@ExMiddleware()
export class Example2Middleware extends AbstractMiddleware {
    
    run(req: Request, res: Response) {
        
        //not called !
    }
    /*redefine the inherited handle function
    if you have to use an external middleware module
    (like body-parser in this example)
    */
   public handle(): ExpressMiddleware {

        return bodyParser.json();
    }
}
```

---
Define Repositories :
---
```typescript
import { Repository, Inject, ExRepository } from "express-dependency-injection";
import { GenericRepository } from "./generic.repository";
import { ExampleModel } from "../models/example.model";

/*
ExRepository Class decorator checks if extends the Repository mixin.
Repository mixin allows to factorize common behaviours (here connection to database)
and force to implements the getModel method to retrieve
the database representation of the model
*/
@ExRepository()
export class ExampleRepository extends Repository(GenericRepository) {

    @Inject(ExampleModel)
    private exampleModel: ExampleModel

    getModel() {

        this.connect();
        return this.exampleModel.getModelForClass(ExampleModel);
    }
} 
```
here is an example of typegoose implementation inside of a repository annotated class.
**Warning :** any injected class with the `@Inject` decorator MUST be annotated as service with the `@Service` decorator !
Here, the extended GenericRepository class leverage the connection logique to the database, and expose it's connect method to keep logic well separated.

---

## RoadMap

- **adding guards as class to routes and router**
- **providing an implementation for static assets loading**

## Issues, Questions, Propositions ?

Any question, bug report, or propositions on new features are more than welcome, feel free to use the report issue section of npm or [github repository](https://github.com/andy0Y/express-dependency-injection).
You can also contact use at [acrepinpro@gmail.com](mailto:acrepinpro@gmail.com)
