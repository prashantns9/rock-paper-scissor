FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
ADD src ./src
RUN npm install
EXPOSE 4000
CMD [ "node", "src/index.js" ]