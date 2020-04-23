# Intro

Node JS / Express server for the VLife app

# Dependencies

## MySQL

### Issues when dropping tables or schemas

if you get something about the SDI schema, delete all rows in table before dropping it.

### Issues when accesing some specific table or view

Sometimes the user can't access a view or a table, directly or by a join, so double check if the user can read that view or table

if it is a view, be careful with this line

/_!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER _/

this can mess with the access privileges

## Typescript

For type safety and OOP.

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

    // run build, then serves web app with nodemon (autorefresh) from dist/index.html as entry point
    "start": "npm run build && nodemon dist/index.js",

    "serve": "npm run build && node dist/index.js", //  run build, then serves web app with node (without autorefresh) from dist/index.html as entry point

    "test": "npm run build && mocha --require @babel/register" // run test with mocha framework

\$ npm run start

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

# API

## Local Endpoints

localhost:3000/
localhost:3000/usuario
localhost:3000/especialidad
localhost:3000/practica FORBIDDEN? necesita loguearse con JWT
localhost:3000/cantPorEspecialidad FORBIDDEN? necesita loguearse con JWT

## AWS

API deployed in EC2 (us-east-1)

### connect with SSH

URL: check EC2 instance connect details in AWS Account
keys: check Key Pairs item in the NERTWORK & SECURITY section of the EC2 in the AWS Account
Remember to update the sec group with your machine IP

### check process running

ps x | grep <server port number>

# Using Docker

Install docker in your machine

## Build

    $ docker build . -t vlife-api

## Run

    $ docker run -d -p --env-file ./env-files/.env.docker.test <your HOST machine port>:<container exposed port> vlife-api
    $ docker run -d -p 3000:3000 --env-file ./env-files/.env.docker.test vlife-api

    NOTES:
    - the env file must not have white spaces in the key=value (e.g. key = value)

## Check the container, log into it

    $ docker exec -it <container name / ID> /bin/bash --> be sure that the container distro has the bash binaries (e.g. node-alpine does not have it, it uses ash shell)

## attach the container input/output to a terminal

    $ docker attach <container name / ID>

# Deploy with Elastic Beanstalk

## init (every time you change the Dockerfile)

    $ eb init --region us-east-1 -p docker vlife-api

    Remember to expose a port in Dockerfile (only needed for EB)

## run local

    $ eb local run --port 5000

    creates a random named container based on the Dockerfile

## check the appp runs ok

    localhost:5000

    or

    $ eb local open

## deploy in TEST

    Create and add a profile

    Profile (local aws credentials): vlife-2-test-eb-deployer

    $ eb terminate vlife-api

    Setup env vars in EB app
    Elastic Beanstalk -> Environments -> vlife-api

    $ eb create  vlife-api --profile vlife-2-test-eb-deployer --instance-types t2.micro --single --region us-east-1
