import { Controller, Param, Body, Get, Post, Delete } from 'routing-controllers'

@Controller()
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
   *       405:
   *         description: Invalid input
   */
  @Post('/pet')
  post(@Body() pet: any) {
    return pet
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
  @Get('/pet/:petId')
  getOneById(@Param('petId') petId: number) {
    // return {
    //   id: petId,
    //   category: {
    //     id: 0,
    //     name: 'string',
    //   },
    //   name: 'doggie',
    //   photoUrls: [
    //     'string',
    //   ],
    //   tags: [
    //     {
    //       id: 0,
    //       name: 'string',
    //     },
    //   ],
    //   status: 'available',
    // }
    return petId
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
   *     - name: api_key
   *       in: header
   *       required: false
   *       type: string
   *     - name: petId
   *       in: path
   *       description: Pet id to delete
   *       required: true
   *       type: integer
   *       format: int64
   *     responses:
   *       400:
   *         description: Invalid ID supplied
   */
  @Delete('/pet/:petId')
  deleteById(@Param('petId') petId: number) {
    return petId
  }
}
