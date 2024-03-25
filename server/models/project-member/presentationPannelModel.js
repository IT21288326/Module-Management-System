import mongoose from 'mongoose';

const pannelSchema = new mongoose.Schema({
    pannelID: {
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

export default mongoose.model("PresentationPannel", pannelSchema);
