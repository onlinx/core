import * as http from 'http';
import * as url from 'url';

import { HandlerCallback } from './handler';
import { getRoute, createContextRequest } from './utils/helpers';
import { Context, HeadersObject } from './context';

type AcceptedHandler = HandlerCallback | HandlerCallback[] | undefined;

interface RoutesObject {
  get?: AcceptedHandler
  head?: AcceptedHandler
  post?: AcceptedHandler
  put?: AcceptedHandler
  delete?: AcceptedHandler
  options?: AcceptedHandler
  all?: AcceptedHandler
  [key: string]: AcceptedHandler
};

export interface Route {
  path: string
  routes: RoutesObject
}
export class Router {
  routes: Route[] = []

  route(path: string, routes: RoutesObject) {
    this.routes.push({
      path,
      routes
    });
  }
  mount(): http.RequestListener {
    return async (request, response) => {
      const path = url.parse(request.url || '/').pathname;
      // this.routes.forEach(route => {
      //   if((route.path === path || route.path === '*')) {
      //     let handled = false;
      //     route.options.handlers.some(async handler => {
      //       handled = await handler.handle(request, response);
      //       return handled;
      //     });
      //     if(!handled) { 
      //       (new Handler({
      //         method: '*'
      //       }, (ctx) => {
      //         ctx.status(404);
      //         return ctx.respondWith.text('404 Method Not Allowed');
      //       })).handle(request, response);
      //     }
      //   } 
      // });
      const correctRoute = getRoute(path || '', this.routes)
      await handleRoute(correctRoute, request, response)
    };
  }
}

const handleRoute = async (route: Route, request: http.IncomingMessage, response: http.ServerResponse) => {
  const contextRequest = createContextRequest(request)
  const routeContext = new Context(contextRequest)

  for(let [method, handler] of Object.entries(route.routes)) {
    // if(method === 'all') {
    //   continue;
    // }
    if(method === request.method?.toLowerCase()) {
      if(handler instanceof Array) {
        for(const h of handler) {
          const res = await h(routeContext)
          if(res === undefined ||res === true) {
            continue
          } else if(res === false ) {
            break
          } else {
            await createResponse<typeof res>(res, response, routeContext)
            break
          }
        }
      } else if(handler != undefined) {
          const res = await handler(routeContext)
          await createResponse<typeof res>(res, response, routeContext)
        }
      }
  }
}
const createResponse = <T>(handlerResponse: T, response: http.ServerResponse, context: Context) => {
  let headers: HeadersObject = {}
  if(typeof handlerResponse === 'object') {
    headers['Content-Type'] = 'application/json'
  }
  headers = {
    ...headers,
    ...context.response.headers
  }
  response.writeHead(context.response.status, headers)
  response.write(handlerResponse)
  response.end()
}