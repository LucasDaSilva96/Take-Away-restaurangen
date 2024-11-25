import bcrypt from 'bcrypt';
import User from '../models/Users.js';
import { sign } from 'jsonwebtoken';

//Create new account
export const signupUser = async (req, res) => {
  //Get email and password from body
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  //Hash password for increased security
  const hashPass = bcrypt.hash(password, 10).then((hash) => {
    //Create new db entry based on the "User" model.
    const userModel = new User({
      email: email,
      password: hash,
      role: 'Customer',
      orders: [],
    });

    //Push new user to database
    userModel
      .save()
      .then(() => {
        res.status(201).json({ message: 'User created successfully' });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error creating user', error: err });
      });
  });
};

export const signInUser = async (req, res) => {
  const { email, password } = req.body;

  let userFound;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ message: 'User does not exist. Create an account!' });
      }

      userFound = user;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = sign(
        { email: email, userId: userFound._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.status(200).json({
        token: token,
        userId: userFound._id,
        userRole: userFound.role,
        expiresIn: 3600,
      });
    });
};
