const router = require("express").Router()
const { update, setPassword, forgotPassword } = require("../controllers/user.controller")

router.patch('/:id', update)

router.post('/:id/forgot-password', forgotPassword)

router.patch('/:id/set-password', setPassword)

module.exports = router;