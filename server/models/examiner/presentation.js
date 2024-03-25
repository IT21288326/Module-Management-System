
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const presentationSchema = new Schema({
presentationTitle: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  groupNumber: {
    type: String,
    required: true
    
  },
  students: [
    {
      name: {
        type: String,
      },
      marks: {
        type: String,
        default: 0
      },
      grade: { 
        type: String,
        default: '' 
    }
    }
  ]
});

export default model('Presentation', presentationSchema);
