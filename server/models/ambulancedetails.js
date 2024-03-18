const mongoose = require('mongoose')

const AmbulanceDetails = new mongoose.Schema(
    {
        VehicleYear : {
            type : Number,
            required : true,
        },

        VehicleMake : {
            type : String,
            required : true,
        },

        VehicleModel : {
            type : String,
            required : true,
        },

        Mileage : {
            type : Number,
            required : true,
        },

        ChassisNumber : {
            type : String,
            required : true,
            unique : true,
        },

        EngineNumber : {
            type : String,
            required : true,
            unique : true,
        },

        VehicleIdentificationNumber : {
            type : String,
            required : true,
            unique : true,
        },

        OwnerName : {
            type : String,
            required : true,
        },

        OwnerIdentificationNumber : {
            type : String,
            required : true,
        },

        ContactNumber : {
            type : Number,
            required : true,
        },

        City: {
            type : String,
            required : true,
        },
    }
)

module.exports = mongoose.model('Ambulancedetail', AmbulanceDetails)