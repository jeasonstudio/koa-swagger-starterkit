import {
  Controller, Param, Body, Get, Post, Delete, OnUndefined,
} from 'routing-controllers'
import { NotFoundError } from './Error'
import { ID, Pet } from '../types'
import { PoolConnection } from 'promise-mysql'
import { DB } from '../service/database'

@Controller('/pet')
export class PetController {

  /**
   * @swagger
   * /pet:
   *   post:
   *     tags:
   *     - pet
   *     summary: Add a new pet to the store
   *     operationId: addPet
   *     consumes:
   *     - application/json
   *     produces:
   *     - application/json
   *     parameters:
   *     - in: body
   *       name: body
   *       description: Pet object that needs to be added to the store
   *       required: true
   *       schema:
   *         $ref: '#/definitions/Pet'
   *     responses:
   *       200:
   *         description: Success post new pet
   *         schema:
   *           type: integer
   *           format: int64
   */
  @Post('')
  post(@Body() pet: Pet): ID {
    if (!pet) throw 'error'
    const petId = 1
    return petId
  }

  /**
   * @swagger
   * /pet:
   *   get:
   *     tags:
   *     - pet
   *     summary: Get all pets
   *     produces:
   *     - application/json
   *     responses:
   *       200:
   *         description: Success post new pet
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Pet'
   */
  @Get('')
  async getPets(@DB() db: PoolConnection): Promise<Pet[]> {
    const res = await db.query('SELECT * FROM class_score_manage.student_score')
    console.log(res)
    return [{
      name: 'aa',
      photoUrls: ['111'],
    }, {
      name: 'bb',
      photoUrls: ['222'],
    }]
  }

  /**
   * @swagger
   * /pet/{petId}:
   *   get:
   *     tags:
   *       - pet
   *     description: Returns a single pet
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: petId
   *         in: path
   *         description: ID of pet to return
   *         required: true
   *         type: integer
   *         format: int64
   *     responses:
   *       200:
   *         description: successful operation
   *         schema:
   *           $ref: '#/definitions/Pet'
   */
  @Get('/:petId')
  @OnUndefined(NotFoundError)
  getOneById(@Param('petId') petId: ID): Pet {
    return {
      id: petId,
      category: {
        id: 0,
        name: 'string',
      },
      name: 'doggie',
      photoUrls: [
        'string',
      ],
      tags: [
        {
          id: 0,
          name: 'string',
        },
      ],
      status: 'available',
    }
  }

  /**
   * @swagger
   * /pet/{petId}:
   *   delete:
   *     tags:
   *     - pet
   *     summary: Deletes a pet
   *     operationId: deletePet
   *     produces:
   *     - application/json
   *     parameters:
   *     - name: petId
   *       in: path
   *       description: Pet id to delete
   *       required: true
   *       type: integer
   *       format: int64
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Invalid ID supplied
   */
  @Delete('/:petId')
  deleteById(@Param('petId') petId: ID) {
    console.log('Delete pet', petId)
    return ''
  }
}
