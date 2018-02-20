FROM node:8.9.4

# Create app directory
WORKDIR /home/webapp/koa-swagger-server

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
# --registry=https://registry.npm.taobao.org
RUN npm install

# Bundle app source
# Except `.dockerignore` files
COPY . .

# Expose port 3000
EXPOSE 3000

CMD [ "npm", "run", "start" ]

# docker build -t <your-username>/<project-name> .
# docker run -p 3000:3000 -d <your-username>/<project-name>:latest
# docker logs <container-id>
# docker exec -it <container id> /bin/bash
