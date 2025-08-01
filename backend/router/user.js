const router = require('express').Router()

const mainimageC = require('../controller/mainimagecontroller')
const detailC = require('../controller/detailcontroller')
const aboutC = require('../controller/aboutcontroller')
const testiC = require('../controller/testicontroller')
const productC = require('../controller/productcontroller')
const queryC = require('../controller/querycontroller')
const footerC = require('../controller/footercontroller')
const careerC = require('../controller/careercontroller')

router.get('/fetchimage', mainimageC.fetchimage)

router.get('/fetchdetail', detailC.fetchdetail)

router.get('/fetchabout', aboutC.fetchabout)

router.post('/addtesti', testiC.addtesti)
router.get('/fetchtesti', testiC.fetchtesti)

router.get('/fetchproduct', productC.fetchproduct)
router.get('/fetchproductbyid/:id', productC.fetchproductbyid)

router.post('/insertquery', queryC.insertquery)

router.get('/fetchfooter', footerC.fetchfooter)

router.post('/addcareer', careerC.addcareer)

module.exports = router