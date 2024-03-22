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
        enum: ['projectCoodinator', 'projectMember', 'student'],
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
        required() {
            return this.role === 'projectMember';
        }
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
