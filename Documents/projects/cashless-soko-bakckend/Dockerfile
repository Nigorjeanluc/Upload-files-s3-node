FROM node:10

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# RUN npm install
RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 9000
CMD [ "npm", "start" ]