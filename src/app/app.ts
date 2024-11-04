/* eslint-disable no-undef */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import Routes from './routes'
import path from 'path'

const app: Application = express()

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/api', Routes)
export default app
