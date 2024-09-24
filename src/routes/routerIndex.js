"use strict";

/* -------------------------------------------------------------------------- */
/*                                 Main Routes                                */
/* -------------------------------------------------------------------------- */



/* ------------------------------------ imports ----------------------------------- */

const router = require('express').Router();



/* ------------------------------------ routes ----------------------------------- */

//Routes
router.use('/documents',require('./documentRouter'));
router.use('/users',require('./userRouter'));
router.use('/tokens',require('./tokenRouter'));
router.use('/auth',require('./authRouter'));
router.use('/flights',require('./flightRouter'));
router.use('/destinations',require('./destinationRouter'));
router.use('/bookings',require('./bookingRouter'));
router.use('/airlines',require('./airlineRouter'));

 




/* ------------------------------------ c ----------------------------------- */
module.exports = router;