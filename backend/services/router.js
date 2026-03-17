const classifyQuery = async (message) => {
    const lower = message.toLowerCase();

    if (/\b(code|debug|function|error|syntax|programming|javascript|python|bug|html|css|react|node|api)\b/.test(lower)) {
        return { model: 'claude', reason: 'Detected programming/coding intent' };
    }
    if (/\b(math|equation|calculus|integral|derivative|statistics|probability|solve|formula|physics|logic|reasoning|deepseek|2\+2|calculate)\b/.test(lower)) {
        return { model: 'deepseek', reason: 'Detected mathematical/logical reasoning or explicit DeepSeek invocation' };
    }
    if (/\b(research paper|in-depth|comprehensive|deep dive|analysis|statistics on|trends in|history of|scientific study|literature review|detailed explanation|academic|thesis|complex|elaborate)\b/.test(lower)) {
        return { model: 'perplexity', reason: 'Detected deep research/complex subject intent' };
    }
    if (/\b(price|stock|market|crypto|bitcoin|finance|invest|nasdaq|trend|business|economy|latest news|trending|current events|breaking|viral|what's happening)\b/.test(lower)) {
        return { model: 'grok', reason: 'Detected current events/trendy/market intent' };
    }
    if (/\b(image|picture|visual|photo|draw|generate image|describe image|look at|design|ui|ux)\b/.test(lower)) {
        return { model: 'gemini', reason: 'Detected visual/multimodal/design intent' };
    }
    if (/\b(write|draft|essay|grammar|summarize|creative|story|poem|translate)\b/.test(lower)) {
        return { model: 'claude', reason: 'Detected writing/creative intent' };
    }

    // Default fallback if not matched by specific complex keywords
    // For regular educational, weather, general info, definitions, etc.
    return { model: 'chatgpt', reason: 'General info/educational/weather/basic query' };
};

module.exports = { classifyQuery };
