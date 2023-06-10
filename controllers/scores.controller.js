const { ResourceNotFound } = require("../errors/httpErrors");
const User = require("../models/user.model")

const updateLevel = async (req, res) => {
    try {
        const { score } = req.body;

        const user = await User.findById(req.params.id)
        if (!user) throw new ResourceNotFound('User not found');

        const currentLevelIndex = User.schema.path('level').enumValues.indexOf(user.level);

        if (Number(score) >= 5 && currentLevelIndex < User.schema.path('level').enumValues.length - 1) {
            user.level = User.schema.path('level').enumValues[currentLevelIndex + 1];
            await user.save()
            res.status(200).json('User level updated...')
        } else {
            res.status(200).json('Score does not meet the criteria for leveling up..')
        }
    } catch (err) {
        res.status(500).json(err)
    }

}

module.exports = { updateLevel }