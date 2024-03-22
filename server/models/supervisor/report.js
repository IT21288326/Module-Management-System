// models/report.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reportSchema = new Schema({
  reportTitle: {
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
      }
    }
  ]
});

export default model('Report', reportSchema);
