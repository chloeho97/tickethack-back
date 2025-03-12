var express = require('express');
var router = express.Router();

const Booking = require('../models/bookings'); 

const moment = require('moment');

// Ajouter à la collection les trajets payés
router.post('/addTripBookings', (req,res) => {

   const newBooking = new Booking ({
      departure : "",
      arrival : "", 
      date : "",
      price : "", 
   });
   
   newBooking.save().then(newTrajetPaid => {
      res.json({newTrajetPaid})
   })

});


// Voir tous les trajets payés
   router.get('/', (req, res) => {
   Booking.find().then(data => {
      res.json({ "Trajets à venir" : data });
   }).catch(err => {
      res.status(500).json({ error: err.message });
   });
});

module.exports = router;