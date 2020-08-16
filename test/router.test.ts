import { Router } from '../src';

test('routes are added', async () => {
  const router = new Router();

  router.route('/', {
    get() {
      return 'hello world'
    }
  })

  expect(router.routes.length).toBe(1);
});
// interface Request {
//   body: {
//     name: string
//   }
// }