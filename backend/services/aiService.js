// aiService.js — Smart contextual response generator
// Each model has its own tone/personality and responds based on the question content.
// Swap any function body for a real API call when you have the key.

const generateContextualResponse = (model, message) => {
    const q = message.trim();
    const firstWord = q.split(' ')[0].toLowerCase();

    const intros = {
        chatgpt: [
            "Great question! Here's a clear explanation:",
            "Happy to help with that! Let me break it down:",
            "Sure! Here's what you need to know:"
        ],
        claude: [
            "Let me think through this carefully.",
            "I'll walk you through this step by step.",
            "Here's a thorough breakdown of your question:"
        ],
        perplexity: [
            "Based on extensive research and multiple sources:",
            "After cross-referencing recent literature and data:",
            "Here's a comprehensive deep-dive into this topic:"
        ],
        grok: [
            "Jumping straight to what's trending on this:",
            "Real-time pulse on this topic:",
            "Here's the latest take based on current signals:"
        ],
        gemini: [
            "From a multimodal, creative perspective:",
            "Looking at this visually and contextually:",
            "Here's an imaginative and structured take:"
        ],
        deepseek: [
            "Applying rigorous mathematical reasoning:",
            "Working through this analytically:",
            "From a first-principles approach:"
        ]
    };

    const bodies = {
        chatgpt: [
            `"${q}" is a great general question. In simple terms, the core idea involves breaking down the concept to its fundamentals. Most experts agree on a few key principles: clarity of thought, iterative understanding, and connecting new knowledge to what you already know. The key takeaway is to approach it methodically and not be afraid to ask follow-ups.`,
            `This is something a lot of people wonder about. At its heart, "${q}" touches on ideas that are well-documented and widely understood. The most effective way to think about it is in layers — start with the broad strokes and then drill into specifics as needed.`,
            `To answer "${q}" correctly — you're dealing with something that spans multiple areas. The short version: it depends on context, but the general principle holds across most cases. Here's the reliable framework most people use to tackle this kind of question.`
        ],
        claude: [
            `Your question — "${q}" — is nuanced and deserves a careful answer. Let me unpack it. First, there's the immediate surface-level interpretation: what you're literally asking. Second, there's a deeper implication that often gets overlooked. When you combine both layers, the answer becomes: it's a balance between efficiency and correctness, and the right answer depends on your specific constraints and context.`,
            `I appreciate the thoughtfulness in this question. "${q}" actually connects to several important ideas. The first thing to clarify is the scope — are we talking about the general case, or a specific scenario? In the general case, the approach is X. In specific contexts, it varies significantly. I'd recommend starting with the foundational concepts and building your understanding from there.`,
            `This is exactly the kind of question where nuance matters. For "${q}", there are at minimum three perspectives worth considering: (1) the practical perspective, where you optimize for what works now; (2) the principled perspective, where you look for the most correct approach; and (3) the pragmatic middle ground most practitioners land on.`
        ],
        perplexity: [
            `Based on recent research and multiple high-quality sources regarding "${q}": The scholarly consensus (supported by studies from 2022–2024) indicates a multi-faceted answer. Key findings include: (a) the primary mechanism is well-established in peer-reviewed work, (b) recent developments have refined our understanding, and (c) there are still open questions in the field. Sources include academic papers, reputable news outlets, and domain expert analysis. Here is a synthesized summary of what's known and what remains uncertain.`,
            `Cross-referencing multiple authoritative sources on "${q}": According to recent literature, the phenomenon is best explained by a combination of systemic and contextual factors. Data from multiple independent studies corroborate the main findings. The most cited explanation involves three main components, each supported by empirical evidence. Notable dissenting views exist but represent a minority position in the research community.`,
            `After a deep dive into this topic — "${q}" — here are the most reliable findings: Primary sources confirm the core premise. Secondary analysis suggests nuances that popular media often misses. The historical context is also important to understand how we arrived at the current understanding. All claims below are traceable to verifiable sources.`
        ],
        grok: [
            `Hot take on "${q}": This is trending for a reason. Right now, the conversation around this is split — one camp says X, another is pushing back hard with Y. The signal I'm seeing in real-time data leans toward X winning out, but the momentum could shift. What's interesting is the underlying driver: it's not just the surface issue, it's the broader macro trend that's been building for months. Watch this space.`,
            `Current vibe on "${q}" — everyone's talking about it and here's why: it taps into something people actually care about right now. The dominant narrative is X, but the contrarian view (which is gaining traction) says Y. If you want to stay ahead of the curve, the early signals say focus on Z. This is moving fast so the picture may shift within days.`,
            `Real-time reading on "${q}": The market/social/cultural signal is clear — this matters right now. Three things happening simultaneously that explain the buzz: (1) the underlying data shifted recently, (2) key influencers are amplifying it, and (3) there's a structural reason this isn't going away. Here's my honest, unfiltered take based on what's actually happening.`
        ],
        gemini: [
            `Looking at "${q}" through a multidimensional lens: visually, conceptually, and creatively, this question opens up really interesting territory. The most elegant framing I can offer is this mental model — imagine the subject as a canvas where each element plays a distinct compositional role. The color palette of ideas here includes: the analytical (left-brain), the intuitive (right-brain), and the emergent whole they form together. This synthesis leads to an answer that's both rigorous and imaginative.`,
            `"${q}" is a rich prompt for visual and creative thinking. If we were to map this as a design problem: the user need is clarity, the constraint is complexity, and the optimal solution space lies at the intersection of simplicity and depth. The most compelling answer is one that works at multiple levels simultaneously — technically sound, aesthetically coherent, and intuitively graspable.`,
            `From a multimodal perspective, "${q}" invites us to engage across multiple representational modes. The textual answer is one slice. The visual pattern it maps to is another. The emotional resonance it carries is a third. Weaving these together: the answer is best understood as a structured experience, not just a fact. Here's how I'd frame it for maximum clarity and impact.`
        ],
        deepseek: [
            `Analyzing "${q}" from first principles using formal reasoning:\n\nLet f(x) represent the problem space. The constraints are:\n  • Condition A: defines the domain\n  • Condition B: establishes the bounds\n  • Condition C: sets the optimization target\n\nApplying standard analytical methods:\n  Step 1 → Decompose the problem into independent sub-problems\n  Step 2 → Solve each sub-problem in O(n log n)\n  Step 3 → Compose the solutions with a merge strategy\n\nResult: The optimal answer satisfies all three conditions simultaneously. Complexity is manageable and the solution is provably correct under the stated assumptions.`,
            `Mathematical framework for "${q}":\n\nGiven the problem as stated, we can model it as:\n  P = argmax Σ(reward_i) subject to Σ(cost_i) ≤ budget\n\nUsing dynamic programming / logical inference:\n  Base case → trivially solvable\n  Inductive step → each sub-problem reduces correctly\n  Terminal condition → solution converges\n\nConclusion: The rigorous answer is X. Edge cases handled. Proof sketch available on request.`,
            `Systematic reasoning applied to "${q}":\n\nBreaking this into components:\n  [A] Define terms precisely\n  [B] Establish axioms\n  [C] Derive conclusions\n\n[A] Key definitions: the terms involved have well-defined formal meanings.\n[B] Axioms: standard assumptions apply here.\n[C] Derived conclusion: given A and B, the answer follows necessarily.\n\nThis is not merely probable — it is logically entailed by the premises.`
        ]
    };

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const intro = pick(intros[model] || intros.chatgpt);
    const body = pick(bodies[model] || bodies.chatgpt);

    return `${intro}\n\n${body}`;
};

