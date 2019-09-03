# Intro

Node JS / Express server for Content Management System API to provide content to various client web sites

# Dependencies

https://github.com/babel/example-node-server

    yarn add body-parser

DEV

- for es6
  yarn add @babel/cli @babel/core @babel/preset-env @babel/node nodemon --dev

- for watching file changes
  yarn add nodemon --dev

- for eslint
  yarn add eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard --dev

- for testing
  yarn add mocha @babel/register --dev

preset-es2015 and preset-stage-x are deprecated as of 6-2019

# Run locally

- npm scripts

  "build": "babel index.js -d dist",
  "start": "npm run build && nodemon dist/index.js",
  "serve": "npm run build && node dist/index.js",
  "test": "npm run build && mocha --require @babel/register"

\$ npm run start

localhost:3002

# Directory structure

- src
  - routes: API endpoints
  - controllers: logic, provides data to endpoints, mvc pattern
  - models: data models, mvc pattern. Schema, connection to DB,
