const ambulancedetails = require('../models/ambulancedetails');
const Ambulancedetail = require('../models/ambulancedetails')

//create
const AddAmbulanceDetails = async(req, res) => {
    try {
       const VehicleYear = req.body.VehicleYear;
       const VehicleMake = req.body.VehicleMake;
       const VehicleModel = req.body.VehicleModel;
       const Mileage = req.body.Mileage;
       const ChassisNumber = req.body.ChassisNumber;
       const EngineNumber = req.body.EngineNumber;
       const VehicleIdentificationNumber = req.body.VehicleIdentificationNumber;
       const OwnerName =req.body.OwnerName;
       const OwnerIdentificationNumber = req.body.OwnerIdentificationNumber;
       const ContactNumber = req.body.ContactNumber;
       const City = req.body.City;
       console.log(req.body);

       const newAmbulance = new Ambulancedetail({
        VehicleYear,
        VehicleMake,
        VehicleModel,
        Mileage,
        ChassisNumber,
        EngineNumber,
        VehicleIdentificationNumber,
        OwnerName,
        OwnerIdentificationNumber,
        ContactNumber,
        City
       })

       await newAmbulance.save().then(()=>{
        res.status(200).json({ "msg" : "successfully inserted!"})
       })

    } 
    catch (error) {
        res.status(500).json({ 'msg' : error.message })
    }
}

//view
const DisplayAmbulanceDetails = async (req, res) => {
    try {
        const ambulance = await Ambulancedetail.find({});
        res.status(200).json(ambulance);
    } catch (error) {
        res.status(500).json({ 'msg': error.message });
    }
}

//update
const UpdateAmbulanceDetails = async (req, res) => {
    try {
        const { VehicleID } = req.params
        const {VehicleYear,VehicleMake,VehicleModel,Mileage,ChassisNumber,EngineNumber,VehicleIdentificationNumber,OwnerName,OwnerIdentificationNumber,ContactNumber,City} = req.body; //destructure

        const obj = await ambulancedetails.findById(VehicleID)
        obj.VehicleYear = VehicleYear
        obj.VehicleModel = VehicleModel
        obj.VehicleMake = VehicleMake
        obj.Mileage = Mileage
        obj.ChassisNumber = ChassisNumber
        obj.EngineNumber = EngineNumber
        obj.VehicleIdentificationNumber = VehicleIdentificationNumber
        obj.OwnerName = OwnerName
        obj.OwnerIdentificationNumber = OwnerIdentificationNumber
        obj.ContactNumber = ContactNumber
        obj.City = City
        await obj.save()

        // .then(()=>{
         res.status(200).json({ "msg" : "successfully updated!"})
        // })
    } catch (error) {
        res.status(500).json({ 'msg': error.message });
    }

}

//delete
const DeleteAmbulanceDetails = async (req, res) => {
    try {
        let VehicleID = req.params.VehicleIdentificationNumber;
        await ambulancedetails.findOneAndDelete(VehicleID)
        .then(()=>{
            res.status(200).json({ "msg" : "successfully deleted!"})
           })
    } catch (error) {
            res.status(500).json({ 'msg': error.message });
    }
}

module.exports = { AddAmbulanceDetails, DisplayAmbulanceDetails ,UpdateAmbulanceDetails, DeleteAmbulanceDetails}