import type { Context, ContextRequest } from '../context';
import type { IncomingMessage } from 'http';
import type { Route } from '../router';

// All the routing logic, as to not clog handler.ts and router.ts
export const getRoute = (path: string, routes: Route[]): Route => {
  let validRoute: Route = {
    path: '*',
    routes: {
      all: async (ctx: Context) => {
        ctx.status(404);
        return '404 Not Found';
      }
    }
  };
  const sorted = sortRoutes(routes);
  sorted.some(route => {
    if(route.path === '*' || route.path === path) {
      validRoute = route;
      return true;
    }
    return false;
  });
  return validRoute;
};
export const sortRoutes = (routes: Route[]): Route[] => {
  const sorted = [];
  for(const route of routes) {
    if(route.path === '*') sorted.unshift(route);
    else if(route.path.startsWith('/')) sorted.push(route);
  }
  return sorted;
};

// Context related functions
export const createContextRequest = (request: IncomingMessage): ContextRequest => {
  return {
    headers: request.headers
  };
};