# Onlinx
A fast and simple HTTP framework written in typescript

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

## Usage

### Typescript

Using with Typescript is as simple as running `npm install @onlinx/core` and importing it

Here's the hello world example in Typescript
```ts
import { Controller, Router, Server } from '@onlinx/core';

const router = new Router();

router.route('/', {
  get() {
    return 'hello world'
  }
})
const controller = new Controller(router);

const app = new Server(controller);

app.mount(3000, () => console.log('running...'));
```

The server will be running on port 3000

### Node

Run `npm install @onlinx/core`

Here's the hello world example in Node
```ts
const { Controller, Router, Server } = require('@onlinx/core');

const router = new Router();

router.route('/', {
  get() {
    return 'hello world'
  }
})
const controller = new Controller(router);

const app = new Server(controller);

app.mount(3000, () => console.log('running...'));
```

The server will be running on port 3000

As you can tell, it's not very different from the typescript verson. From now on, all examples are in Typescript

## API Documentation

### Context

The `context` object (often aliased as `ctx`) is passed to every handler callback

It contains information about the request, and helpers for setting information on the response

Here are all of the various methods/properties and their uses

#### `headers`

The `headers` property has two sub-methods, `headers.get` and `headers.set`.

- `headers.get`: Retrieves a header sent by the client, takes a string arguement
- `headers.set`: Sets a header for the response

#### `status`

The `status` method sets the status to send. 

Note: this does not send the status code, but sets it when the response is sent. This means that middlewares can safely set the status and still pass to the next handler

#### `data`

The `data` object allows middlewares to pass data to the next handler. For example, a body parser could pass the contents of the body to the rest of the middlewares

Note that type assertions are neccessary at the moment due to the way it is set up

Example (only the important parts):
```ts
const body = (ctx: Context) => {
  ctx.data.body = 'hello';
  return true
}

router.route('/', {
  get: [body, (ctx: Context) => {
    return ctx.data.body as string;
  }]
})
```

## Common questions

> How do middlewares work

You can return `true` to pass to the next layer and `false` to not continue

> Is there a body parser?

We're going to make one as a seperate package. It's in the works for now.

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

## Examples

### Hello world program

```ts
import { Controller, Router, Server } from '@onlinx/core';

const router = new Router();

router.route('/', {
  get() {
    return 'hello world'
  }
})
const controller = new Controller(router);

const app = new Server(controller);

app.mount(3000, () => console.log('running...'));
```

### Simple middlewares

```ts
import { Controller, Router, Server, Context } from './node_modules/onlinx';

const router = new Router();

const cors = async (ctx: Context) => {
  ctx.headers.set('Access-Control-Allow-Origin', '*')
  ctx.headers.set('Access-Control-Allow-Headers', '*')
  ctx.headers.set('Access-Control-Allow-Methods', '*')

  return true
}
router.route('/', {
  get: [cors, async () => {
    return 'hello world'
  }]
})
const controller = new Controller(router);

const app = new Server(controller);

app.mount(3000, () => console.log('running...'));
```
