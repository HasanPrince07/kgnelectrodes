const About = require('../model/about')
const helper = require('../helper/message')

exports.fetchabout = async (req, res) => {
    try {
        const record = await About.findOne()
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

exports.updateabout = async (req, res) => {
    const image = req.files.image[0].filename
    const himage = req.files.himage[0].filename
    const timage1 = req.files.timage1[0].filename
    const timage2 = req.files.timage2[0].filename
    const timage3 = req.files.timage3[0].filename
    const { desc, hdesc, tdesc } = req.body
    try {
        const record = await About.findOne()
        const id = record.id
        await About.findByIdAndUpdate(id, { desc: desc, hdesc: hdesc, tdesc: tdesc, image: image, himage: himage, timage1: timage1, timage2: timage2, timage3: timage3 })
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