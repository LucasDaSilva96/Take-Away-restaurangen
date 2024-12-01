import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Valid email is required'],
    },
    password: {
      type: String,
      required: [true, 'Valid password is required'],
    },
    role: {
      type: String,
      default: 'Customer',
    },
    orders: [],
  },
  { collection: 'Users' }
);

const User = mongoose.model('User', userSchema);

export default User;
