// // // import mongoose from 'mongoose';

// // // const { Schema } = mongoose;

// // // // Define the schema for a single marking area for a member
// // // const MemberMarkSchema = new Schema({
// // //     memberRegNo: {
// // //         type: String,
// // //         required: true,
// // //     },
// // //     memberName: {
// // //         type: String,
// // //         required: true,
// // //     },
// // //     mark: {
// // //         type: Number,
// // //         required: true,
// // //         min: 0,
// // //     },
// // //     comment: {
// // //         type: String,
// // //         required: false,
// // //     },
// // // });

// // // // Define the schema for marking a group in a particular marking area
// // // const MarkingAreaSchema = new Schema({
// // //     markingArea: {
// // //         type: String,
// // //         required: true,
// // //     },
// // //     members: [MemberMarkSchema],
// // // });

// // // // Define the schema for a marking record
// // // const MarkingSchema = new Schema({
// // //     groupRegistrationNo: {
// // //         type: String,
// // //         required: true,
// // //     },
// // //     markingType: {
// // //         type: String,
// // //         required: true,
// // //     },
// // //     markingAreas: [MarkingAreaSchema],
// // //     groupComments: {
// // //         type: String,
// // //         required: false,
// // //     },
// // //     createdAt: {
// // //         type: Date,
// // //         default: Date.now,
// // //     },
// // // });

// // // // Create the model using the schema
// // // const Marking = mongoose.model('Marking', MarkingSchema);

// // // // Export the model
// // export default Marking;
// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const MarkingSchema = new Schema({
//     groupRegistrationNo: {
//         type: String,
//         required: true,
//     },
//     markingType: {
//         type: String,
//         required: true,
//     },
//     memberMarks: [{
//         memberRegNo: {
//             type: String,
//             required: true,
//         },
//         memberName: {
//             type: String,
//             required: true,
//         },
//         markingArea: {
//             type: String,
//             required: true,
//         },
//         mark: {
//             type: Number,
//             required: true,
//             min: 0,
//         }
//     }],
// });


// const Marking = mongoose.model('Marking', MarkingSchema);


// export default Marking;
// // //================================
// // import mongoose from 'mongoose';

// // const markingSchema = new mongoose.Schema({
// //   group: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'GroupRegistration',
// //     required: true,
// //   },
// //   rubricType: {
// //     type: String,
// //     required: true,
// //   },
// //   marks: [
// //     {
// //       studentId: {
// //         type: String,
// //         required: true,
// //       },
// //       markingArea: {
// //         type: String,
// //         required: true,
// //       },
// //       marks: {
// //         type: Number,
// //         required: true,
// //       },
// //     },
// //   ],
// // });

// // const Marking = mongoose.model('Marking', markingSchema);

// // export default Marking;





import mongoose from 'mongoose';

const { Schema } = mongoose;

const StudentMarkSchema = new Schema({
    memberRegNo: {
        type: String,
        required: true,
    },
    memberName: {
        type: String,
        required: true,
    },
    mark: {
        type: Number,
        required: true,
        min: 0,
    },
    coSupervisorMark: {
        type: Number,
        min: 0,
        required: false,
    },
});

const MarkingAreaSchema = new Schema({
    markingArea: {
        type: String,
        required: true,
    },
    studentMarks: [StudentMarkSchema]
});

const MarkingSchema = new Schema({
    groupRegistrationNo: {
        type: String,
        required: true,
    },
    markingType: {
        type: String,
        required: true,
    },
    markingAreas: [MarkingAreaSchema]
});

const Marking = mongoose.model('Marking', MarkingSchema);

export default Marking;
