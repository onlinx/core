import * as http from 'http';

import { Controller } from './controller';

export class Server {
  private controller: Controller;

  private server: http.Server;

  constructor(controller: Controller) {
    this.controller = controller;
    this.server = http.createServer(this.controller.router.mount());
  }

  mount(port: number, callback?: () => void) {
    this.server.listen(port, callback);
  }
}
