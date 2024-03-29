// controllers/reportController.js

import Presentation from '../../models/examiner/presentation.js';

const calculateGrade = (marks) => {
  if (!marks) {
    return ''; // Return empty string if marks are not available
  }
  if (marks >= 90) {
    return 'A+';
  } else if (marks >= 80) {
    return 'A';
  } else if (marks >= 75) {
    return 'A-';
  }else if (marks >= 70) {
    return 'B+';
  } else if (marks >= 65) {
    return 'B';
  }else if (marks >= 60) {
    return 'B-';
  } else if (marks >= 55) {
    return 'C+';
  }else if (marks >= 45) {
    return 'C';
  } else if (marks >= 40) {
    return 'C-';
  }else if (marks >= 35) {
    return 'D+';
  } else if (marks >= 30) {
    return 'D';
  } else {
    return 'E';
  }
};

export const submitFormData = async (req, res) => {
    try {
      const formData = req.body;
      console.log('Form Data:', formData); 

      // Check if there's an existing record with the same title, semester, and group number
    const existingRecord = await Presentation.findOne({
      presentationTitle: formData.presentationTitle,
      semester: formData.semester,
      groupNumber: formData.groupNumber
    });

    if (existingRecord) {
      return res.status(400).json({ message: 'Already existed record!!.' });
    }

      // Calculate grades for each student
      const studentsWithGrades = formData.students.map(student => ({
        ...student,
        grade: calculateGrade(student.marks)
    }));

    // Include calculated grades in the form data
    const formDataWithGrades = {
        ...formData,
        students: studentsWithGrades
    };

      const newPresentation = new Presentation(formData);
    
      const savedPresentation = await newPresentation.save();
      res.status(201).json(savedPresentation);
    } catch (error) {
      console.error('Error submitting form data:', error);
      res.status(500).json({ message: 'Failed to submit form data' });
    }
};


  export const getPresentation = async (req, res) => {
    try {
      // Fetch all reports from the database
      const Presentations = await Presentation.find();
      res.json(Presentations);
    } catch (error) {
      console.error('Error fetching Presentation:', error);
      res.status(500).json({ message: 'Failed to fetch Presentation' });
    }
  };