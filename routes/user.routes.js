const router = require("express").Router()
const { update } = require("../controllers/user.controller")

router.patch('/:id', update)

router.patch('/forgot-password/:id', update)

module.exports = router;