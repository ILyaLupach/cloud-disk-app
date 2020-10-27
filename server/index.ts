import express, { Express } from 'express'
import mongoose from 'mongoose'
import config from 'config'
import fileUpload from 'express-fileupload'
import corsMiddleware from './middleware/cors.middleware'

import authRouter from './routes/auth.routes'
import fileRouter from './routes/file.routes'

const app: Express = express()
const PORT = process.env.PORT || config.get('DEV_PORT')

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

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
