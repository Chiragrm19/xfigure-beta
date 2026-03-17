const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

async function test() {
    const key = process.env.DEEPSEEK_API_KEY;
    console.log("DeepSeek Key present:", !!key);

    if (!key || key.startsWith('your_')) return;

    try {
        const response = await axios.post("https://api.deepseek.com/chat/completions", {
            model: "deepseek-chat",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Hello, are you there?" }
            ],
            stream: false
        }, {
            headers: {
                "Authorization": `Bearer ${key}`,
                "Content-Type": "application/json"
            }
        });

        console.log("DeepSeek Success:", response.data.choices[0].message.content);
    } catch (error) {
        console.error("DeepSeek Error:", error.response?.data || error.message);
    }
}

test();
