# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./src/package.json ./
COPY ./src/package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent
RUN npm install dotenv-cli -g --silent
COPY ./src/. ./
RUN npm run build-dev

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./src/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./certs/*.crt /etc/nginx/
COPY ./certs/*.key /etc/nginx/

EXPOSE 80
EXPOSE 443

RUN apk update && apk add ca-certificates grep netcat-openbsd iputils iproute2

COPY ./certs/*.pfx /app/certs/
COPY ./certs/*.crt /usr/local/share/ca-certificates/
COPY ./certs/*.key /usr/local/share/ca-certificates/
RUN update-ca-certificates

CMD ["nginx", "-g", "daemon off;"]