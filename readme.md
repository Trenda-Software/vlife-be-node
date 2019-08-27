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
  - controllers: logic, provides data to endpoints, mvc pattern
  - models: data models, mvc pattern. Schema, connection to DB,
  - routes: API endpoints

# Deploy NETVIRTUE

breeze.southswell.com.au
/home/southswe/api
development
status: started (v10.15.1)

## SSH CONN

Netvirtue
Be sure you are added to the ssh whitelist, otherwise you may get a conn timeout.

ssh southswe@s10.cpcloud.com.au -p4001

use cPanel Login pwd

## FTP

FTP (install a ftp CLI like inetutils)
\$ ftp
ftp> open

## NODE JS

Enter to the virtual environment.
To enter to virtual environment, run the command:
\$ source /home/southswe/nodevenv/api/10/bin/activate && cd /home/southswe/api

# Deploy AWS with EBS

breeze.aws@gmail.com
Brze)(-93

https://medium.freecodecamp.org/how-to-deploy-a-node-js-app-to-the-aws-elastic-beanstalk-f150899ed977

create a web app
use the low cost version

region: sa-east-1 Sao Pablo

Environment details:
EIP: 54.233.201.95
sec group: awseb-e-chjcpafgrt-stack-AWSEBSecurityGroup-1GUJZPVQ5XBFV
env data Amazon S3 storage bucket: elasticbeanstalk-sa-east-1-947456654032
instance: i-0ad022dd8dad62b11
app: http://breezecmsback-env.y5jxh523d4.sa-east-1.elasticbeanstalk.com/

### setup eb-cli to access your AWS account

https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-configuration.html

check your API keys to login into your AWS account with the eb/aws client

Check/Create your IAM user and put it in the eb-client config
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts-roles-user.html

You can have many users/profiles
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html

So, create a IAM user with full EBS rights (AWSElasticBeanstalkFullAccess policy)

for this app use
usr: breeze-ebs
Access key ID: AKIA5ZGGRHLIEV6CKKFB
SECRET KEY: sBrGXKSGwepZYGofEGjxBm3egvc2I3bHCI1jVbOL

And add it to your local credentials aws file
open ~/.aws/credentials

test it

eb console --profile breeze-ebs

# Managing the EBS environment

## open the console

\$ eb console --profile breeze-ebs

## set the environment you want to work with

\$ eb use BreezeCmsBack-env --profile breeze-ebs

## check status

\$ eb status --profile breeze-ebs

## deploy a new version

\$ eb deploy --profile breeze-ebs

# Deploy to EC2 AWS Manually

### create a EC micro instance

https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-1-d67367ac5171

# DATABASE

## LOCAL SERVER

### mongo start local server

host: 127.0.0.1:27017
db: breeze

START
\$ mongod

\$

## CLOUD SERVER

Whitelist your IP !!!!!!
Clusters -> Security -> IP whitelist
after that wait a few seconds before loggin in.

Mongo Atlas

CLUSTER
COLLECTION: breeze
USR: breeze
PWD: check web console

## Connect with NodeJS

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://breeze:<password>@clustermongoatlas0-wiy2i.mongodb.net/test?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
    });

## Connect with compass

Copy the connection string below, and open Compass:
mongodb+srv://breeze:<password>@clustermongoatlas0-wiy2i.mongodb.net/test

# MONGO utils

## Import data into mongo DB

### to the local server

    $ mongoimport --username breeze --password <pwd> --host 120.0.0.1:27017 --db breeze --collection sites --file /data/deos/siteData.json --type json

### to the cloud server

    $ mongoimport --host clustermongoatlas0-wiy2i.mongodb.net:27017 --db breeze --collection sites --file ./data/deos/siteData.json --type json

mongodb+srv://breeze:<password>@clustermongoatlas0-wiy2i.mongodb.net/test?retryWrites=true

# ENV variables

## env from

for the static files environment
\$ export NG_CMD=prod

for the db
\$ export MONGO_URL=mongodb+srv://breeze:<password>@clustermongoatlas0-wiy2i.mongodb.net/breeze?retryWrites=true

for the environment
\$ export ENVIRONMENT=heroku

check if there

        $ env | grep MONGO

they are only set in the working terminal, you need to put them in the resource files for your shell or bash profile

    $ touch ~/.bash_profile
    if exists
    $ open ~/.bash_profile

## env with webpack

# Deploy

## Heroku

CONS:

- static files dont work well in heroku

  //dont work for secutirty reasons
  app.use(express.static(\_\_dirname + 'htdocs'));
  app.use(express.static('../htdocs'));

  // use 'public' directory instead

- Slow startup after idle, few seconds

- Careful with Costs in non-free tier

### Setup

- Install the CLI

- Login

  heroku login

- crete the app if not exists already

  heroku create breeze-cms-back

https://breeze-cms-back.herokuapp.com/
https://git.heroku.com/breeze-cms-back.git

add a remote 'heroku' to your git remotes list

- setup ENV vars
  get it from your local env

      $ env | grep MONGO

set it in heroku

    $ heroku config:set MONGO_URL=mongodb+srv://breeze:<password>@clustermongoatlas0-wiy2i.mongodb.net/breeze?retryWrites=true

set another ENV to define the environment
\$ heroku config:set ENVIRONMENT=heroku

- Allow Mongo Atlas to receive connections from the heroku instance

* push to heroku repo

  \$ git push heroku

- create a staging environment

### Troubleshooting

When asking for a endpoint like: https://breeze-cms-back.herokuapp.com/dev/api/v1/deos

2013-09-08T01:15:34.427477+00:00 heroku[web.1]: Error R10 (Boot timeout) -> Web process failed to bind to \$PORT within 60 seconds of launch

Heroku sets a dynamically assigned port number to your app. Hence if you are strictly specifying a port number to be used, Heroku won't be able to do that.

However, you should set a port number so that your app can execute on localhost. Hence, the pipe to a specified port number '3000'.

    var port_number = server.listen(process.env.PORT || 3000);
    app.listen(port_number);

## AWS Elastic BEanstalk

EB is an app deployment service
Careful:

- dont use the UI in the console, and then the CLI, they have inconsistencies
- you shoud have SSH access to the system for trouble shooting

root acc usr: deos.aws@gmail.com

- setup access keys
