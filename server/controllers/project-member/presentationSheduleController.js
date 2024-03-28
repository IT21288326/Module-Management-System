import PresentationShedule from "../../models/project-member/presentationSheduleModel.js";

// Controller for creating a PresentationShedule
export const createPresentationShedule = async (req, res, next) => {
  const newPresentationShedule = new PresentationShedule(req.body);

  try {
    const savedPresentationShedule = await newPresentationShedule.save();
    res.status(200).json(savedPresentationShedule);
  } catch (err) {
    next(err);
  }
};

// Controller for retrieving a single PresentationShedule by ID 
export const getPresentationShedule = async (req, res, next) => {
  try {
    const presentationShedule = await PresentationShedule.findById(req.params.id);
    res.status(200).json(presentationShedule);
  } catch (err) {
    next(err);
  }
};


// Controller for retrieving all  PresentationShedules
export const getPresentationShedules = async (req, res, next) => {
    try {
      const presentationShedules = await PresentationShedule.find();
      res.status(200).json(presentationShedules);
    } catch (err) {
      next(err);
    }
  };

// Controller for updating a PresentationShedule by ID
export const updatePresentationShedule = async (req, res, next) => {
  try {
    const updatedPresentationShedule = await PresentationShedule.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPresentationShedule);
  } catch (err) {
    next(err);h
  }
};

// Controller for deleting a PresentationShedule by ID
export const deletePresentationShedule = async (req, res, next) => {
  try {
    await PresentationShedule.findByIdAndDelete(req.params.id);
    res.status(200).json("Presentation Shedule has been deleted.");
  } catch (err) {
    next(err);
  }
};





// export const ceckGroupNoExists = async (req, res) => {
//   const { groupNo } = req.body;
  
//   try {
//       const existingSchedule = await PresentationShedule.findOne({ groupNo });
      
//       if (existingSchedule) {
//           return res.status(200).json({ exists: true, message: 'Group number already exists.' });
//       } else {
//           return res.status(200).json({ exists: false, message: 'Group number does not exist.' });
//       }
//   } catch (error) {
//       return res.status(500).json({ error: 'Internal server error' });
//   }
// };

export const checkGroupNoExists = async (req, res) => {
  const { groupNo } = req.params; // Assuming panelID is passed as a parameter

  try {
      // Query the database to find if the panel ID already exists
      const existingGroupNumber = await PresentationShedule.findOne({ groupNo: groupNo });

      if (existingGroupNumber) {
          // Panel ID exists
          res.status(200).json({ exists: true, message: 'Group Numebr already exists.' });
      } else {
          // Panel ID does not exist
          res.status(200).json({ exists: false, message: 'Group Numebr does not exist.' });
      }
  } catch (error) {
      // Error handling
      console.error('Error checking panel ID existence:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

