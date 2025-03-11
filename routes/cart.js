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

})


 
 // Voir les trajets ajoutés au panier
 router.get('/addTripCart', (req, res) => {
  Cart.find().then(data => {
    res.json({data });
}).catch(err => {
  res.status(500).json({ error: err.message });
});
});


 
 // Supprimer un trajet ajouté au panier
 router.delete('/:trip', (req, res) => {
   Cart.deleteOne({ })
 });
  
 module.exports = router;