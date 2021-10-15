FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY /nginx/cloudflare/cloudflare.crt /etc/nginx/certs/cloudflare.crt
COPY /nginx/cloudflare /etc/ssl
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 443
EXPOSE 80