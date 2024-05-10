import Assessment from '../../models/project-member/AssesmentModel.js';

// Add Assement
export const createAssessment = async (req, res) => {
  const newAssessment = new Assessment(req.body);

  try {
    const savedAssessment = await newAssessment.save();
    res.status(201).json(savedAssessment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// get all Assessments
export const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.status(200).json(assessments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get Assessment by id
export const getAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    res.status(200).json(assessment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update Assessment by id
export const updateAssessment = async (req, res) => {
  try {
    const updatedAssessment = await Assessment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedAssessment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//delete assessment by id
export const deleteAssessment = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAssesment = await Assessment.findByIdAndDelete(id);
      if (!deletedAssesment) return res.status(404).json('Assesment not found');
      res.status(200).json('Assesment Deleted Succefully');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// get titles of assessments of type 'report'
export const getReportAssessmentTitles = async (req, res) => {
    try {
      const assessments = await Assessment.find({ assement_type: 'Report' }, 'assement_Name');
      const titles = assessments.map(assessment => assessment.assement_Name);
      res.status(200).json(titles);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

// get titles of assessments of type 'presentation'
export const getPresentationAssessmentTitles = async (req, res) => {
    try {
      const assessments = await Assessment.find({ assement_type: 'Presentation' }, 'assement_Name');
      const titles = assessments.map(assessment => assessment.assement_Name);
      res.status(200).json(titles);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };