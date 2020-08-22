import { Context, Controller, Router, Server } from '@onlinx/core';

const router = new Router();

const cors = async (ctx: Context) => {
  ctx.headers.set('Access-Control-Allow-Origin', '*');
  ctx.headers.set('Access-Control-Allow-Headers', '*');
  ctx.headers.set('Access-Control-Allow-Methods', '*');
  return true;
};
router.route('/', {
  get: [ cors, async () => {
    return 'hello world';
  } ]
});
const controller = new Controller(router);

const app = new Server(controller);

app.mount(3000, () => console.log('running...'));