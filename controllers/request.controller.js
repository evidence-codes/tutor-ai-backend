const openai = require("../config/openai.config")

const request = async (req, res) => {

    try {
        const { message } = req.body

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `` }]
        })

        res.status(200).json(response.data.choices[0].message.content)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = request;