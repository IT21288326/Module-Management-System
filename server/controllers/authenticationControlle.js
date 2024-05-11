// // import bcrypt from 'bcrypt';

// // import { findOne } from '../models/usermodel.js';

// // export async function login(req, res) {
// //   const { Email, Password } = req.body;

// //   try {
// //     // Find the user by email
// //     const user = await findOne({ Email });

// //     // If user not found
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     // Check if password is correct
// //     const isPasswordValid = await (Password, user.Password);
// //     if (!isPasswordValid) {
// //       return res.status(401).json({ message: 'Invalid credentials' });
// //     }

// //     // Create JWT token
// //     const token = sign({ userId: user._id, role: user.role }, 'a9622be0e1ae0db6e1d8d34c1ea05072b29e22286e667d1638829dc52b2e20d0', { expiresIn: '1h' });

// //     // Determine redirect URL based on user's role
// //     let redirectURL;
// //     if (user.role === 'projectCoordinator') {
// //       //redirectURL = '/student-profile'; // Replace with your student profile route
// //       redirectURL = 'http://localhost:3000/coo'
// //     } else if (user.role === 'projectMember') {
// //       redirectURL = '/project-member-profile'; // Replace with your project member profile route
// //     // } else if (user.role === 'projectCoordinator') {
// //     //   redirectURL = '/project-coordinator-profile'; // Replace with your project coordinator profile route
// //     }

// //     // Send token and redirect URL in response
// //     res.json({ token, redirectURL });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // }
// import bcrypt from 'bcrypt';
// import { findOne } from '../models/usermodel.js';
// import jwt from 'jsonwebtoken'; // Make sure you import the `jsonwebtoken` package

// export async function login(req, res) {
//     const { Email, Password } = req.body;

//     try {
//         // Find the user by email
//         const user = await findOne({ Email });

//         // If user not found
//         if (!user) {
//             console.log('User not found');
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if password is correct
//         const isPasswordValid = await bcrypt.compare(Password, user.Password);
//         if (!isPasswordValid) {
//             console.log('Invalid credentials');
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Create JWT token
//         const token = jwt.sign(
//             { userId: user._id, staffRoles: user.staffRoles },
//             'a9622be0e1ae0db6e1d8d34c1ea05072b29e22286e667d1638829dc52b2e20d0', // Make sure the secret key is correctly configured
//             { expiresIn: '1h' }
         
//         );

//             // Determine redirect URL based on user's role
//     let redirectURL;
//     if (user.staffRoles === 'projectCoordinator') {
//       //redirectURL = '/student-profile'; // Replace with your student profile route
 
//  console.log("HI");     
//     } else if (user.role === 'projectMember') {
//       redirectURL = '/project-member-profile'; // Replace with your project member profile route
//     // } else if (user.role === 'projectCoordinator') {
//     //   redirectURL = '/project-coordinator-profile'; // Replace with your project coordinator profile route
//     }

//         // Send token and response
//         res.json({ token, redirectURL});
//     } catch (error) {
//         console.error('Internal server error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }
import bcrypt from 'bcrypt';
import { findOne } from '../models/usermodel.js';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
    const { Email, Password } = req.body;

    try {
        // Find the user by email
        const user = await findOne({ Email });

        // If user not found
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            console.log('Invalid credentials');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, staffRole: user.staffRoles },
            'a9622be0e1ae0db6e1d8d34c1ea05072b29e22286e667d1638829dc52b2e20d0',
            { expiresIn: '1h' }
        );

        // Determine redirect URL based on user's role
        let redirectURL;
        if (user.staffRoles === 'projectCoordinator') {
            console.log('User is a project coordinator');
            redirectURL = 'http://localhost:3000/coo';
        } else {
            // Handle other roles (e.g., student, project member) and set appropriate redirect URL
            redirectURL = '/default-url'; // Change this to the actual default URL for other roles
        }

        // Send token, user data, and redirect URL in the response
        res.json({ token, user, redirectURL });
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
