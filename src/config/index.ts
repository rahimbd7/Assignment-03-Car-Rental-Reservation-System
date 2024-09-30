import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
  port: process.env.PORT,
  dbUrl: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/test',
  node_env: process.env.NODE_ENVIRONMENT|| 'development',
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
  access_token_expiresIn: process.env.JWT_ACCESS_SECRET_EXPIRED_IN,
  refresh_token_expiresIn:process.env.JWT_REFRESH_SECRET_EXPIRED_IN
}
