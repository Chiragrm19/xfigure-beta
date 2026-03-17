const express = require('express');
const router = express.Router();

router.post('/verify', async (req, res) => {
    res.json({ verified: true });
});

module.exports = router;
