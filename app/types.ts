declare module 'concurrency-logger'
declare module 'swagger-jsdoc'

declare type swaggerInjectorAuth = {
  sources: string[],       // Accepted sources of auth
  key: boolean,            // Key for the auth
  value: boolean,          // Value for the auth
}

declare type swaggerInjectorOptions = {
  path?: string,           // Path to swagger file
  swagger: any,            // swagger json. If not set, it is read from the `path` file
  prefix?: string,         // Prefix applied to all routes
  assets?: string,         // Prefix for all assets, appended to prefix
  route?: string,          // Router to serve documentation
  css?: boolean,           // Path to the css OR css string
  unauthorized?: boolean,  // Unauth handler
  dist?: string,           // Path to dist directory
  authentication?: swaggerInjectorAuth,
}

declare module 'swagger-injector' {
  function koa(options: swaggerInjectorOptions): any
}
