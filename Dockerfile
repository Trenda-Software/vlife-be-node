FROM node:12-stretch

USER node

RUN mkdir /home/node/src

WORKDIR /home/node/src

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

RUN npm audit fix

COPY --chown=node:node . .

RUN npm run build

CMD ["node", "./dist/server.js"]