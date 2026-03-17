const { callAI } = require("./services/aiService");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

async function verify() {
    console.log("=== Verification Start ===");

    const tests = [
        { model: 'gemini', msg: 'Hello Gemini!' },
        { model: 'deepseek', msg: 'Hello DeepSeek!' },
        { model: 'chatgpt', msg: 'Hello ChatGPT!' },
        { model: 'claude', msg: 'Hello Claude!' },
        { model: 'perplexity', msg: 'Hello Perplexity!' },
        { model: 'invalid', msg: 'Hello Invalid!' }
    ];

    for (const t of tests) {
        console.log(`\nTesting Model: ${t.model}`);
        try {
            const resp = await callAI(t.model, t.msg);
            console.log(`Response Preview: ${resp.substring(0, 50)}...`);
            if (resp.includes('[') && resp.includes(']')) {
                console.log("STATUS: Mock Fallback Active (with error info)");
            } else {
                console.log("STATUS: Real API Response Received!");
            }
        } catch (e) {
            console.error(`CRITICAL FAILURE for ${t.model}:`, e.message);
        }
    }

    console.log("\n=== Verification End ===");
}

verify();
