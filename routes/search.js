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
   res.json({ "Trajets trouvés" : data });
 }).catch(err => {
   res.status(500).json({ error: err.message });
 });
 });



// TEST

const searchDeparture = document.querySelector('searchDeparture').value
const searchArrival = document.querySelector('searchArrival').value
const searchDate = document.querySelector('searchDate').value

const userInput = {
    arrival: searchArrival, 
    departure: searchDeparture, 
    date: searchDate
}

fetch('http://localhost:3000/search', {
    method: 'POST',
    headers : {'Content-Type':'application/json'},
    body: JSON.stringify(userInput)
})
    .then(response => response.json())
    .then(data => {
        if (data && data["Trajets trouvés"].length > 0) {
            window.location.assign('index.html');
          } else {
            console.log('Aucun trajet trouvé');
          }
})





 
 
 module.exports = router;