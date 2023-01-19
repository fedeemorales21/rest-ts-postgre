import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import routeIndex from './routes/index.routes'

config()
const app = express()

app.set("PORT", process.env.PORT || 3000)
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(routeIndex)

export default app
