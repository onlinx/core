import * as http from 'http';
import { Route } from '../router'
import { Context, ContextRequest } from '../context';
// All the routing logic, as to not clog handler.ts and router.ts
export const getRoute = (path: string, routes: Route[]): Route => {
  let validRoute: Route = {
    path: '*',
    routes: {
      all: async (ctx: Context) => {
        ctx.status(404)
        return '404 Not Found'
      }
    }
  }
  const sorted = sortRoutes(routes)
  sorted.some(route => {
    if(route.path === '*' || route.path === path) {
      validRoute = route
      return true
    }
    return false
  })
  return validRoute
}
export const sortRoutes = (routes: Route[]): Route[] => {
  let sorted = []
  for(let route of routes) {
    if(route.path === '*') sorted.unshift(route)
    else if(route.path.startsWith('/')) sorted.push(route)
  }
  return sorted
}

// Context related functions
export const createContextRequest = (request: http.IncomingMessage): ContextRequest => {
  return {
    headers: request.headers
  }
}