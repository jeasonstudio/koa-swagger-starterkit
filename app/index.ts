import './types'
import 'reflect-metadata'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as koaStatic from 'koa-static'
import * as c2k from 'koa2-connect'
import * as path from 'path'
import concurrencyLogger from 'concurrency-logger'
import { createKoaServer } from 'routing-controllers'
import * as swaggerInjector from 'swagger-injector'
import { swaggerSpec } from './swagger'
import { initializeMiddleware } from 'swagger-tools'

import config from '../config'
const serverPort: number = parseInt(config.PORT, 10) || 3000

// create koa server
const app: Koa = createKoaServer({
  controllers: [path.resolve(__dirname, './controllers/*.ts')],
  middlewares: [path.resolve(__dirname, './middlewares/*.ts')],
  interceptors: [],
})

// use middlewares
app.use(bodyParser())
app.use(koaStatic(path.resolve(__dirname, '../static')))
app.use(concurrencyLogger({ timestamp: true }))

// swagger-ui documents
// see more in `./types.ts`
app.use(swaggerInjector.koa({
  swagger: swaggerSpec,
  // set swagger-ui document route
  // `/swagger.json`
  route: '/swagger',
}))

// Initialize the Swagger Middleware
initializeMiddleware(swaggerSpec, swaggerMiddleware => {
  // Initialize the Swagger middleware (Examples below)
  // Initialize the remaining server components

  // Interpret Swagger resources and attach metadata to request
  // must be first in swagger-tools middleware chain
  app.use(c2k(swaggerMiddleware.swaggerMetadata()))

  // Serve the Swagger documents and Swagger UI
  // http://localhost:3000/swagger => Swagger UI
  // http://localhost:3000/swagger-json => Swagger json document
  app.use(c2k(swaggerMiddleware.swaggerUi({
    swaggerUi: '/swagger-s',
    // TODO:
    swaggerUiDir: './node_modules/swagger-ui-dist',
    // swaggerUiDir: path.resolve(__dirname, '../node_modules/swagger-ui-dist/'),
    apiDocs: '/swagger-json',
  })))

  // Validate Swagger requests
  app.use(c2k(swaggerMiddleware.swaggerValidator({ validateResponse: true })))

  // Start server
  app.listen(serverPort)
  console.log(`Server running on port ${serverPort}`)
})
