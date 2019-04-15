# Intro

Node JS / Express server for Content Management System API to provide content to various client web sites

# Run locally

npm run start
localhost:3002

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

# Deploy AWS

breeze.aws@gmail.com
Brze)(-93

## with EBS

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

## manually

### create a EC micro instance

https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-1-d67367ac5171

# Managing the EBS environment

## open the console

\$ eb console --profile breeze-ebs

## set the environment you want to work with

\$ eb use BreezeCmsBack-env --profile breeze-ebs

## check status

\$ eb status --profile breeze-ebs

## deploy a new version

\$ eb deploy --profile breeze-ebs
