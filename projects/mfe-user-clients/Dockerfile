FROM node:18-alpine AS build

WORKDIR /app

COPY /*.json ./

RUN npm install

COPY projects/mfe-user-clients ./projects/mfe-user-clients

RUN npm run build -- --project mfe-user-clients --configuration=homologation
# RUN npx ng run mfe-user-clients:esbuild:homologation

FROM nginx:1.23
VOLUME /var/cache/nginx

COPY ./config/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/mfe-user-clients/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
