# Intro

Node JS / Express server for the VLife app

# Dependencies

## MySQL

## Typescript

    for type safety and OOP.

### Types to add

"@types/express": "^4.17.1",

"@types/jest": "^24.0.18",

"@types/mysql2": "github:types/mysql2#semver:^1.0.0",

"@types/supertest": "^2.0.8",

Installing them

-   mysql2

    npm i --save-dev types/mysql2#semver:^1.0.0

## body-parser

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

    $ npm run start

## npm scripts

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

-   Especialidad
-   ListaPrecios
-   Pago
-   Pais
-   Practica
-   Profesional
-   Provincia
-   RangoEdad
-   Reputacion
-   Solicitud
-   Usuario

## creating sequelize models

sequelize model:create --name Usuario --attributes nombre:string
sequelize model:create --name Especialidad
sequelize model:create --name ListaPrecios
sequelize model:create --name Pago
sequelize model:create --name Pais
sequelize model:create --name Practica
sequelize model:create --name Profesional
sequelize model:create --name Provincia ...

# Deploy

## Heroku

### install heroku client

    https://devcenter.heroku.com/articles/heroku-cli

### Commands

-   check remotes

    git remote -v

GIT URL: https://git.heroku.com/vlife-api.git

-   login into the git account with SSH

    heroku login

*   push changes from the heroku-deploy branch to the remote "heroku" master branch

    \$ git push heroku master
# ENDPOINTS

## Local

localhost:3000

localhost:3000/usuario

localhost:3000/cantPorEspecialidad

## Heroku

https://vlife-api.herokuapp.com

https://vlife-api.herokuapp.com/usuario

https://vlife-api.herokuapp.com/cantPorEspecialidad


# Deploy

## Heroku
 The remote + branch that has to be updated to trigger a deploy in heroku is the remote "heroku" branch "master"
 so if you do:

We will organise like this:

We will have a deploy heroku branch were we put the changes we want to go to heroku, we merge our changes to this branch (origin/heroku-deploy) and then push them to heroku / master

    origin / heroku-deploy -> heroku / master

    In the heroku-deploy branch 
    $ git push heroku master

That will push the current heroku-deploy local branch changes to the remote "heroku / master" triggering a new deploy.
