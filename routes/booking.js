var express = require('express');
var router = express.Router();

const Booking = require('../models/bookings'); 

const moment = require('moment');
const Cart = require('../models/carts');


// Ajouter à la collection les trajets payés
router.post('/purchase', (req,res) => {

   // Récupérer tous les trajets du panier
   Cart.find()
   .then(cartTrips => {
      // Puis pour chaque trajet du panier
      cartTrips.forEach(trip => {
         // Ajouter le trajet aux réservations
         const { departure, arrival, date, price } = req.body;
         const newBooking = new Booking({
         departure : departure,
         arrival : arrival,
         date : date,
         price : price,
         });
         newBooking.save().then(newTrajetPaid => {
            res.json({newTrajetPaid})
         })
      });
   })

   // Vider le panier
   .then(() => {
      Cart.deleteMany().then(() => {
         Cart.find().then(console.log);
      });
   });

});


// Afficher les trajets payés
router.get('/', (req, res) => {
   Booking.find().then(data => {
      res.json({ "Booked trips" : data });
   }).catch(err => {
      res.status(500).json({ error: err.message });
   });
});


module.exports = router;