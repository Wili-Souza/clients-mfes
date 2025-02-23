FROM node:18-alpine AS build

WORKDIR /app

COPY /*.json ./

RUN npm install

COPY projects/shell ./projects/shell

RUN npm run build -- --project shell --configuration=homologation
# RUN npx ng run shell:esbuild:homologation

FROM nginx:1.23
VOLUME /var/cache/nginx

COPY ./config/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/shell/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
