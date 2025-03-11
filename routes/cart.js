var express = require('express');
 var router = express.Router();
 
 const Cart = require('../models/carts'); 
 const moment = require('moment');


 // Ajouter un trajet au panier dès le click sur le bouton "Book" = reception des informations du front et ajout dans la collection "carts"
 
router.post('/', (req,res) => {

 const newCart = new Cart({
    departure : "",
    arrival : "", 
    date : "",
    price : "", 
 });

 newCart.save().then(newTrajet => {
    res.json({newTrajet})
 })

})


 
 // Voir les trajets ajoutés au panier
 router.get('/', (req, res) => {
  Cart.find().then(data => {
    res.json({ "Trajets ajoutés aux paniers" : data });
}).catch(err => {
  res.status(500).json({ error: err.message });
});
});


 
 // Supprimer un trajet ajouté au panier
 router.delete('/', (req, res) => {
 
 });
  
 module.exports = router;