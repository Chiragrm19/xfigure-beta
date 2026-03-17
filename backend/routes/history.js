const express = require('express');
const router = express.Router();

router.get('/:sessionId', async (req, res) => {
    // Mock history returning an empty array
    res.json({ history: [] });
});

module.exports = router;
