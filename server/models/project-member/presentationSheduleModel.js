import mongoose from 'mongoose';

const sheduleSchema = new mongoose.Schema({
    groupNo: {
        type: String,
        required: true,
        unique: true
    },
    pannelID: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true
    }
});

export default mongoose.model("PresentationShedule", sheduleSchema);


// pannelID: {
    //     type: mongoose.Schema.Types.ObjectId, // Assuming pannelID is the ObjectId of documents in another collection
    //     ref: 'Panel', // Name of the model (collection) containing the pannelID
    //     required: true
    // },