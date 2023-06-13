const router = require("express").Router()
const { updateLevel } = require("../controllers/scores.controller")
const { update, setPassword, forgotPassword, setLanguage } = require("../controllers/user.controller")

router.patch('/:id', update)

router.post('/forgot-password/:id', forgotPassword)

router.patch('/set-password/:id', setPassword)

router.post('/update-level/:id', updateLevel)

router.post('/language/:id', setLanguage)

module.exports = router;