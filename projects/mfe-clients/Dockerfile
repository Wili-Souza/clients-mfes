FROM node:18-alpine AS build

WORKDIR /app

COPY /*.json ./

RUN npm install

COPY projects/mfe-clients ./projects/mfe-clients

RUN npm run build -- --project mfe-clients --configuration=homologation
# RUN npx ng run mfe-clients:esbuild:homologation

FROM nginx:1.23
VOLUME /var/cache/nginx

COPY ./config/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/mfe-clients/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
