var express = require('express');
var router = express.Router();
 
const Cart = require('../models/carts'); 
const moment = require('moment');


// Ajouter un trajet au panier dès le click sur le bouton "Book" = reception des informations du front et ajout dans la collection "carts"
router.post('/addTripCart', (req,res) => {

   const { departure, arrival, date, price } = req.body;

   const newCart = new Cart({
      departure : departure,
      arrival : arrival,
      date : date,
      price : price,
   });

   newCart.save().then(newTrajet => {
      res.json({newTrajet})
   })

});


// Voir les trajets ajoutés au panier
router.get('/addTripCart', (req, res) => {
   Cart.find().then(data => {
      res.json({data });
   }).catch(err => {
   res.status(500).json({ error: err.message });
   });
});


// Supprimer un trajet ajouté au panier
router.delete('/deleteTripCart', (req, res) => {

   const { departure, arrival, date, price } = req.body;

   Cart.deleteOne({
      departure : departure,
      arrival : arrival, 
      date : date,
      price : price, 
      })
      .then(() => res.status(200).json({ message: 'Trip deleted.' }))
      .catch((err) => res.status(500).json({ error: 'Error : Trip not deleted.' }));
});

module.exports = router;


// Récupérer le total des trajets présents dans le panier 

router.get('/totalPrice', (req, res) => {
   Cart.find().then(trips => {
       const total = trips.reduce((sum, trip) => sum + trip.price, 0); // Calcule la somme des prix
       res.json({ total });
   })
   .catch(err => {
       res.status(500).json({ error: err.message });
   });
});