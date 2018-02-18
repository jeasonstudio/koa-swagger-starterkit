import * as swaggerJsDoc from 'swagger-jsdoc'
import * as path from 'path'
import {
  Info, ExternalDocs, Schema, BodyParameter, QueryParameter, Security, Tag, Spec,
} from 'swagger-schema-official'

type SwaggerSpecWithoutPath = {
  info: Info,
  host?: string,
  basePath?: string,
  externalDocs?: ExternalDocs,
  schemes?: string[],
  consumes?: string[],
  produces?: string[],
  definitions?: {[definitionsName: string]: Schema },
  parameters?: {[parameterName: string]: BodyParameter|QueryParameter},
  responses?: {[responseName: string]: Response },
  security?: {[securityDefinitionName: string]: string[]}[],
  securityDefinitions?: { [securityDefinitionName: string]: Security},
  tags?: Tag[],
}

type SwaggerDocOptions = {
  swaggerDefinition: SwaggerSpecWithoutPath,
  apis: string[],
}

const swaggerTags: Tag[] = [{
  name: 'pet',
  description: 'Everything about your Pets',
  externalDocs: {
    description: 'Find out more',
    url: 'http://swagger.io',
  },
}, {
  name: 'store',
  description: 'Access to Petstore orders',
}, {
  name: 'user',
  description: 'Operations about user',
}]

const swaggerDefinition: {
  [definitionsName: string]: Schema,
} = {
  Order: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
      },
      petId: {
        type: 'integer',
        format: 'int64',
      },
      quantity: {
        type: 'integer',
        format: 'int32',
      },
      shipDate: {
        type: 'string',
        format: 'date-time',
      },
      status: {
        type: 'string',
        description: 'Order Status',
        enum: [
          'placed',
          'approved',
          'delivered',
        ],
      },
      complete: {
        type: 'boolean',
        default: false,
      },
    },
    xml: {
      name: 'Order',
    },
  },
  Category: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
      },
      name: {
        type: 'string',
      },
    },
    xml: {
      name: 'Category',
    },
  },
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
      },
      username: {
        type: 'string',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      phone: {
        type: 'string',
      },
      userStatus: {
        type: 'integer',
        format: 'int32',
        description: 'User Status',
      },
    },
  },
  Tag: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
      },
      name: {
        type: 'string',
      },
    },
  },
  Pet: {
    type: 'object',
    required: [
      'name',
      'photoUrls',
    ],
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
      },
      category: {
        $ref: '#/definitions/Category',
      },
      name: {
        type: 'string',
      },
      photoUrls: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      tags: {
        type: 'array',
        items: {
          $ref: '#/definitions/Tag',
        },
      },
      status: {
        type: 'string',
        description: 'pet status in the store',
        enum: [
          'available',
          'pending',
          'sold',
        ],
      },
    },
  },
  ApiResponse: {
    type: 'object',
    properties: {
      code: {
        type: 'integer',
        format: 'int32',
      },
      type: {
        type: 'string',
      },
      message: {
        type: 'string',
      },
    },
  },
}

const { name: title, version, description, author: contact } = require('../package.json')
const swaggerInfo: Info = {
  title,
  version,
  description,
  contact,
  license: {
    name: 'MIT',
  },
}

// see this specification document before edit
// https://swagger.io/specification/
const options: SwaggerDocOptions = {
  // options for the swagger docs
  swaggerDefinition: {
    info: swaggerInfo,
    host: 'foo.bar.com',
    basePath: '/',
    tags: swaggerTags,
    schemes: ['http'],
    definitions: swaggerDefinition,
  },
  // path to the API documents
  apis: [
    path.resolve(__dirname, './controllers/*.ts'),
  ],
}

// initialize swagger-jsdoc
export const swaggerSpec: Spec = swaggerJsDoc(options)
