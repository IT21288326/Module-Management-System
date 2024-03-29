import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Fullname: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    Nic: {
        type: String,
        required: true,
    },
    personalEmailAddress: {
        type: String,
        required: true,
    },
    AddressPer: {
        type: String,
        required: true,
    },
    Addresstemp: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['staffMember', 'student'],
        required: true
    },
    GuardianName: {
        type: String,
        required() {
            return this.role === 'student';
        }
    },
    GuardianContactNo: {
        type: String,
        required() {
            return this.role === 'student';
        }
    },
    ALstream: {
        type: String,
        required() {
            return this.role === 'student';
        }
    },
    designation: {
        type: String,
        required: function() {
            return this.role === 'staffMember';
        },
        enum: ['Instructor', 'Asst. Lec-temp', 'Asst. Lec', 'Lecturer -probation', 'Lecturer', 'Senior Lecturer', 'Senior Lecturer(Higher Grade)', 'Asst. Professor', 'Professor']
    },
    staffRoles: {
        type: [String], // Array of staff roles
        required: function() {
            return this.role === 'staffMember';
        },
        enum: ['projectCoordinator','projectMember', 'co-supervisor', 'supervisor', 'examiner']
    },
    Password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

export { User };

export async function findOne(query) {
    return await User.findOne(query);
}

