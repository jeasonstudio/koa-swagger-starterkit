import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// First setup environment config
const NODE_ENV: string = process.env.NODE_ENV = process.env.NODE_ENV || 'production'
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  )
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const pathToDotEnv: string = path.resolve(__dirname, '../.env')
const dotenvFiles: string[] = [
  `${pathToDotEnv}.${NODE_ENV}.local`,
  `${pathToDotEnv}.${NODE_ENV}`,
  `${pathToDotEnv}.local`,
  pathToDotEnv,
]
// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    // inject env variables from .env* files to `process.env`
    dotenv.config({ path: dotenvFile })
  }
})

export const env = process.env
