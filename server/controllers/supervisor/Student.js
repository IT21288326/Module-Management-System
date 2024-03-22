import GroupRegistration from '../../models/student/GrpRegistration.js';


// Controller to get a single group registration by ID
export const getGroupRegistrationById = async (req, res) => {
    try {
            const groupID = req.params.groupID;
            const group = await GroupRegistration.findOne({ GroupRegistrationNo: groupID });
            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }
            const students = [
                { name: group.leaderName },
                { name: group.Member1Name },
                { name: group.Member2Name },
                { name: group.Member3Name }
            ];
            res.json(students);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
};


