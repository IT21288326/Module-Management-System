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



export const getAllPannelNames = async (req, res, next) => {
  try {
    const presentationPanels = await PresentationPannel.find({}, 'pannelID');
    const panelIds = presentationPanels.map(p => p.pannelID);
    res.json(panelIds);
} catch (error) {
    res.status(500).json({ error: 'Failed to get presentation panel IDs' });
}
};




// Controller function to check if panel ID exists
export const checkPanelIDExists = async (req, res) => {
    const { panelID } = req.params; // Assuming panelID is passed as a parameter

    try {
        // Query the database to find if the panel ID already exists
        const existingPanel = await PresentationPannel.findOne({ pannelID: panelID });

        if (existingPanel) {
            // Panel ID exists
            res.status(200).json({ exists: true, message: 'Panel ID already exists.' });
        } else {
            // Panel ID does not exist
            res.status(200).json({ exists: false, message: 'Panel ID does not exist.' });
        }
    } catch (error) {
        // Error handling
        console.error('Error checking panel ID existence:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};






