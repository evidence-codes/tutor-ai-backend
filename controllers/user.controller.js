const User = require("../models/user.model")
const bcrypt = require("bcrypt")

const update = async (req, res) => {
    const salt = await bcrypt.genSalt();

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    res.status(200).json(user)
}

module.exports = { update }