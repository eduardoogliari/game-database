FROM node:lts

WORKDIR /app
# COPY . .
COPY ./public ./public
COPY ./build .
COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

ENTRYPOINT ["node", "index.js"]
