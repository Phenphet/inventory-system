const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express.Router()

app.get('/product', async(req, res) => {
    try {
        const result = await prisma.product.findMany({
            select: {
                product_id: true,
                product_name: true,
                product_reorder_level: true,
                product_unit: true
            },
            orderBy: {
                product_id: "desc"
            }
        })

        if(result.length > 0) {
            res.status(200).send({
                message: 'query data product success',
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

app.post('/product/create', async(req, res) => {
    try {
        const data = req.body

        const result = await prisma.product.create({data})

        if (result) {
            res.status(200).send({
                message: 'create data product success',
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

app.put('/product/update/:product_id', async(req, res) => {
    try {
        const product_id = req.params.product_id
        const product_name = req.body.product_name
        const product_reorder_level = req.body.product_reorder_level
        const prodcut_unit = req.body.prodcut_unit

        const result = await prisma.product.update({
            where: {
                product_id: parseInt(product_id)
            },
            data: {
                product_name: product_name,
                product_reorder_level: product_reorder_level,
                product_unit: prodcut_unit
            }
        })

       if (result) {
            res.status(200).send({
                message: 'update data product success',
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

app.delete('/product/delete/:product_id', async(req, res) => {
    try {
        const product_id = req.params.product_id

        const result = await prisma.product.delete({
            where: {
                product_id: parseInt(product_id)
            }
        })

       if (result) {
            res.status(200).send({
                message: 'delete data product success',
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