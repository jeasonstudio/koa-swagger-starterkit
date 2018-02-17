declare var createLogger: any

import * as Koa from 'koa'
import createLogger from 'concurrency-logger'
import config from '../config'
import router from './router'
const app = new Koa()

app.use(createLogger({ timestamp: true }))

app.use(router.routes())

app.listen(config.PORT)

console.log(`Server running on port ${config.PORT}`)
