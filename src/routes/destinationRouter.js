'use strict';


/* -------------------------------------------------------------------------- */
/*                               destination Router                              */
/* -------------------------------------------------------------------------- */
const router = require('express').Router();
const {destination} = require('../controllers/destinationController');
// const permissons = require('../middlewares/permissions');
 
/* -------------------------------------------------------------------------- */

router.route('/:iata')
.get(destination.getDestination); 

/* -------------------------------------------------------------------------- */
module.exports = router;

