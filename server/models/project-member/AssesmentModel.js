import mongoose from 'mongoose';

const AssessmentSchema = new mongoose.Schema({
  assement_Name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assement_type: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    required: true
  }
});

export default mongoose.model('Assessment', AssessmentSchema);