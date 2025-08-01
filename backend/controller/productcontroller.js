const Product = require('../model/product')
const helper = require('../helper/message')

exports.addproduct = (req, res) => {
    const image = req.file.filename
    const { name, desc } = req.body
    try {
        const record = new Product({ name: name, desc: desc, image: image })
        record.save()
        res.json({
            status: helper.status201,
            message: helper.message201
        })
    } catch {
        res.json({
            status: helper.status400,
            message: helper.message400
        })
    }
}

exports.fetchproduct = async (req, res) => {
    try {
        const record = await Product.find()
        const totalproduct = await Product.find().count()
        const totalinstock = await Product.find({ status: 'in stock' }).count()
        const totaloutofstock = await Product.find({ status: 'out of stock' }).count()
        res.json({
            status: helper.status200,
            message: helper.message200,
            apidata: record,
            totalproduct: totalproduct,
            totalinstock: totalinstock,
            totaloutofstock: totaloutofstock,
        })
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500,
        })
    }
}

exports.fetchproductbyid = async (req, res) => {
    const id = req.params.id
    try {
        const record = await Product.findById(id)
        res.json({
            status: helper.status200,
            message: helper.message200,
            apidata: record,
        })
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500,
        })
    }
}

exports.productdelete = async (req, res) => {
    const id = req.params.id
    try {
        await Product.findByIdAndDelete(id)
        res.json({
            status: helper.status200,
            message: helper.message200
        })
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500
        })
    }
}

exports.productstatus = async (req, res) => {
    const id = req.params.id
    try {
        const record = await Product.findById(id)
        let newstatus = null
        if (record.status === 'in stock') {
            newstatus = 'out of stock'
        } else {
            newstatus = 'in stock'
        }
        await Product.findByIdAndUpdate(id, { status: newstatus })
        res.json({
            status: helper.status200,
            message: helper.message200
        })
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500
        })
    }
}