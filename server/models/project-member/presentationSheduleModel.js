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
    pannelID: {
        type: String
    }
});

export default mongoose.model("PresentationShedule", sheduleSchema);




