const router = require("express").Router()
const { updateLevel } = require("../controllers/scores.controller")
const { update, setPassword, forgotPassword } = require("../controllers/user.controller")

router.patch('/:id', update)

router.post('/forgot-password/:id', forgotPassword)

router.patch('/set-password/:id', setPassword)

router.post('/update-level/:id', updateLevel)

module.exports = router;