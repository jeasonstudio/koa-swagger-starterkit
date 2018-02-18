import './types'
import "reflect-metadata"
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as path from 'path'
import * as koaStatic from 'koa-static'
import createLogger from 'concurrency-logger'
import { createKoaServer } from 'routing-controllers'
import * as swaggerInjector from 'swagger-injector'
import { swaggerSpec } from './swagger'
import {
  UserController, PetController
} from './controllers'

import config from '../config'
const serverPort: number = parseInt(config.PORT) || 3000

// create koa server
const app: Koa = createKoaServer({
  controllers: [
    UserController,
    PetController,
  ],
  middlewares: [],
  interceptors: [],
})

// use middlewares
app.use(bodyParser())
app.use(koaStatic(path.resolve(__dirname, '../static')))
app.use(createLogger({ timestamp: true }))

// swagger-ui documents
// see more in `./types.ts`
app.use(swaggerInjector.koa({
  swagger: swaggerSpec,
  // set swagger-ui document route
  // `/swagger.json`
  route: '/swagger',
}))

app.listen(serverPort)
console.log(`Server running on port ${serverPort}`)
