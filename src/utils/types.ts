type LiteralUnion<T extends U, U = string> = T | (U & {});

export type Methods = LiteralUnion<'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH'>
export type MimeTypes = LiteralUnion<'application/javascript' | 'application/octet-stream' | 'application/json' | 'application/x-www-form-urlencoded' | 'image/gif' | 'image/jpeg' | 'image/png' | 'image/tiff' | 'image/vnd.microsoft.icon' | 'image/x-icon' | 'image/vnd.djvu' | 'image/svg+xml' | 'multipart/mixed' | 'multipart/alternative' | 'multipart/related' | 'multipart/form-data' | 'text/css' | 'text/csv' | 'text/html' | 'text/javascript' | 'text/plain' | 'text/xml'>

export type UnknownObject<T = unknown> = {
  [key: string]: T
}

export type RouteMethods = LiteralUnion<'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'path' | '*'>
