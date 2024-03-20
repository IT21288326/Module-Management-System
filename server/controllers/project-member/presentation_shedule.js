import PresentationShedule from "../../models/project-member/presentation_shedule.js";

const createPresentationShedule = async (req, res, next) => {
  const newPresentationShedule = new PresentationShedule(req.body);
  try {
    const savedPresentationShedule = await newPresentationShedule.save();
    res.status(200).json(savedPresentationShedule);
  } catch (err) {
    next(err);
  }
};

export default createPresentationShedule;
