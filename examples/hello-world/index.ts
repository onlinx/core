import { Controller, Router, Server } from './node_modules/onlinx';

const router = new Router();


router.route('/', {
  get() {
    return 'hello world'
  }
})
const controller = new Controller(router);

const app = new Server(controller);

app.mount(3000, () => console.log('running...'));