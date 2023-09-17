const express = require('express');
const router = express.Router;

// home page
router.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;