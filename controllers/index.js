// router requiring express function
const router = require('express').Router();

// requiring api route and home route
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;