const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const callAI = async (model, message) => {
    const providers = {
        gemini: {
            key: process.env.GEMINI_API_KEY,
            model: "gemini-2.0-flash",
            fn: async (key, msg) => {
                const genAI = new GoogleGenerativeAI(key);
                const geminiModel = genAI.getGenerativeModel({ model: providers.gemini.model });
                const result = await geminiModel.generateContent(msg);
                return await result.response.text();
            }
        },
        deepseek: {
            key: process.env.DEEPSEEK_API_KEY,
            model: "deepseek-chat",
            fn: async (key, msg) => {
                const response = await axios.post("https://api.deepseek.com/chat/completions", {
                    model: providers.deepseek.model,
                    messages: [{ role: "user", content: msg }]
                }, {
                    headers: { "Authorization": `Bearer ${key}` }
                });
                return response.data.choices[0].message.content;
            }
        },
        chatgpt: {
            key: process.env.OPENAI_API_KEY,
            model: "gpt-4o",
            fn: async (key, msg) => {
                const response = await axios.post("https://api.openai.com/v1/chat/completions", {
                    model: providers.chatgpt.model,
                    messages: [{ role: "user", content: msg }]
                }, {
                    headers: { "Authorization": `Bearer ${key}` }
                });
                return response.data.choices[0].message.content;
            }
        },
        claude: {
            key: process.env.ANTHROPIC_API_KEY,
            model: "claude-3-5-sonnet-20240620",
            fn: async (key, msg) => {
                const response = await axios.post("https://api.anthropic.com/v1/messages", {
                    model: providers.claude.model,
                    max_tokens: 1024,
                    messages: [{ role: "user", content: msg }]
                }, {
                    headers: {
                        "x-api-key": key,
                        "anthropic-version": "2023-06-01",
                        "content-type": "application/json"
                    }
                });
                return response.data.content[0].text;
            }
        }
    };

    // List of known models for mock personality fallback
    const knownModels = ['gemini', 'deepseek', 'chatgpt', 'claude', 'perplexity', 'grok'];

    // Determine which provider to use for real API calls
    let providerName = model;

    if (providers[providerName]) {
        const provider = providers[providerName];
        // Check if key exists and isn't a placeholder
        if (provider.key && !provider.key.includes('your_')) {
            try {
                console.log(`[AI] Calling ${providerName} (${provider.model})...`);
                return await provider.fn(provider.key, message);
            } catch (error) {
                const errorMsg = error.response?.data?.error?.message || error.message;
                console.error(`[AI ERROR] ${providerName}:`, errorMsg);

                // Helpful prefix for quota/balance issues
                let uiError = "";
                if (errorMsg.includes("quota") || errorMsg.includes("429")) {
                    uiError = `[${providerName} Quota Exceeded] `;
                } else if (errorMsg.includes("Balance") || errorMsg.includes("balance")) {
                    uiError = `[${providerName} Insufficient Balance] `;
                } else {
                    uiError = `[${providerName} API Error: ${errorMsg}] `;
                }

                return `${uiError}\n\n${generateContextualResponse(providerName, message)}`;
            }
        }
    }

    // Fallback to mock with the requested model's personality
    const fallbackModel = knownModels.includes(model) ? model : 'chatgpt';
    console.log(`[AI] No provider/key for ${model}, using mock fallback for ${fallbackModel}.`);
    return generateContextualResponse(fallbackModel, message);
};

module.exports = { callAI };
