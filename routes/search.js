var express = require('express');
var router = express.Router();

const data = require('../trips')
const moment = require('moment');


// Afficher tous les trajets correspondant aux critères du navigateur

router.post('/', (req, res) => {

    let { 
      arrival: searchArrival, 
      departure: searchDeparture, 
      date: searchDate
    } = req.body;
  
const startOfDay = moment(searchDate).startOf('day').toDate();
const endOfDay = moment(searchDate).endOf('day').toDate();
  
const searchTrip = data.filter(trip => trip.departure === searchDeparture && trip.arrival === searchArrival && new Date(trip.date['$date']) >= startOfDay && 
new Date(trip.date['$date']) <= endOfDay) 

if (searchTrip.length > 0) {
    res.status(200).json({ searchTrip });
} else {
    res.status(404).json({ message: "Trajets non trouvé" });
}
})
  
  module.exports = router;

  