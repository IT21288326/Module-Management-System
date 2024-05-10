// import MarkingRubrics from '../../models/project-member/markingRubricsModel.js';
// import GroupRegistration from '../../models/student/GrpRegistration.js';
// import Marking from '../../models/supervisor/Marking.js';


// export const getRubricsTypes = async (req, res) => {
//     try {
//         const rubricsTypes = await MarkingRubrics.distinct('type');
//         res.status(200).json(rubricsTypes);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// export const getGroupByRegistrationNo = async (req, res) => {
//     try {
//         const { regNo } = req.query;
//         const group = await GroupRegistration.findOne({ GroupRegistrationNo: regNo });
//         if (group) {
//             res.status(200).json(group);
//         } else {
//             res.status(404).json({ message: 'Group not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Create a new marking record
// export const createMarking = async (req, res) => {
//     try {
//         const marking = new Marking(req.body);
//         const savedMarking = await marking.save();
//         res.status(201).json(savedMarking);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Get all marking records
// export const getMarkings = async (req, res) => {
//     try {
//         const markings = await Marking.find();
//         res.status(200).json(markings);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get a marking record by ID
// export const getMarkingById = async (req, res) => {
//     try {
//         const marking = await Marking.findById(req.params.id);
//         if (!marking) {
//             return res.status(404).json({ message: 'Marking not found' });
//         }
//         res.status(200).json(marking);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update a marking record by ID
// export const updateMarking = async (req, res) => {
//     try {
//         const updatedMarking = await Marking.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!updatedMarking) {
//             return res.status(404).json({ message: 'Marking not found' });
//         }
//         res.status(200).json(updatedMarking);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete a marking record by ID
// export const deleteMarking = async (req, res) => {
//     try {
//         const deletedMarking = await Marking.findByIdAndDelete(req.params.id);
//         if (!deletedMarking) {
//             return res.status(404).json({ message: 'Marking not found' });
//         }
//         res.status(200).json({ message: 'Marking deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
