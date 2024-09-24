'use strict';


/* -------------------------------------------------------------------------- */
/*                               Booking Router                              */
/* -------------------------------------------------------------------------- */
const router = require('express').Router();
const {booking} = require('../controllers/bookingController');
const permissons = require('../middlewares/permissions'); 
/* -------------------------------------------------------------------------- */

router.route('/')
.get(permissons.isLogin, booking.list)
.post(permissons.isLogin, booking.create);
router.route('/:id')
.get(permissons.isLogin, booking.read) 
.delete(permissons.isLogin, booking.delete)
 
 
/* -------------------------------------------------------------------------- */
module.exports = router;

