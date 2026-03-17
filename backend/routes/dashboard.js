const express = require('express');
const router = express.Router();

router.get('/stats', async (req, res) => {
    // Mock stats
    res.json({
        totalQueries: 0,
        mostUsedAI: 'ChatGPT',
        avgResponseTime: 0,
        modelDistribution: []
    });
});

module.exports = router;
