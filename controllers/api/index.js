// required express to router.
const router = require('express').Router();

// calling user routes to api
const userRoutes  = require('./userRoutes');

router.use('/users', userRoutes);

// exporting router
module.exports = router;