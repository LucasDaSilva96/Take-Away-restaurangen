import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Valid username is required'],
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
    image: {
      type: String,
      default: 'https://i.pravatar.cc/400',
    },
  },
  { collection: 'Users' }
);

const User = mongoose.model('User', userSchema);

export default User;
