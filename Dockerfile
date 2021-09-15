FROM node:14

WORKDIR /int-222-app
COPY package.json .
RUN npm install
COPY . .
CMD [ "node", "app.js" ]