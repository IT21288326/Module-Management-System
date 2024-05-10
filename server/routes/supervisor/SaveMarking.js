import express from 'express';
import Marking from '../../models/supervisor/Marking.js';
import GroupRegistration from '../../models/student/GrpRegistration.js';
import MarkingRubrics from '../../models/project-member/markingRubricsModel.js';


const router = express.Router();

// Save the marking data for each member
router.post('/submit', async (req, res) => {
    console.log('Received POST request to /submit');
    console.log('Request Body:', req.body);
    try {
        const { groupRegistrationNo, markingType, markingAreas } = req.body;

        // Create a new marking document
        const newMarking = new Marking({
            groupRegistrationNo,
            markingType,
            markingAreas,
        });

        // Save the marking document to the database
        await newMarking.save();
        res.json({ message: 'Marking data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving marking data', error });
    }
});

// Retrieve all marking records
router.get('/retrieve', async (req, res) => {
    try {
        // Fetch all marking records from the database
        const markings = await Marking.find().lean();

        // Respond with the retrieved records
        res.json(markings);
    } catch (error) {
        console.error('Error retrieving marking data:', error);
        res.status(500).json({ message: 'Error retrieving marking data', error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { markingAreas } = req.body;

        // Find the marking record by ID and update the student marks and co-supervisor marks
        const marking = await Marking.findById(id);

        if (!marking) {
            return res.status(404).json({ message: 'Marking record not found' });
        }

        // Update markingAreas with the new data from the request body
        marking.markingAreas = markingAreas;

        // Save the updated marking record
        await marking.save();

        res.json({ message: 'Marking data updated successfully', marking });
    } catch (error) {
        console.error('Error updating marking data:', error);
        res.status(500).json({ message: 'Error updating marking data', error });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMarking = await Marking.findByIdAndDelete(id);

        if (!deletedMarking) {
            return res.status(404).json({ message: 'Marking record not found' });
        }

        res.json({ message: 'Marking record deleted successfully' });
    } catch (error) {
        console.error('Error deleting marking record:', error);
        res.status(500).json({ message: 'Error deleting marking record' });
    }
});

// Endpoint to get all group registration numbers
router.get('/groups', async (req, res) => {
    try {
        const groups = await GroupRegistration.find({}, 'GroupRegistrationNo').exec();
        res.json(groups);
    } catch (error) {
        console.error('Error retrieving groups:', error);
        res.status(500).json({ error: 'Error retrieving groups' });
    }
});

// Endpoint to get all marking types
router.get('/marking-types', async (req, res) => {
    try {
        const markingTypes = await MarkingRubrics.find({}, 'type').exec();
        res.json(markingTypes);
    } catch (error) {
        console.error('Error retrieving marking types:', error);
        res.status(500).json({ error: 'Error retrieving marking types' });
    }
});



function calculateLetterGrade(finalNormalizedMark) {
    if (finalNormalizedMark >= 90) {
        return 'A+';
    } else if (finalNormalizedMark >= 80) {
        return 'A';
    } else if (finalNormalizedMark >= 75) {
        return 'A-';
    } else if (finalNormalizedMark >= 70) {
        return 'B+';
    } else if (finalNormalizedMark >= 65) {
        return 'B';
    } else if (finalNormalizedMark >= 60) {
        return 'B-';
    } else if (finalNormalizedMark >= 55) {
        return 'C+';
    } else if (finalNormalizedMark >= 45) {
            return 'C';
    } else if (finalNormalizedMark >= 40) {
        return 'C-';
    } else if (finalNormalizedMark >= 35) {
        return 'D+';
    } else if (finalNormalizedMark >= 30) {
        return 'D';
    } else {
        return 'E';
    }
}

// Define a function to calculate the comprehensive marksheet
async function calculateMarksheet() {
    // Define the maximum marks for each marking type
    const maxMarks = {
        "Proposal Presentation": 5,
        "Progress 1 Presentation": 15,
        "Final Presentation": 25,
        "Topic Assessment Form Report": 5,
        "Project Charter Report": 5,
        "Status Document 1 Report": 20,
        "Log Book Report": 5,
        "Proposal Document Report": 10,
        "Status Document 2 Report": 10,
    };

    try {
        // Fetch all marking data
        const markings = await Marking.find().exec();

        // Initialize an object to hold the final marksheet data
        const marksheet = {};

        // Process each marking entry
        for (const marking of markings) {
            const { groupRegistrationNo, markingType, markingAreas } = marking;

            // Iterate through each marking area
            for (const area of markingAreas) {
                const { markingArea, studentMarks } = area;

                // Process each student's marks
                for (const studentMark of studentMarks) {
                    const { memberRegNo, memberName, mark } = studentMark;

                    // Initialize student entry if not already present
                    if (!marksheet[memberRegNo]) {
                        marksheet[memberRegNo] = {
                            name: memberName,
                            totalMarks: {},
                            finalGrade: 0
                        };
                    }

                    // Add the student's marks to the corresponding marking type
                    if (!marksheet[memberRegNo].totalMarks[markingType]) {
                        marksheet[memberRegNo].totalMarks[markingType] = 0;
                    }

                    // Sum up the marks for the marking type
                    marksheet[memberRegNo].totalMarks[markingType] += mark;
                }
            }
        }

        // Calculate the final grade for each student
        for (const regNo in marksheet) {
            const student = marksheet[regNo];
            let totalGrade = 0;

            // Iterate through each marking type and calculate the normalized score
            for (const markingType in student.totalMarks) {
                const totalMark = student.totalMarks[markingType];
                const maxMark = maxMarks[markingType];

                // Normalize the total mark for the marking type
                const normalizedMark = totalMark / maxMark;

                // Add the normalized mark to the total grade
                totalGrade += normalizedMark;
            }

            // Calculate the final grade for the student
            student.finalGrade = totalGrade;
            const finalNormalizedMark = student.finalGrade * 100; // Convert to percentage
        student.letterGrade = calculateLetterGrade(finalNormalizedMark);
        }

        // Return the final marksheet
        return marksheet;

    } catch (error) {
        console.error('Error calculating marksheet:', error);
        throw error;
    }
}


// Create a new GET API endpoint to fetch the comprehensive marksheet
router.get('/marksheet', async (req, res) => {
    try {
        // Calculate the marksheet
        const marksheet = await calculateMarksheet();

        // Return the marksheet data as a JSON response
        res.json(marksheet);
    } catch (error) {
        console.error('Error fetching marksheet:', error);
        res.status(500).json({ message: 'Error fetching marksheet', error });
    }
});




// Define grade thresholds
const gradeThresholds = {
    'A+': 90,
    'A': 80,
    'A-': 75,
    'B+': 70,
    'B': 65,
    'B-': 60,
    'C+': 55,
    'C': 45,
    'C-': 40,
    'D+': 35,
    'D': 30,
    'E': 0,
};

// Function to calculate counts and percentages
async function calculateStatistics() {
    try {
        // Fetch all marking data
        const markings = await Marking.find().exec();
        
        // Initialize counters and grades array
        const gradeCounts = {};
        const gradesArray = [];
        let passCount = 0;
        let failCount = 0;

        // Calculate grade counts and pass/fail counts
        for (const marking of markings) {
            const { groupRegistrationNo, markingType, markingAreas } = marking;

            // Iterate through each marking area
            for (const area of markingAreas) {
                const { studentMarks } = area;

                // Process each student's marks
                for (const studentMark of studentMarks) {
                    const { memberRegNo, mark } = studentMark;

                    // Calculate normalized mark
                    const normalizedMark = mark;

                    // Determine grade based on normalized mark
                    let grade;
                    for (const [key, value] of Object.entries(gradeThresholds)) {
                        if (normalizedMark >= value) {
                            grade = key;
                            break;
                        }
                    }

                    // Increment grade count
                    if (gradeCounts[grade]) {
                        gradeCounts[grade]++;
                    } else {
                        gradeCounts[grade] = 1;
                    }

                    // Determine pass/fail status
                    if (normalizedMark >= gradeThresholds['C-']) {
                        passCount++;
                    } else {
                        failCount++;
                    }

                    // Add grade to grades array for bell curve
                    gradesArray.push(normalizedMark);
                }
            }
        }

        // Calculate percentages
        const totalStudents = passCount + failCount;
        const passPercentage = (passCount / totalStudents) * 100;
        const failPercentage = (failCount / totalStudents) * 100;

        // Return calculated data
        return {
            gradeCounts,
            passPercentage,
            failPercentage,
            gradesArray,
        };

    } catch (error) {
        console.error('Error calculating statistics:', error);
        throw error;
    }
}

// Add an endpoint to get statistics data
router.get('/statistics', async (req, res) => {
    try {
        const statistics = await calculateStatistics();
        res.json(statistics);
    } catch (error) {
        console.error('Error retrieving statistics:', error);
        res.status(500).json({ message: 'Error retrieving statistics' });
    }
});


    
export default router;
