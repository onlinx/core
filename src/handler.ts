

import { Context } from './context';
// import { Methods } from './utils/types';


// interface HandlerOptions {
//   method?: Methods | Methods[]
//   middlewares?: HandlerCallback[]
// }
type Callback = string | { [key: string]: unknown } | undefined | void | boolean
export type HandlerCallback = (ctx: Context) => Promise<Callback> | Callback

