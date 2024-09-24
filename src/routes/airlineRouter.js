'use strict';


/* -------------------------------------------------------------------------- */
/*                               airlineRouter Router                              */
/* -------------------------------------------------------------------------- */
const router = require('express').Router();
const {airline} = require('../controllers/airlineController');
// const permissons = require('../middlewares/permissions');
 
/* -------------------------------------------------------------------------- */

router.route('/:iata')
.get(airline.getAirline); 

/* -------------------------------------------------------------------------- */
module.exports = router;

