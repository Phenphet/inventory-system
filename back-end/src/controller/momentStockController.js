const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express.Router()

app.get('/movement', async(req, res) => {
    try { 
        const result = await prisma.stockmovement.findMany({
            select: {
                movement_id: true,
                product: {
                    select: {
                        product_id: true,
                        product_name: true
                    }
                },
                quantity: true,
                source_location: true,
                destination_location: true,
                reference_number: true,
                remarks: true,
                movement_date: true
            },
            orderBy: {
                movement_id: 'desc'
            }
        })

        if(result.length > 0){
            res.status(200).send({
                message: 'query data stockmovement success',
                data: result
            })
        }else{ 
             res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

app.get('/movement/source', async(req, res) => {
    try {
        const movement_type = "INT"

        const result = await prisma.stockmovement.findMany({
            where: {
                movement_type: movement_type
            },
            orderBy: {
                movement_id: 'desc'
            }
        })

        if(result.length > 0) {
            res.status(200).send({
                message: 'query data stockmovement source location success',
                data: result
            })
        }else {
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

app.post('/movement/create/source', async(req, res) => {
    try {
        const product_id = req.body.product_id
        const movement_type = req.body.movement_type
        const quantity = "INT"
        const movement_date = new Date(req.body.movement_date)
        const reference_number = req.body.reference_number
        const remarks = req.body.remarks
        const source_location_id = req.body.source_location_id

        const result = await prisma.stockmovement.create({
            data: {
                product_id: parseInt(product_id),
                movement_type: movement_type,
                quantity: parseInt(quantity),
                movement_date: movement_date,
                reference_number: reference_number,
                remarks: remarks,
                source_location_id: parseInt(source_location_id)
            }
        })

        if(result){ 
            res.status(200).send({
                message: 'create data stockmovement source success',
                data: result
            })
        }else{
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch(error) {
        console.log(error.message)
        res.status(500).send({error: error.message})
    }
})

app.put('/movement/update/source/:movement_id', async(req, res) => {
    try {
        const movement_id = req.params.movement_id
        const product_id = req.body.product_id
        const movement_type = "IN"
        const quantity = req.body.quantity
        const movement_date = new Date(req.body.movement_date)
        const reference_number = req.body.reference_number
        const remarks = req.body.remarks
        const source_location_id = req.body.source_location_id

        const result = await prisma.stockmovement.update({
            where: {
                movement_id: parseInt(movement_id)
            },
            data: {
                product_id: parseInt(product_id),
                movement_type: movement_type,
                quantity: parseInt(quantity),
                movement_date: movement_date,
                reference_number: reference_number,
                remarks: remarks,
                source_location_id: parseInt(source_location_id)
            }
        })

        if(result){ 
            res.status(200).send({
                message: 'update data stockmovement source success',
                data: result
            })
        }else{
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error: error.message})
    }
})

app.delete('/movement/delete/source/:movment_id', async(req, res) => {
    try {
        const movement_id = req.params.movment_id

        const result = await prisma.stockmovement.delete({
            where: {
                movement_id: parseInt(movement_id)
            }
        })

         if(result){ 
            res.status(200).send({
                message: 'delete data stockmovement source success',
                data: result
            })
        }else{
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})
app.get('/movement/destination', async(req, res) => {
    try {
        const movement_type = "OUT"
        const result = await prisma.stockmovement.findMany({
            where: {
                movement_type: movement_type
            },
            orderBy: {
                movement_id: 'desc'
            }
        })
        
        if(result.length > 0) {
            res.status(200).send({
                message: 'query data destination success',
                data: result
            })
        }
        else {
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch(error) {
        res.status(500).send({error: error.message})
    }

})

app.post('/movement/create/destination', async(req, res) => {
    try {
        const product_id = req.body.product_id
        const movement_type = "OUT"
        const quantity = req.body.quantity
        const movement_date = new Date(req.body.movement_date)
        const reference_number = req.body.reference_number
        const remarks = req.body.remarks
        const source_location_id = req.body.source_location_id


        const result = await prisma.stockmovement.create({
            data: {
                product_id: parseInt(product_id),
                movement_type: movement_type,
                quantity: parseInt(quantity),
                movement_date: movement_date,
                reference_number: reference_number,
                remarks: remarks,
                source_location_id: parseInt(source_location_id)
            }
        })
        if(result){
            res.status(200).send({
                message: 'create data stockmovement destination success',
                data: result
            })
        }else{
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error: error.message})
    }
})

app.put('/movement/update/destination/:movement_id', async(req, res) => {
    try {
        const movement_id = req.params.movement_id
        const product_id = req.body.product_id
        const movement_type = "OUT"
        const quantity = req.body.quantity
        const movement_date = new Date(req.body.movement_date)
        const reference_number = req.body.reference_number
        const remarks = req.body.remarks
        const source_location_id = req.body.source_location_id


        const result = await prisma.stockmovement.update({
            where: {
                movement_id: parseInt(movement_id)
            },
            data: {
                product_id: parseInt(product_id),
                movement_type: movement_type,
                quantity: parseInt(quantity),
                movement_date: movement_date,
                reference_number: reference_number,
                remarks: remarks,
                source_location_id: parseInt(source_location_id)
            }
        })
        if(result){
            res.status(200).send({
                message: 'create data stockmovement destination success',
                data: result
            })
        }else{
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

app.delete('/movement/delete/destination/:movement_id', async(req, res) => {
    try {
        const movement_id = req.params.movement_id

        const result = await prisma.stockmovement.delete({
            where: {
                movement_id: parseInt(movement_id)
            }
        })

         if(result){ 
            res.status(200).send({
                message: 'delete data stockmovement source success',
                data: result
            })
        }else{
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})


app.get('/movement/tranfer', async(req, res) => {
    try {
        const movement_type = "TRANFER"

        const result = await prisma.stockmovement.findMany({
            where: {
                movement_type: movement_type
            },
            orderBy: {
                movement_id: 'desc'
            }
        })
        
        if(result.length > 0) {
            res.status(200).send({
                message: 'query data stock transfer success',
                data: result
            })
        }else{
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

app.post('/movement/create/tranfer', async(req, res) => {
    try { 
        const product_id = req.body.product_id
        const movement_type = "TRANFER"
        const quantity = req.body.quantity
        const movement_date = new Date(req.body.movement_date)
        const reference_number = req.body.reference_number
        const remarks = req.body.remarks
        const destination_location_id = req.body.destination_location_id
        const source_location_id = req.body.source_location_id

        const result = await prisma.stockmovement.create({
            data: {
                product_id: parseInt(product_id),
                movement_type: movement_type,
                quantity: parseInt(quantity),
                movement_date: movement_date,
                reference_number: reference_number,
                remarks: remarks,
                destination_location_id: parseInt(destination_location_id),
                source_location_id: parseInt(source_location_id)
            }
        })
        if(result) {
            res.status(200).send({
                message: 'create data stocktransfer success',
                data: result
            })
        }else{
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
                
            })
        }

    } catch (error) {   
        res.status(500).send({error: error.messge})
    }
})


app.put('/movement/update/tranfer/:movement_id', async(req, res) => {
    try {
        const movement_id = req.params.movement_id
        const product_id = req.body.product_id
        const movement_type = "TRANFER"
        const quantity = req.body.quantity
        const movement_date = new Date(req.body.movement_date)
        const reference_number = req.body.reference_number
        const remarks = req.body.remarks
        const destination_location_id = req.body.destination_location_id
        const source_location_id = req.body.source_location_id

        const result = await prisma.stockmovement.create({
            where: {
                movement_id: parseInt(movement_id)
            },
            data: { 
                product_id: parseInt(product_id),
                movement_type: movement_type,
                quantity: parseInt(quantity),
                movement_date: movement_date,
                reference_number: reference_number,
                remarks: remarks,
                destination_location_id: parseInt(destination_location_id),
                source_location_id: parseInt(source_location_id)
            }
        })

        if(result){
            res.status(200).send({
                message: 'update data stock transfer success',
                data: result
            })
        }else{
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

app.delete('/movement/update/tranfer/:movement_id', async(req, res) => {
    try { 
        const movement_id  = req.params.movement_id

        const result = await prisma.stockmovement.delete({
            where: {
                movement_id: parseInt(movement_id)
            }
        })
        if(result){
            res.status(200).send({
                message: 'delete data stock transfer success',
                data: result
            })
        }else{
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

module.exports = app