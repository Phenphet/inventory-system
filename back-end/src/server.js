const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const productController = require('./controller/productController')
const locationController = require('./controller/locationController')
const momentStockController = require('./controller/momentStockController')

app.use('/api', productController)
app.use('/api', locationController)
app.use('/api', momentStockController)

app.get('/', (req, res) => {
    res.json({message: 'Helloworld'})
})

app.listen(port, () => {console.log(`server running port : ${port}`)})