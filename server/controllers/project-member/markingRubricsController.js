import MarkingRubrics from '../../models/project-member/markingRubricsModel.js';

//Controller for create a new Marking Rubrics
export const createMarkingRubric = async (req, res) => {
  try {
    const { type, marking } = req.body;
    const newMarkingRubric = new MarkingRubrics({ type, marking });
    await newMarkingRubric.save();
    res.status(201).json(newMarkingRubric);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for get a Marking Rubric by ID
export const getMarkingRubricById = async (req, res) => {
    try {
      const { id } = req.params;
      const markingRubric = await MarkingRubrics.findById(id);
      if (!markingRubric) return res.status(404).json({ message: 'Marking rubric not found' });
      res.status(200).json(markingRubric);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//Controller for get a Marking Rubric by ID and display marking Arrays values only
export const getMarkingRubricByIdmarking = async (req, res) => {
    try {
      const { id } = req.params;
      const markingRubric = await MarkingRubrics.findById(req.params.id, 'marking');
      if (!markingRubric) return res.status(404).json({ message: 'Marking rubric not found' });
      res.status(200).json(markingRubric);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



//Controller for get all Marking Rubrics
export const getAllMarkingRubrics = async (req, res) => {
    try {
      const markingRubrics = await MarkingRubrics.find();
      res.status(200).json(markingRubrics);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//Controller for update Marking Rubrics
export const updateMarkingRubric = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMarkingRubric = await MarkingRubrics.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMarkingRubric) return res.status(404).json({ message: 'Marking rubric not found' });
    res.status(200).json(updatedMarkingRubric);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for delete Marking Rubric
export const deleteMarkingRubric = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMarkingRubric = await MarkingRubrics.findByIdAndDelete(id);
      if (!deletedMarkingRubric) return res.status(404).json({ message: 'Marking rubric not found' });
      res.status(200).json(deletedMarkingRubric);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };