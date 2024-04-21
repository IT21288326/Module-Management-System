import mongoose from 'mongoose';

const markingRubrics = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },

  marking: [
    {
    markingArea: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
      
    }
  ]
});


export default mongoose.model("MarkingRubrics", markingRubrics);