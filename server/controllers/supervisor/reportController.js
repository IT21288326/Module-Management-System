// controllers/reportController.js

import Report from '../../models/supervisor/report.js';

export const submitFormData = async (req, res) => {
    try {
      const formData = req.body;
      console.log('Form Data:', formData); // Log the form data
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