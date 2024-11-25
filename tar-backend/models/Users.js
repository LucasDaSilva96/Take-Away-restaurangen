import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4(),
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
