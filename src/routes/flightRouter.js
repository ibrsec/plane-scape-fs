'use strict';


/* -------------------------------------------------------------------------- */
/*                               flightRouter Router                              */
/* -------------------------------------------------------------------------- */
const router = require('express').Router();
const {flight} = require('../controllers/flightController');
// const permissons = require('../middlewares/permissions');
 
/* -------------------------------------------------------------------------- */

router.route('/').get(flight.list);
router.route('/:flightId').get(flight.read);
/* -------------------------------------------------------------------------- */
module.exports = router;

