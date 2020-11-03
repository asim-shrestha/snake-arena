FROM node:14-buster

WORKDIR /client

# Install dependencies
COPY ./client/package.json .
COPY ./client/package-lock.json ./
RUN npm install
RUN npm install react-css-grid

# Bundle app source
COPY ./client ./

CMD ["npm", "start"]
