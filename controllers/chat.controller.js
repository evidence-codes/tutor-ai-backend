const openai = require('../config/openai.config');

// const chat = async (req, res) => {
//     const history = [];
//     const user_input = req.body?.message;

//     const messages = [];
//     for (const [input_text, completion_text] of history) {
//         messages.push({ role: 'user', content: input_text });
//         messages.push({ role: 'assistant', content: completion_text });
//     }
//     messages.push({ role: 'user', content: user_input });

//     try {
//         const completion = await openai.createChatCompletion({
//             model: 'gpt-3.5-turbo',
//             messages: messages,
//         });

//         const completion_text = completion.data.choices[0].message.content;
//         history.push([user_input, completion_text]);

//         res.status(200).json({
//             chat_res: completion_text,
//         });
//     } catch (err) {
//         res.status(500).json(err?.message || 'An Error Occured!');
//     }
// };
const chat = async (req, res) => {
    const user_input = req.body?.messages;

    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: user_input,
        });
        const completion_text = completion.data.choices[0].message.content;

        res.status(200).json({
            chat_res: completion_text,
        });
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

module.exports = chat;
