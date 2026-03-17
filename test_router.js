const { classifyQuery } = require('./backend/services/router');

async function test() {
    const queries = [
        "Explain how react works",
        "What is the history of Rome?",
        "Who built the pyramids",
        "How do I learn python?",
        "Write a poem about the sea",
        "What's the meaning of life?",
        "Debug this error in my console",
        "Is it going to rain today?",
        "Just a regular question"
    ];

    for (const q of queries) {
        const res = await classifyQuery(q);
        console.log(`"${q}" -> ${res.model}`);
    }
}

test();
