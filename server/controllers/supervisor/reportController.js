// controllers/reportController.js

import Report from '../../models/supervisor/report.js';

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
      console.log('Form Data:', formData); // Log the form data

      // Check if there's an existing record with the same title, semester, and group number
    const existingRecord = await Report.findOne({
      reportTitle: formData.reportTitle,
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
      // Create a new report instance with the submitted data
      const newReport = new Report(formData);
      // Save the report to the database
      const savedReport = await newReport.save();
      res.status(201).json(savedReport);
    } catch (error) {
      console.error('Error submitting form data:', error);
      res.status(500).json({ message: 'Failed to submit form data' });
    }
};


  export const getReports = async (req, res) => {
    try {
      // Fetch all reports from the database
      const reports = await Report.find();
      res.json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ message: 'Failed to fetch reports' });
    }
  };