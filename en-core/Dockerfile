FROM node:18.16.0-slim

RUN apt-get update && \
    apt-get install -yq make && \
    apt-get install -y build-essential libpq-dev && \
    apt-get install -y postgresql-client

WORKDIR /app
