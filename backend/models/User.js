import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    role: {
        type: String,
        default: 'student',
    },
    status: {
        type: String,
        default: 'inactive',
    },
});

const User = mongoose.model('User', userSchema);

export default User;  // Export using ES Module syntax
