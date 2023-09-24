## GreenSense API

This project is created to serve as the backend provider
of the GreenSense system, covering both hardware and software requests

## Setting Up for Development

- Clone the repository from Github

```shell
$ git clone https://github.com/rpenerojr/greensense-api.git
```

- Install the project's dependencies

```shell
$ npm i
```

- Migrate the database and seed

```shell
$ npm run prisma:dev:initialize
```

- Start the application

```shell
$ npm run dev
```

- Nodemon will start the application from the application's entrypoint
