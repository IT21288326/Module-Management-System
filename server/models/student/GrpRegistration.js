/*import mongoose from "mongoose";
const { Schema } = mongoose;

const StudentSchema = new mongoose.Schema({
    name:{
        type : String,
    required:true
    },

    RegNumber:{
        type : String,
    required:true
    },

    Contact:{
        type : String,
    required:true
    },

    email:{
        type : String,
    required:true
    },

    batch:{
        type : String,
    required:true
    },

    specialization:{
        type : String,
    required:true
    },

    name:{
        type : String,
    required:true
    },

    name:{
        type : String,
    required:true
    },
})


*/

const mongoose = require('mongoose');

const groupRegistrationSchema = new mongoose.Schema(
    {
        GroupRegistrationNo:{
            type : String,

            unique: true
        },
        batch:{
            type : String,
            required : true,
        },
        specialization:{
            type : String,
            required : true,
        },
        leadersRegistrationNO:{
            type : String,
            required : true,
        },
        leaderName:{
            type : String,
            required : true,
        },
        leaderContactNo:{
            type : String,
            required : true,
        },
        leaderEmailAddress:{
            type : String,
            required : true,
        },
        Member1RegistrationNO:{
            type : String,
            required : true,
        },
        Member1Name:{
            type : String,
            required : true,
        },
        Member1ContactNo:{
            type : String,
            required : true,
        },
        Member1EmailAddress:{
            type : String,
            required : true,
        },
        Member2RegistrationNO:{
            type : String,
            required : true,
        },
        Member2Name:{
            type : String,
            required : true,
        },
        Member2ContactNo:{
            type : String,
            required : true,
        },
        Member2EmailAddress:{
            type : String,
            required : true,
        },        
        Member3RegistrationNO:{
            type : String,
            required : true,
        },
        Member3Name:{
            type : String,
            required : true,
        },
        Member3ContactNo:{
            type : String,
            required : true,
        },
        Member3EmailAddress:{
            type : String,
            required : true,
        },        
        Member4RegistrationNO:{
            type : String,
            required : true,
        },
        Member4Name:{
            type : String,
            required : true,
        },
        Member4ContactNo:{
            type : String,
            required : true,
        },
        Member4EmailAddress:{
            type : String,
            required : true,
        },
        title:{
            type : String,
            required : true,
        },
        area:{
            type : String,
            required : true,
        },
        supervisor:{
            type : String,
            required : true,
        },
        Cosupervisor:{
            type : String,
            required : true,
        },
    }
);

// Pre-save middleware to generate GroupRegistrationNo
groupRegistrationSchema.pre('save', async function (next) {
    // Check if GroupRegistrationNo is not provided or is empty
    if (!this.GroupRegistrationNo || this.GroupRegistrationNo.trim() === '') {
        // Generate 4-digit random number
        const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999
        this.GroupRegistrationNo = 'ID' + randomNumber;

    }
    next();
});


module.exports = mongoose.model("GroupRegistration", groupRegistrationSchema)



