# GreenSense API

[![GitHub issues](https://img.shields.io/github/issues/rpenerojr/greensense-api.svg "GitHub issues")](https://github.com/rpenerojr/greensense-api/issues)
[![GitHub stars](https://img.shields.io/github/stars/rpenerojr/greensense-api.svg "GitHub stars")](https://github.com/rpenerojr/greensense-api)
![GitHub tag checks state](https://img.shields.io/github/checks-status/rpenerojr/greensense-api/main)


This project is created to serve as the backend provider
of the GreenSense system, covering both hardware and software requests

## Setting Up for Development

- Clone the repository from Github
- Install the project's dependencies
- Migrate the database and seed
- Start the application
  - Nodemon will start the application from the application's entrypoint

```shell
$ git clone https://github.com/rpenerojr/greensense-api.git
$ npm install
$ npm run prisma:dev:initialize
$ npm run dev
```

## Setting Up with Docker

- Install docker
- Open the terminal and navigate to the project folder
- Execute docker-compose up --build
- Open an interactive terminal in the application
- Execute prisma initialization

```shell
$ cd /path/to/project/folder
$ docker-compose up --build
$ docker exec -it greensense_api /bin/sh
$ npm run prisma:dev:initialize
```
