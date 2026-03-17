const express = require('express');
const router = express.Router();
const { classifyQuery } = require('../services/router');
const { callAI } = require('../services/aiService');

router.post('/', async (req, res) => {
    try {
        const { message, sessionId, forceModel } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const startTime = Date.now();

        // 1. Determine which model to use
        let model = forceModel;
        let reason = 'User overridden model';

        if (!model) {
            const routingDecision = await classifyQuery(message);
            model = routingDecision.model;
            reason = routingDecision.reason;
        }

        // 2. Call the AI service (real API or smart contextual fallback)
        console.log(`[ROUTE] Calling AI Service. Model: ${model}, Message: "${message.substring(0, 20)}..."`);
        const responseText = await callAI(model, message);

        const responseTime = Date.now() - startTime;

        return res.json({
            response: responseText,
            model_used: model,
            routing_reason: reason,
            response_time_ms: responseTime
        });

    } catch (error) {
        console.error('Chat endpoint error:', error);
        res.status(500).json({ error: 'Internal server error processing chat' });
    }
});

module.exports = router;
