import './types'
import 'reflect-metadata'
import * as Koa from 'koa'
import * as koaBodyParser from 'koa-bodyparser'
import * as koaStatic from 'koa-static'
import * as koaCors from 'koa-cors'
import * as koaConvert from 'koa-convert'
import * as path from 'path'
import concurrencyLogger from 'concurrency-logger'
import { createKoaServer } from 'routing-controllers'
import { swaggerSpec } from './swagger'
import chalk from 'chalk'
import * as swagger2 from 'swagger2'
import { ui, validate } from 'swagger2-koa'
import config from '../config'

const { SERVER_PORT, SERVER_HOST } = config

// Create koa server
const app: Koa = createKoaServer({
  controllers: [path.resolve(__dirname, './controllers/*.ts')],
  middlewares: [path.resolve(__dirname, './middlewares/*.ts')],
  interceptors: [],
})

// Validate swagger specification first
if (!swagger2.validateDocument(swaggerSpec)) {
  throw Error(
    `Swagger specification in JsDoc does not conform to the Swagger 2.0 schema.
    Please see: https://swagger.io/specification/`,
  )
}

// Use koa2 middlewares
app.use(
  koaConvert(koaCors({
    // Configures the Access-Control-Allow-Origin CORS header.
    origin: true,
    // Set to true to pass the header, otherwise it is omitted.
    credentials: true,
    // Configures the Access-Control-Allow-Methods CORS header.
    methods: ['GET', 'POST'],
  })),
)

// Serving static file such as `fe-achive`
// Now we create the httpServer for `../static`
app.use(koaStatic(path.resolve(__dirname, '../static')))

// About koa-bodyparser: https://www.npmjs.com/package/koa-bodyparser
app.use(koaBodyParser())

// Http logger middleware
app.use(concurrencyLogger({ timestamp: true }))

// Use swagger-ui middleware
// ui(swaggerSpec, pathRoot = "/swagger", skipPaths = ['/swagger/v1'])
app.use(ui(swaggerSpec, '/swagger'))

// Use validate middleware
// If the request body does not validate, an HTTP 400 is returned to the client.
// If the response body does not validate, an HTTP 500 is returned to the client.
app.use(validate(swaggerSpec))

// See: https://github.com/PabloSichert/concurrency-logger/blob/v2.0.1/src/index.js#L324
// Let app.onerror event do nothing:
//  - https://github.com/koajs/koa/blob/2.4.1/lib/application.js#L128
//  - https://github.com/koajs/koa/blob/2.4.1/lib/application.js#L187
app.on('error', () => {})

// Start koa2 server
app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(chalk.cyan(`Setup Koa2 Server on ${SERVER_HOST}:${SERVER_PORT}`))
})
