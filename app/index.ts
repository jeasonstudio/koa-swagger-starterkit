import * as Koa from 'koa'
import './types'
import createLogger from 'concurrency-logger'
// import * as koaStatic from 'koa-static'
// import { absolutePath, SwaggerUIBundle } from 'swagger-ui-dist'

import config from '../config'
import router from './router'

const app: Koa = new Koa()

app.use(createLogger({ timestamp: true }))

app.use(router.routes())

app.listen(config.PORT)

console.log(`Server running on port ${config.PORT}`)
