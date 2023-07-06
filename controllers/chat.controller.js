const openai = require('../config/openai.config');

const chat = async (req, res) => {
    // try {
    //     const { message } = req.body;

    //     const chatCompletion = await openai.createChatCompletion({
    //         model: 'gpt-3.5-turbo',
    //         prompt: 'text',
    //         messages: [{ role: 'user', content: message }],
    //     });

    //     res.status(200).json(chatCompletion.data.choices[0].message);
    // } catch (err) {
    //     console.log('ERROR FROM GPT');
    //     console.log(err);
    //     res.status(500).json(err?.message || 'An Error Occured!');
    // }

    const history = [];
    const user_input = req.body?.message;

    const messages = [];
    for (const [input_text, completion_text] of history) {
        messages.push({ role: "user", content: input_text });
        messages.push({ role: "assistant", content: completion_text });
    }

    messages.push({ role: "user", content: user_input });

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const completion_text = completion.data.choices[0].message.content;
        console.log(completion_text);

        history.push([user_input, completion_text]);

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
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
