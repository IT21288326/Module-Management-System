import mongoose from 'mongoose';

const sheduleSchema = new mongoose.Schema({
    groupNo: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },

    endTime: {
        type: String,
        required: true,
    },
    
    venue: {
        type: String,
        required: true
    },
    presentationType:{
        type: String,
        required: true,
    },
    examiner_1: {
        type: String,
        required: true,
    },
    examiner_2: {
        type: String,
        required: true,
    },
    examiner_3: {
        type: String,
        required: true
    }
});

export default mongoose.model("PresentationShedule", sheduleSchema);




