const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.json({message: 'Helloworld'})
})

app.listen(port, () => {console.log(`server running port : ${port}`)})