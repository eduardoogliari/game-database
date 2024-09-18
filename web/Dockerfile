FROM node:lts

#WORKDIR /app
COPY ./package.json .
COPY ./index.js .
COPY ./validation.js .
COPY ./routes ./routes

RUN npm install

ENTRYPOINT ["node", "index.js"]
