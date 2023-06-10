const router = require("express").Router()
const request = require('../controllers/request.controller')

router.post('/', request)

module.exports = router;