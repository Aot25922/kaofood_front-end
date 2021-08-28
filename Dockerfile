FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY /nginx/zerossl /etc/ssl
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY /nginx/zerossl/937417DABB3FF47F80F39324D154C04D.txt /usr/share/nginx/html/.well-known/pki-validation/
COPY --from=build /app/dist /usr/share/nginx/html