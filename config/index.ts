import { env } from './env'

const config: {[envKey: string]: any} = {
  ...env,
  SERVER_PORT: env.SERVER_PORT ? parseInt(env.SERVER_PORT, 10) : 3000,
  SERVER_HOST: env.SERVER_HOST ? env.SERVER_HOST : '0.0.0.0',
}

export default config
