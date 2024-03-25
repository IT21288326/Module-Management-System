
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



// // Controller for retrieving project members
// export const getProjectMembers = async (req, res) => {
//   try {
//     // Find users with role "projectMember"
//     const projectMembers = await User.find({ role: "staffMember" });

//     // Extract full names from projectMembers
//     const projectMemberFullnames = projectMembers.map(member => member.Fullname);

//     // Send the array of full names as the response
//     res.json(projectMemberFullnames);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

//Controller for retrieving "projectMember", "projectCoordinator," and "staffMember
export const getProjectMembers = async (req, res) => {
  try {
    // Find users with roles "projectMember," "projectCoordinator," and "staffMember"
    const projectMembers = await User.find({ role: { $in: ["projectMember", "projectCoordinator", "staffMember"] } });

    // Extract full names from projectMembers
    const projectMemberFullnames = projectMembers.map(member => member.Fullname);

    // Send the array of full names as the response
    res.json(projectMemberFullnames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

