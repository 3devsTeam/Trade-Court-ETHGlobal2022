FROM node:alpine
WORKDIR /app
EXPOSE 3030
COPY package* ./
RUN npm i 
COPY . ./
CMD ["npm", "run", "start:prod"]