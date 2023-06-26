const openai = require('../config/openai.config');

const chat = async (req, res) => {
    try {
        const { message } = req.body;

        const chatCompletion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            prompt: 'text',
            messages: [{ role: 'user', content: message }],
        });

        res.status(200).json(chatCompletion.data.choices[0].message);
    } catch (err) {
        console.log('ERROR FROM GPT');
        console.log(err);
        res.status(500).json(err?.message || 'An Error Occured!');
    }

    // try {
    //     const { prompt } = req.body;
    //     const modelId = "gpt-3.5-turbo";
    //     const promptText = `${prompt}\n\nResponse:`;

    //     // Restore the previous context
    //     for (const [inputText, responseText] of conversationContext) {
    //         currentMessages.push({ role: "user", content: inputText });
    //         currentMessages.push({ role: "assistant", content: responseText });
    //     }

    //     // Stores the new message
    //     currentMessages.push({ role: "user", content: promptText });

    //     const result = await openai.createChatCompletion({
    //         model: modelId,
    //         messages: currentMessages,
    //     });
    //     console.log(result.data.choices)

    //     const responseText = result.data.choices.shift().message.content;
    //     conversationContext.push([promptText, responseText]);
    //     res.status(200).json({ response: responseText });
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ message: "Internal server error" });
    // }
};

module.exports = chat;
