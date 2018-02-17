import * as KoaRouter from 'koa-router'

const router: KoaRouter = new KoaRouter()

router.get('/api', async ctx => {
  ctx.body = 'Hello World!'
})

export default router
