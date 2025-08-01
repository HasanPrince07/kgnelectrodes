const Detail = require('../model/detail')
const helper = require('../helper/message')

exports.fetchdetail = async (req, res) => {
    try {
        const record = await Detail.findOne()
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

exports.updatedetailmanagement = async (req, res) => {
    const { firstp, secondp, thirdp, fourthp } = req.body
    try {
        const record = await Detail.findOne()
        const id = record.id
        await Detail.findByIdAndUpdate(id, { firstp: firstp, secondp: secondp, thirdp: thirdp, fourthp: fourthp })
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