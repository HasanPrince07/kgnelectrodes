const Testi = require('../model/testi')
const helper = require('../helper/message')

exports.fetchtesti = async (req, res) => {
    try {
        const record = await Testi.find()
        const filterrecord = await Testi.find({ status: 'publish' })
        const totalreview = await Testi.find().count()
        const totalpublish = await Testi.find({ status: 'publish' }).count()
        const totalunpublish = await Testi.find({ status: 'unpublish' }).count()
        res.json({
            status: helper.status200,
            message: helper.message200,
            apidata: record,
            filterrecord: filterrecord,
            reviewrecord: totalreview,
            publishrecord: totalpublish,
            unpublishrecord: totalunpublish,
        })
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500,
        })
    }
}

exports.addtesti = (req, res) => {
    const { name, desc } = req.body
    try {
        const record = Testi({ name: name, desc: desc })
        record.save()
        res.json({
            status: helper.status201,
            message: helper.message201,
        })
    } catch {
        res.json({
            status: helper.status400,
            message: helper.message400,
        })
    }
}

exports.testistatus = async (req, res) => {
    const id = req.params.id
    try {
        const record = await Testi.findById(id)
        let newstatus = null
        if (record.status === 'unpublish') {
            newstatus = 'publish'
        } else {
            newstatus = 'unpublish'
        }
        await Testi.findByIdAndUpdate(id, { status: newstatus })
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

exports.testidelete = async (req, res) => {
    const id = req.params.id
    try {
        await Testi.findByIdAndDelete(id)
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