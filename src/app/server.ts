import mongoose from 'mongoose'
import app from './app'
import config from '../config'

async function main() {
  try {
    await mongoose.connect(config.dbUrl as string)
    app.listen(config.port, () => {
      console.log(`Server running. Use our API on port: ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
main()
