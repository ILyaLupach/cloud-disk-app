import express, { Express } from 'express'
import mongoose from 'mongoose'
import config from 'config'
import authRouter from './routes/auth.routes'
import corsMiddleware from './middleware/cors.middleware'

const app: Express = express()
const PORT = process.env.PORT || config.get('DEV_PORT')

app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRouter)

const startServer = async (): Promise<void> => {
  try {
    mongoose.connect(config.get('dbUri'), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    }, () => console.log('DB connected'))
    app.listen(PORT, () => {
      console.log(`Server run on port ${PORT}`)
    })
  } catch (error) {

  }
}
startServer()
