# Getting started

## Setting up the project

The project consists of a backend and frontend.

The backend is a [TypeScript](https://www.typescriptlang.org/) [Express](https://expressjs.com/) application, using [MongoDB](https://www.mongodb.com/) as its database.

The frontend is built using [Nuxt](https://nuxt.com/) and [TailwindCSS](https://tailwindcss.com/).

### Backend

#### Configuring the backend
Edit the `.env` file located in the `./backend` directory.

The first three variables are mandatory, the last three are optional:
1. `OWNER_USERNAME`: The username you use as a admin. This will allow you to register yourself without an invite code - just pick that username you entered in the variable - and will also let you generate invites.
2. `FRONTEND_DOMAIN`: The domain of your frontend in `example.domain` style. If not on default port, specify it afterwards: `localhost:3000` or `example.domain:3000`.
3. `MONGODB_URL`: URL of your MongoDB database, with password.
4. `PORT`: Port of the backend service.
5. `HUGGINGFACE_ACCESS_TOKEN`: [Huggingface](https://huggingface.co) access token. Optional but recommended, because of rate limitation.
6. `HUGGINGFACE_MODEL`: Specify the [Huggingface](https://huggingface.co) (AI) model. Must be of type `textGeneration`. The default model is `google/flan-t5-base`.

```sh
# MANDATORY VARIABLES
# Owner username: used for first user registration (without invite code) and admin functionality
OWNER_USERNAME="test"

# Domain of your frontend
FRONTEND_DOMAIN="localhost:3000"

# URL of the MongoDB Database
MONGODB_URL=""


# OPTIONAL VARIABLES
# Port the server will open on (Optional, default: '80')
PORT=80

# Huggingface.co access token (Optional, but recommended)
HUGGINGFACE_ACCESS_TOKEN=""

# Huggingface.co model to generate the cards. Must be of type 'textGeneration'. (Optional, default: 'google/flan-t5-base')
HUGGINGFACE_MODEL=""
```

#### Starting the backend
1. Open the `./backend` directory in your terminal (if not done already):
```sh 
cd backend
``` 
2. Install the required packages using your package manager:
```sh
# Using NPM
npm install

# Using Yarn
yarn install
```
3. Start the backend server:
```sh
# Using NPM
npm run dev

# Using Yarn
yarn dev
```

### Frontend

#### Configuring the frontend

In order to allow secure traffic - only to your backend API -, you need to specify the route to your API in the `nuxt.config.ts` located inside the `./frontend` directory:

We set up a proxy with the frontend service. To this proxy the requests are being sent and then forwarded to the URL of the backend API.

1. `defineNuxtConfig() > nitro > devProxy > "devApi" > target`: This must be your backend URL, with the port and `http://` in the beginning. For example: `http://localhost:80` or `http://api.example.domain`.
2. `defineNuxtConfig() > runtimeConfig > public > apiBaseUrl` This is the URL to the proxy we set up. It is your frontend domain + `devApi` (the name of the `devProxy`). Example: `http://localhost:3000/devApi` or `http://example.domain/devApi`.

```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  nitro: {
    devProxy: {
        "/devApi": {
            target:"http://localhost:80",
            changeOrigin: true,
            prependPath: true,
        }
    }
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3000/devApi',
    },
  },
  css: [
    '~/assets/fonts.css',
  ],
})
```

#### Starting the frontend
1. Open the `./frontend` directory in your terminal (if not done already):
```sh 
cd frontend
``` 
2. Install the required packages using your package manager:
```sh
# Using NPM
npm install

# Using Yarn
yarn install
```
3. Start the frontend server:
```sh
# Using NPM
npm run dev

# Using Yarn
yarn dev
```