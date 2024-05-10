import express from 'express';
import GroupRegistration from '../../models/student/GrpRegistration.js';

const router = express.Router();

// Fetch leaders' and members' names and registration numbers based on group registration number
router.get('/:groupRegistrationNo', async (req, res) => {
    try {
        const { groupRegistrationNo } = req.params;
        const group = await GroupRegistration.findOne({ GroupRegistrationNo: groupRegistrationNo });

        if (group) {
            const leadersAndMembers = {
                leader: {
                    name: group.leaderName,
                    registrationNo: group.leadersRegistrationNO,
                },
                members: [
                    {
                        name: group.Member2Name,
                        registrationNo: group.Member2RegistrationNO,
                    },
                    {
                        name: group.Member3Name,
                        registrationNo: group.Member3RegistrationNO,
                    },
                    {
                        name: group.Member4Name,
                        registrationNo: group.Member4RegistrationNO,
                    },
                ],
            };
            res.json(leadersAndMembers);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching group data', error });
    }
});

export default router;
