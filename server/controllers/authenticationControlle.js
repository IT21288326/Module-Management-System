import bcrypt from 'bcrypt';

import { findOne } from '../models/usermodel.js';

export async function login(req, res) {
  const { Email, Password } = req.body;

  try {
    // Find the user by email
    const user = await findOne({ Email });

    // If user not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password is correct
    const isPasswordValid = await (Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = sign({ userId: user._id, role: user.role }, 'a9622be0e1ae0db6e1d8d34c1ea05072b29e22286e667d1638829dc52b2e20d0', { expiresIn: '1h' });

    // Determine redirect URL based on user's role
    let redirectURL;
    if (user.role === 'student') {
      redirectURL = '/student-profile'; // Replace with your student profile route
    } else if (user.role === 'projectMember') {
      redirectURL = '/project-member-profile'; // Replace with your project member profile route
    // } else if (user.role === 'projectCoordinator') {
    //   redirectURL = '/project-coordinator-profile'; // Replace with your project coordinator profile route
    }

    // Send token and redirect URL in response
    res.json({ token, redirectURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}