FROM node:18-alpine AS build

WORKDIR /app

COPY /*.json ./

RUN npm install

COPY projects/mfe-clients ./projects/mfe-clients

RUN npm run build --project mfe-clients --verbose

FROM nginx:1.23

COPY --from=build /app/dist/mfe-clients/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
