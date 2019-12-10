# Intro

Node JS / Express server for the VLife app

# Dependencies

Uses Typescript for type safety and OOP.

https://github.com/babel/example-node-server

    yarn add body-parser

DEV

-   for es6
    npm i @babel/cli @babel/core @babel/preset-env @babel/node nodemon --dev

-   for watching file changes
    npm i nodemon --dev

-   for eslint (ECMAScript syntax validation)
    npm i eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard --dev

-   for testing
    npm i mocha @babel/register --dev

preset-es2015 and preset-stage-x are deprecated as of 6-2019

# Run locally

-   npm scripts

    "build": "babel index.js -d dist", // builds locally, transpiles with babel and puts results in /dist
    
    "start": "npm run build && nodemon dist/index.js", // run build, then serves web app with nodemon (autorefresh) from dist/index.html as entry point
    
    "serve": "npm run build && node dist/index.js", //  run build, then serves web app with node (without autorefresh) from dist/index.html as entry point

    "test": "npm run build && mocha --require @babel/register" // run test with mocha framework

\$ npm run start

localhost:3002

# Directory structure

-   src
    -   routes: API endpoints
    -   controllers: logic, provides data to endpoints, mvc pattern
    -   models: data models, mvc pattern. 
    -   schemas, connection to DB
    -   types: typescript types

# Data modelling

Entities

-   Posts
-   Pages
-   Tags
-   Media
-   Comments
-   Users
