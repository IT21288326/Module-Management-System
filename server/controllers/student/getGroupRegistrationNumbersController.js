import GroupRegistration from "../../models/student/GrpRegistration.js"

export const getGroupRegNumbers = async (req, res, next) => {
    try {
      const groupRegistrationNumbers = await GroupRegistration.find({}, 'GroupRegistrationNo');
      const gropNumbers = groupRegistrationNumbers.map(g => g.GroupRegistrationNo);
      res.json(gropNumbers);
  } catch (error) {
      res.status(500).json({ error: 'Failed to get group Number' });
  }
  };