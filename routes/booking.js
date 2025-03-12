var express = require('express');
var router = express.Router();

const Booking = require('../models/bookings'); 

const moment = require('moment');



// Voir tous les trajets payés
   router.get('/', (req, res) => {
   Booking.find().then(data => {
      res.json({ "Trajets à venir" : data });
   }).catch(err => {
      res.status(500).json({ error: err.message });
   });
});

module.exports = router;