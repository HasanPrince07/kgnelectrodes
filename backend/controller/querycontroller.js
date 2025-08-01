const Query = require('../model/query')
const helper = require('../helper/message')

const nodemailer = require('nodemailer')

exports.insertquery = (req, res) => {
    const { name, email, query } = req.body
    try {
        const record = Query({ name: name, email: email, query: query })
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

exports.fetchquery = async (req, res) => {
    try {
        const record = await Query.find()
        const totalquery = await Query.find().count()
        const totalunread = await Query.find({ status: 'unread' }).count()
        const totalread = await Query.find({ status: 'read' }).count()
        res.json({
            status: helper.status200,
            message: helper.message200,
            apidata: record,
            totalquery: totalquery,
            totalunread: totalunread,
            totalread: totalread,
        })
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500,
        })
    }
}

exports.querydelete = async (req, res) => {
    const id = req.params.id
    try {
        await Query.findByIdAndDelete(id)
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

exports.selectquery = async (req, res) => {
    const { query } = req.body
    try {
        const record = await Query.find({ status: query })
        res.json({
            status: helper.status200,
            message: helper.message200,
            apidata: record
        })
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500
        })
    }
}

exports.fetchquerybyid = async (req, res) => {
    const id = req.params.id
    try {
        const record = await Query.findById(id)
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

exports.reply = async (req, res) => {
    const { to, from, subject, body } = req.body
    const id = req.params.id
    if (req.file === undefined) {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: from,
                    pass: "lnhdnirlkaopljvc",
                },
            });
            const info = await transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                text: body,
            });
            await Query.findByIdAndUpdate(id, { status: 'read' })
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
    } else {
        const filepath = req.file.path
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: from,
                    pass: "lnhdnirlkaopljvc",
                },
            });
            const info = await transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                text: body,
                attachments: [{
                    path: filepath
                }]
            });
            await Query.findByIdAndUpdate(id, { status: 'read' })
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
}