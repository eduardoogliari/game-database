FROM node:lts

#WORKDIR /app
COPY ./index.js .
COPY ./package.json .
COPY ./validation.js .
COPY ./routes ./routes
COPY ./public ./public

RUN npm install

ENTRYPOINT ["node", "index.js"]
