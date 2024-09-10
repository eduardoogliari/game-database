FROM node:lts

WORKDIR /app
COPY ./package.json .
COPY ./index.js .
COPY ./build ./public

RUN npm install

ENTRYPOINT ["node", "index.js"]
