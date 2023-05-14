FROM node:18.16.0-slim

RUN apt-get update && \
    apt-get install -yq make && \
    apt-get install -y build-essential libpq-dev

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci
RUN npm run build
RUN npx prisma generate

COPY . .

EXPOSE 8000
CMD ["bash", "-c", "make db-latest && npm start"]
