# Stage 1: Build the React app
FROM node:14 as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/*

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
