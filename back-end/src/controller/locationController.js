const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express.Router()

app.get('/location', async(req, res) => {
    try {
        const result = await prisma.location.findMany({
            select: {
                location_id: true,
                location_name: true,
            }
        })
        
        if (result.length > 0) {
            res.status(200).send({
                message: 'query data location success',
                data: result
            })
        } else {
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }

    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

app.post('/location/create', async(req, res) => {
    try {
        const data = req.body
        
        const result = await prisma.location.create({data})
        
        if (result) {
            res.status(200).send({
                message: 'create data location success',
                data: result
            })
        } else {
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}) 

app.put('/location/update/:location_id', async(req, res) => {
    try {

        const location_id = req.params.location_id
        const location_name = req.body.location_name
        const location_province = req.body.location_province

        const result = await prisma.location.update({
            where: {
                location_id: parseInt(location_id)
            },
            data: {
                location_name: location_name,
                location_province: location_province
            }
        })

        if (result) {
            res.status(200).send({
                message: 'update data location success',
                data: result
            })
        } else {
            res.status(404).send({
                message: 'somthing worng data not found',
                data: []
            })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

app.delete('/location/delete/:location_id', async(req, res) => {
    try {
        const location_id = req.params.location_id
        const result = await prisma.location.delete({
            where: {
                location_id: parseInt(location_id)
            }
        })

        if (result) {
            res.status(200).send({
                message: 'delete data location success',
                data: result
            })
        } else {
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