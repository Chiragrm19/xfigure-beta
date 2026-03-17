const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

async function test() {
    const key = process.env.GEMINI_API_KEY;
    console.log("Key present:", !!key);

    const genAI = new GoogleGenerativeAI(key);

    const models = ["gemini-2.0-flash", "gemini-2.0-pro", "gemini-1.5-flash-latest"];

    for (const m of models) {
        console.log(`Testing ${m}...`);
        try {
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Hello");
            console.log(`SUCCESS with ${m}:`, await result.response.text());
            return;
        } catch (e) {
            console.log(`FAILED ${m}: ${e.message}`);
        }
    }
}

test();
