FROM node:18.17.1

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run prisma:dev:initialize

EXPOSE 3000

CMD ['node']
