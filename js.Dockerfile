FROM node:14-buster

WORKDIR /app

# Install dependencies
# COPY ./app/package.json .
# RUN npm install

# Bundle app source
COPY ./app /app

CMD node app.js
