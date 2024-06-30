FROM node:18-alpine

WORKDIR /usr/src/app
COPY ./ /usr/src/app

RUN rm -rf node_modules
RUN npm i
RUN npx prisma generate

CMD [ "npm", "start" ]

EXPOSE 8080
