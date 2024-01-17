This project was boilerplated with [ranicc/ts-http-api](https://github.com/ranicc/ts-http-api)

## ts-http-api

Simple HTTP API written in [Typescript](https://www.typescriptlang.org/) using [ts-node](https://typestrong.org/ts-node) and [express](https://expressjs.com/).

### File structure

```
src/
├─ controller/
│  ├─ index.ts
├─ routes
│  ├─ index.ts
├─ server.ts
```

### Setup

#### Installing dependencies

Run:

```bash
yarn install
```

#### Running the server

##### For development

Run:

```bash
yarn dev
```

##### For build

Run:

```bash
yarn build
```

### License and additional information

This template is licensed under the MIT License.

Feel free to contribute to the project using Pull Requests or Issues.

#### Additional development information

This project is using [Prettier](https://prettier.io/) for code-formatting and the following dependencies:

##### Libraries
- [`argon2: ^0.30.3`](https://www.npmjs.com/package/argon2)
- [`axios: ^1.6.2`](https://www.npmjs.com/package/axios)
- [`cheerio: ^1.0.0-rc.12`](https://www.npmjs.com/package/cheerio)
- [`cookie-parser: ^1.4.6`](https://www.npmjs.com/package/cookie-parser)
- [`cors: ^2.8.5`](https://www.npmjs.com/package/cors)
- [`dotenv: ^16.3.1`](https://www.npmjs.com/package/dotenv)
- [`express: ^4.18.2`](https://www.npmjs.com/package/express)
- [`helmet: ^7.0.0`](https://www.npmjs.com/package/helmet)
- [`helmet-csp: ^3.4.0`](https://www.npmjs.com/package/helmet-csp)
- [`jsonwebtoken: ^9.0.1`](https://www.npmjs.com/package/jsonwebtoken)
- [`mongoose: ^7.4.1`](https://www.npmjs.com/package/mongoose)
- [`morgan: ^1.10.0`](https://www.npmjs.com/package/morgan)
- [`rate-limiter-flexible: ^2.4.2`](https://www.npmjs.com/package/rate-limiter-flexible)
- [`uuid: ^9.0.0`](https://www.npmjs.com/package/uuid)
- [`validator: ^13.9.0`](https://www.npmjs.com/package/validator)

##### Type Declarations (@types)
- [`@types/cookie-parser: ^1.4.3`](https://www.npmjs.com/package/@types/cookie-parser)
- [`@types/cors: ^2.8.14`](https://www.npmjs.com/package/@types/cors)
- [`@types/express: ^4.17.17`](https://www.npmjs.com/package/@types/express)
- [`@types/morgan: ^1.9.3`](https://www.npmjs.com/package/@types/morgan)
- [`@types/uuid: ^9.0.2`](https://www.npmjs.com/package/@types/uuid)
- [`@types/validator: ^13.7.17`](https://www.npmjs.com/package/@types/validator)

##### Development Tools
- [`nodemon: ^2.0.20`](https://www.npmjs.com/package/nodemon)
- [`ts-node: ^10.9.1`](https://www.npmjs.com/package/ts-node)
- [`typescript: ^4.8.4`](https://www.npmjs.com/package/typescript)