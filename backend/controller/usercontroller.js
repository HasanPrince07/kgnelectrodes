const User = require('../model/user')
const helper = require('../helper/message')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const jwtkey = 'kgnelectrodessecretkey'

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const record = await User.findOne({ username: username })
        if (record !== null) {
            if (record.password === password) {
                jwt.sign({ record }, jwtkey, { expiresIn: '2h' }, (err, token) => {
                    if (err) {
                        res.json({
                            status: helper.status500,
                            message: helper.message500
                        })
                    } else {
                        res.json({
                            status: helper.status200,
                            message: helper.message200,
                            apidata: record,
                            token: token
                        })
                    }
                })
            } else {
                res.json({
                    status: helper.status400,
                    message: helper.message400
                })
            }
        } else {
            res.json({
                status: helper.status400,
                message: helper.message400
            })
        }
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500
        })
    }
}

exports.changepassword = async (req, res) => {
    const { cpass, npass } = req.body
    try {
        const record = await User.findOne()
        const id = record.id
        if (record.password === cpass) {
            await User.findByIdAndUpdate(id, { password: npass })
            res.json({
                status: helper.status200,
                message: helper.message200
            })
        } else {
            res.json({
                status: helper.status400,
                message: helper.message400
            })
        }
    } catch {
        res.json({
            status: helper.status500,
            message: helper.message500
        })
    }
}

exports.forgotpassword = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'hasandeveloper07@gmail.com',
                pass: "lnhdnirlkaopljvc",
            },
        });
        const info = await transporter.sendMail({
            from: 'hasandeveloper07@gmail.com',
            to: 'hasanprince0786@gmail.com',
            subject: 'Link for password change',
            text: 'body',
            html: '<a href=`http://localhost:3000/forgotlink`>click here to change password</a>'
        });
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

exports.frgtpass = async (req, res) => {
    const { npass } = req.body
    try {
        const record = await User.findOne()
        const id = record.id
        await User.findByIdAndUpdate(id, { password: npass })
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