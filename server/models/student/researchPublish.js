import mongoose from 'mongoose';

const research = new mongoose.Schema(
    {
        Title:{
            type : String,

            unique: true
        },
        GrpID:{
            type : String,

            unique: true
        },
        GrpLeader:{
            type : String,
            required : true,
        },
        Supervisors:{
            type : String,
            required : true,
        },
        COsupervisors:{
            type : String,
            required : true,
        },
        NameConfJourn:{
            type : String,
            required : true,
        },
        ISSN:{
            type : String,
            required : true,
        },
        LinktoGoogleScol:{
            type : String,
            required : true,
        },
        LinktoScopus:{
            type : String,
            required : true,
        },
        accpetancePhoto:{
            type : String,
            required : true,
        },
        confirmingPhoto:{
            type : String,
            required : true,
        },
        FeePhoto:{
            type : String,
            required : true,
        },        
      
    }
);





const ResearchPublish = mongoose.model("Publication", research);

export default ResearchPublish;