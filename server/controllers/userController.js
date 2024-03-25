
import { User } from '../models/usermodel.js';


// Controller for creating a new user
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({ message: 'Successfully added member' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for retrieving all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for retrieving a single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for updating a user by ID
export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for deleting a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};











// // Controller for retrieving project members
// export const getProjectMembers = async (req, res) => {
//   try {
//     // Find users with role "projectMember" and select only their full names
//     const projectMembers = await User.find({ role: 'projectMember' }, 'Fullname');
//     res.json(projectMembers);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// Controller for retrieving project members
export const getProjectMembers = async (req, res) => {
  try {
    // Find users with role "projectMember"
    const projectMembers = await User.find({ designation: "Lecturer" });

    // Extract full names from projectMembers
    const projectMemberFullnames = projectMembers.map(member => member.Fullname);

    // Send the array of full names as the response
    res.json(projectMemberFullnames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get all staff members with their name, email, and designation
export const getStaffMembers = async (req, res) => {
  try {
    const staffMembers = await User.find({ role: 'staffMember' }, 'Fullname Email designation');
    res.status(200).json(staffMembers);
  } catch (error) {
    console.error('Error fetching staff members:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const updateStaffRole = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the staffRoles field
    user.staffRoles.push('projectMember');
    await user.save();

    return res.status(200).json({ message: 'Staff role updated successfully' });
  } catch (error) {
    console.error('Error updating staff role:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { updateStaffRole };