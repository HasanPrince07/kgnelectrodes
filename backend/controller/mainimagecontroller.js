const Mainimage = require('../model/mainimage')
const helper = require('../helper/message')

exports.fetchimage = async (req, res) => {
    try {
        const record = await Mainimage.findOne()
        res.json({
            status: helper.status200,
            message: helper.message200,
            apidata: record
        })
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500,
        })
    }
}

exports.updateimage = async (req, res) => {
    const filename = req.file.filename
    try {
        const record = await Mainimage.findOne()
        const id = record.id
        await Mainimage.findByIdAndUpdate(id, { image: filename })
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