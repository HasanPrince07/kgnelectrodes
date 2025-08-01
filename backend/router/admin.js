const router = require('express').Router()
const userC = require('../controller/usercontroller')
const mainimageC = require('../controller/mainimagecontroller')
const detailC = require('../controller/detailcontroller')
const aboutC = require('../controller/aboutcontroller')
const testiC = require('../controller/testicontroller')
const productC = require('../controller/productcontroller')
const queryC = require('../controller/querycontroller')
const footerC = require('../controller/footercontroller')
const careerC = require('../controller/careercontroller')
const jwt = require('jsonwebtoken')
const jwtkey = 'kgnelectrodessecretkey'

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }
})

function handletoken(req, res, next) {
    let token = req.headers.authorization
    let newtoken = token.split(' ')[1]
    if (newtoken !== 'null') {
        jwt.verify(newtoken, jwtkey, (err, valid) => {
            if (err) {
                res.json({
                    status: 401,
                    message: 'please add a valid token'
                })
            } else {
                next()
            }
        })
    } else {
        res.json({
            status: 402,
            message: 'First you have to login'
        })
    }
}

router.post('/login', userC.login)
router.post('/changepassword', userC.changepassword)
router.get('/forgotpassword', userC.forgotpassword)
router.post('/frgtpass', userC.frgtpass)

router.get('/fetchimage', mainimageC.fetchimage)
router.put('/updatemainmanagement', handletoken, upload.single('file'), mainimageC.updateimage)

router.get('/fetchdetail', detailC.fetchdetail)
router.put('/updatedetailmanagement', handletoken, detailC.updatedetailmanagement)

router.get('/fetchabout', aboutC.fetchabout)
router.put('/updateabout', handletoken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'himage', maxCount: 1 }, { name: 'timage1', maxCount: 1 }, { name: 'timage2', maxCount: 1 }, { name: 'timage3', maxCount: 1 }]), aboutC.updateabout)

router.get('/fetchtesti', handletoken, testiC.fetchtesti)
router.put('/testistatus/:id', handletoken, testiC.testistatus)
router.delete('/testidelete/:id', handletoken, testiC.testidelete)

router.post('/addproduct', handletoken, upload.single('image'), productC.addproduct)
router.get('/fetchproduct', handletoken, productC.fetchproduct)
router.delete('/productdelete/:id', handletoken, productC.productdelete)
router.put('/productstatus/:id', handletoken, productC.productstatus)

router.get('/fetchquery', handletoken, queryC.fetchquery)
router.delete('/querydelete/:id', handletoken, queryC.querydelete)
router.post('/selectquery', handletoken, queryC.selectquery)
router.get('/fetchquerybyid/:id', queryC.fetchquerybyid)
router.post('/reply/:id', handletoken, upload.single('file'), queryC.reply)

router.get('/fetchfooter', footerC.fetchfooter)
router.put('/updatefooter', handletoken, footerC.updatefooter)

router.get('/fetchcareer', handletoken, careerC.fetchcareer)
router.delete('/careerdelete/:id', handletoken, careerC.careerdelete)
router.post('/selectmessage', handletoken, careerC.selectmessage)
router.get('/fetchcareerbyid/:id', careerC.fetchcareerbyid)
router.post('/careerreply/:id', handletoken, upload.single('file'), careerC.careerreply)

module.exports = router