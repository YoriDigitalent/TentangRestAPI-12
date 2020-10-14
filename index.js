import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import router from './router.js'
import userRouter from './controllers/UserController.js'

const app = express()

// Connect to DB
const URI = process.env.MONGODB_URI
mongoose.connect(URI,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }

).then(() => {
    console.log('Connect to DB success')

}).catch(err => {
    console.log('Connect to failed ' + err)
})

//Middleware
app.use(morgan('dev'))
app.use(express.json())

//Routers
app.get('/', (req, res) => {
    res.json({
        message: 'success'
    })
})

app.use('/api', router)
// http://localhost/api/homeworks

app.use('/api/users', userRouter)

//listen to port
const PORT = process.env.PORT || '4000'

app.listen(PORT, () => {
    console.log(`App Listen to port ${PORT}`)
})
