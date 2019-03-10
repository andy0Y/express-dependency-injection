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

start by defining your application root class, root router and subrouters :

