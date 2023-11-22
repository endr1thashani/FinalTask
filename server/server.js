const express = require('express')
const cors = require('cors')
const categoryRouter = require('./routes/categoryRouter.js')
const courseRouter = require('./routes/courseRouter.js')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/category', categoryRouter)
app.use('/course', courseRouter)



const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})