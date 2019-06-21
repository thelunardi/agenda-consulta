# base image
FROM node:11.0.0

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .
