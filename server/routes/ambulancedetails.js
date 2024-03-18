const express = require('express')
const router = express.Router()
const { AddAmbulanceDetails, DisplayAmbulanceDetails, UpdateAmbulanceDetails, DeleteAmbulanceDetails } = require('../controllers/ambulancedetails')

router.post('/adddetails', AddAmbulanceDetails);

router.get('/ambulancedetails', DisplayAmbulanceDetails);

router.put('/update/:VehicleID',UpdateAmbulanceDetails);

router.delete('/delete/:VehicleIdentificationNumber',DeleteAmbulanceDetails);

module.exports = router 