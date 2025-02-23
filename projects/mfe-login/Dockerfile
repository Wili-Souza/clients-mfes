FROM node:18-alpine AS build

WORKDIR /app

COPY /*.json ./

RUN npm install

COPY projects/mfe-login ./projects/mfe-login

RUN npm run build -- --project mfe-login --configuration=homologation
# RUN npx ng run mfe-login:esbuild:homologation

FROM nginx:1.23
VOLUME /var/cache/nginx

COPY ./config/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/mfe-login/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
