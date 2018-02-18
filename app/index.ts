import './types'
import "reflect-metadata"
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as koaMulter from 'koa-multer'
import createLogger from 'concurrency-logger'
import { createKoaServer } from 'routing-controllers'
import {
  UserController, PetController, SwaggerController
} from './controllers'

// import * as koaStatic from 'koa-static'
// import { absolutePath, SwaggerUIBundle } from 'swagger-ui-dist'

import config from '../config'

const app: Koa = createKoaServer({
  controllers: [
    SwaggerController,
    UserController,
    PetController,
  ]
})

app.use(bodyParser())

// app.use(koaMulter)

app.use(createLogger({ timestamp: true }))

// app.use(router.routes())

app.listen(config.PORT)

console.log(`Server running on port ${config.PORT}`)
