import { createPool, PoolConnection, Pool } from 'promise-mysql'
import { createParamDecorator } from 'routing-controllers'
import config from '../../config'

const {
  DEBUG_MYSQL, DB_HOST, DB_PORT, DB_USER, DB_PASS,
} = config

// Create the Database connection pool
export const databaseConnectionPool: Pool = createPool({
  debug: DEBUG_MYSQL === 'true',
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  connectionLimit: 10,
  // Enabling both supportBigNumbers and bigNumberStrings forces big numbers
  // (BIGINT and DECIMAL columns) to be always returned as JavaScript String
  // objects.
  supportBigNumbers: true,
  bigNumberStrings: true,
})

// Custom parameter decorators for mysql connection service
// tslint:disable-next-line:function-name
export function DB(): Function {
  let poolConnection: PoolConnection
  databaseConnectionPool
    .getConnection()
    .then(con => (poolConnection = con))
    .lastly(() => {
      if (poolConnection) poolConnection.release()
    })
  return createParamDecorator({
    required: false,
    value: () => poolConnection,
  })
}
