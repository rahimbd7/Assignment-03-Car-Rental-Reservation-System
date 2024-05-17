import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
  port: process.env.PORT,
  dbUrl: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/test',
}
