FROM node:18-alpine AS build

WORKDIR /app

COPY /*.json ./

RUN npm install

COPY projects/mfe-ds ./projects/mfe-ds

RUN npm run build --project mfe-ds --verbose

FROM nginx:1.23
VOLUME /var/cache/nginx

COPY ./config/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/mfe-ds/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
