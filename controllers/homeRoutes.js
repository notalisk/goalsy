const router = require('express').Router();
const path = require('path');

router.get('/', async (req, res) => {
    res.render('homepage');
});

module.exports = router;