const router = require("express").Router()
const { register, login, password } = require("../controllers/auth.controller")

router.post('/register', register)

router.post('/passwords', password)

router.post('/login', login)

module.exports = router;