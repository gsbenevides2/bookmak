FROM node:18.19.1

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY tsconfig.json /app
COPY src /app/src

RUN yarn install
RUN yarn runMigrations


CMD ["yarn", "start"]