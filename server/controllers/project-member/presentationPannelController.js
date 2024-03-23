import PresentationPannel from '../../models/project-member/presentationPannelModel.js';
// Controller for creating a PresentationPannel
export const createPresentationPannel = async (req, res, next) => {
  const newPresentationPannel = new PresentationPannel(req.body);

  try {
    const savedPresentationPannel = await newPresentationPannel.save();
    res.status(200).json(savedPresentationPannel);
  } catch (err) {
    next(err);
  }
};

// Controller for retrieving a single PresentationPannel by ID 
export const getPresentationPannel = async (req, res, next) => {
  try {
    const presentationPannel = await PresentationPannel.findById(req.params.id);
    res.status(200).json(presentationPannel);
  } catch (err) {
    next(err);
  }
};

// // Controller function to get pannelID values
// export const retrievePannelIDs = async (req, res) => {
//   try {
    
//     const documents = await PresentationPannel.find();
//     const pannelIDs = documents.map((document) => document.pannelID);
//     res.json(pannelIDs);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// // Controller for retrieving all  PresentationPannels
export const getPresentationPannels = async (req, res, next) => {
    try {
      const presentationPannels = await PresentationPannel.find();
      res.status(200).json(presentationPannels);
    } catch (err) {
      next(err);
    }
  };



// Controller for updating a PresentationPannel by ID
export const updatePresentationPannel = async (req, res, next) => {
  try {
    const updatedPresentationPannel = await PresentationPannel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPresentationPannel);
  } catch (err) {
    next(err);
  }
};

// Controller for deleting a PresentationPannel by ID
export const deletePresentationPannel = async (req, res, next) => {
  try {
    await PresentationPannel.findByIdAndDelete(req.params.id);
    res.status(200).json("Presentation Pannel has been deleted.");
  } catch (err) {
    next(err);
  }
};

