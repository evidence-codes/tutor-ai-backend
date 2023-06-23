const { ResourceNotFound } = require("../errors/httpErrors");
const User = require("../models/user.model")

const updateLevel = async (req, res) => {
    try {
        const { level } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) throw new ResourceNotFound('User does not exist');

        user.level = level;

        await user.save();

        res.status(200).json({ message: "User Level updated successfully" })
    } catch (err) {
        res.status(500).json(err)
    }

}

module.exports = { updateLevel }