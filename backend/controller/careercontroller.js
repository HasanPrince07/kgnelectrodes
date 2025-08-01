const Career = require('../model/career')
const helper = require('../helper/message')
const nodemailer = require('nodemailer')

exports.fetchcareer = async (req, res) => {
    try {
        const record = await Career.find()
        const totalmessage = await Career.find().count()
        const unreadmessage = await Career.find({ status: 'unread' }).count()
        const readmessage = await Career.find({ status: 'read' }).count()
        res.json({
            status: helper.status200,
            message: helper.message200,
            apidata: record,
            totalmessage: totalmessage,
            unreadmessage: unreadmessage,
            readmessage: readmessage,
        })
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500,
        })
    }
}

exports.careerdelete = async (req, res) => {
    const id = req.params.id
    try {
        await Career.findByIdAndDelete(id)
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

exports.addcareer = (req, res) => {
    const { name, email, number, experience, message } = req.body
    try {
        const record = Career({ name: name, email: email, number: number, experience: experience, message: message })
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

exports.selectmessage = async (req, res) => {
    const { select } = req.body
    try {
        const record = await Career.find({ status: select })
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

exports.fetchcareerbyid = async (req, res) => {
    const id = req.params.id
    try {
        const record = await Career.findById(id)
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

exports.careerreply = async (req, res) => {
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
            await Career.findByIdAndUpdate(id, { status: 'read' })
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
            await Career.findByIdAndUpdate(id, { status: 'read' })
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

exports.careerreply = async (req, res) => {
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
            await Career.findByIdAndUpdate(id, { status: 'read' })
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
            await Career.findByIdAndUpdate(id, { status: 'read' })
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