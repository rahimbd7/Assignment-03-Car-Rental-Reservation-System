import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import Routes from './routes'

const app: Application = express()

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('hello world')
})


app.use('/api',Routes)
export default app
