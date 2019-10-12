FROM node:10
RUN npm -g install yarn 

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

ADD . .

EXPOSE 4200