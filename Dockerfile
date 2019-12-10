FROM node

# where docker files will be created
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app 

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD [ "node", "server.js" ]

