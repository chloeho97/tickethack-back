var express = require('express');
var router = express.Router();
 
const Trip = require('../models/trips'); 
const moment = require('moment');


// Obtenir la liste des trajets existants selon les critères du navigateur sur la page d'accueil

router.post('/', (req, res) => {

  let { 
    arrival: searchArrival, 
    departure: searchDeparture, 
    date: searchDate
  } = req.body;

  const startOfDay = moment(searchDate).startOf('day').toDate();
  const endOfDay = moment(searchDate).endOf('day').toDate();

  Trip.find({
    departure: searchDeparture,
    arrival: searchArrival,
    date: { $gte: startOfDay, $lte: endOfDay }
  }).then(data => {
    res.json({ "Trips found" : data });
  }).catch(err => {
    res.status(500).json({ error: err.message });
  });

});


/* Route de test
router.get('/', (req, res) => {
  Trip.find().then(data => {
    res.json({ "Trajets ajoutés aux paniers" : data });
  }).catch(err => {
  res.status(500).json({ error: err.message });
  });
});
*/



module.exports = router;