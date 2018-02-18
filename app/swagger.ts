import swaggerJSDoc = require('swagger-jsdoc') // tslint:disable-line
import * as path from 'path'

// options for the swagger docs
const options: object = {
  swaggerDefinition: {
    info: {
      title: 'Node Swagger API',
      version: '2.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
  },
  // path to the API docs
  apis: [
    path.resolve(__dirname, './router.ts'),
    path.resolve(__dirname, './controllers/*.ts'),
  ],
}

// initialize swagger-jsdoc
export const swaggerSpec = swaggerJSDoc(options)
