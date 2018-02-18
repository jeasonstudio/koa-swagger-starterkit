import * as KoaRouter from 'koa-router'
import { swaggerSpec } from './swagger'

const router: KoaRouter = new KoaRouter()

/**
 * @swagger
 * /api/puppies:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
router.get('/pet/:petid', async ctx => {
  ctx.body = 'petid is ' + ctx.params.petid
})

router.get('/swagger-json', async ctx => {
  ctx.body = swaggerSpec
})

export default router
