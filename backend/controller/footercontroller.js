const Footer = require('../model/footer')
const helper = require('../helper/message')

exports.fetchfooter = async (req, res) => {
    try {
        const record = await Footer.findOne()
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

exports.updatefooter = async (req, res) => {
    const { email, number, address, facebook, messanger, twitter } = req.body
    try {
        const record = await Footer.findOne()
        const id = record.id
        await Footer.findByIdAndUpdate(id, { email: email, number: number, address: address, facebook: facebook, messanger: messanger, twitter: twitter })
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