import { Router } from './router';

export class Controller {
  router: Router;
  constructor(router: Router) {
    this.router = router;
  }
}