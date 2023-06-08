const router = require("express").Router()
const { update, setPassword, forgotPassword } = require("../controllers/user.controller")

router.patch('/:id', update)

router.post('/forgot-password/:id', forgotPassword)

router.patch('/set-password/:id', setPassword)

module.exports = router;