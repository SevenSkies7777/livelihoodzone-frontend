
# Stage 1
FROM node:10-alpine as build-step
RUN mkdir -p /src
WORKDIR /src
COPY package.json /src
RUN npm install
COPY . /src
RUN npm run build-prod
 
# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /src/dist /usr/share/nginx/html
