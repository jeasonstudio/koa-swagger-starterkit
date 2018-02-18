import { Controller, Get } from 'routing-controllers'
import * as swaggerJsDoc from 'swagger-jsdoc'
import * as Swagger from 'swagger-schema-official'
import * as path from 'path'

interface SwaggerDefinition {
  info: Swagger.Info
  host?: string
  basePath?: string
  externalDocs?: Swagger.ExternalDocs
  schemes?: string[]
  consumes?: string[]
  produces?: string[]
  definitions?: {[definitionsName: string]: Swagger.Schema }
  parameters?: {[parameterName: string]: Swagger.BodyParameter|Swagger.QueryParameter}
  responses?: {[responseName: string]: Response }
  security?: Array<{[securityDefinitionName: string]: string[]}>
  securityDefinitions?: { [securityDefinitionName: string]: Swagger.Security}
  tags?: Swagger.Tag[]
}

interface SwaggerDocOptions {
  swaggerDefinition: SwaggerDefinition
  apis: string[]
}

// see this specification document before edit
// https://swagger.io/specification/
const options: SwaggerDocOptions = {
  // options for the swagger docs
  swaggerDefinition: {
    info: {
      title: 'koa-ts-swagger',
      version: '2.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger & Koa',
      contact: {
        name: 'Jeason',
        email: 'me@jeasonstudio.cn',
        url: 'https://github.com/jeasonstudio',
      },
      license: {
        name: 'MIT',
      },
    },
    host: 'foo.bar.com',
    basePath: '/api',
  },
  // path to the API documents
  apis: [
    path.resolve(__dirname, './*.ts'),
  ],
}

// initialize swagger-jsdoc
const swaggerSpec: Swagger.Spec = swaggerJsDoc(options)

@Controller()
export class SwaggerController {
  @Get('/swagger-json')
  getSwaggerSpec() {
    return swaggerSpec
  }
}
