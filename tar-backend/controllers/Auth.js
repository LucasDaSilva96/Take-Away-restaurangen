import bcrypt from 'bcrypt';
import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { uploadImage } from '../utils/uploadImage.js';

//Create new account
export const signupUser = async (req, res) => {
  //Get email and password from body
  const { email, password, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  //Hash password for increased security
  const hashPass = bcrypt.hash(password, 10).then((hash) => {
    //Create new db entry based on the "User" model.
    const userModel = new User({
      id: uuidv4(),
      email: email,
      password: hash,
      role: 'Customer',
      orders: [],
      username: username,
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

  // let userFound;

  // User.findOne({ email: email })
  //   .then((user) => {
  //     if (!user) {
  //       return res
  //         .status(400)
  //         .json({ message: 'User does not exist. Create an account!' });
  //     }

  //     userFound = user;
  //     return bcrypt.compare(password, user.password);
  //   })
  //   .then((result) => {
  //     if (!result) {
  //       return res.status(400).json({ message: 'Invalid password' });
  //     }

  //     const token = jwt.sign(
  //       {
  //         data: { email: email, userId: userFound?._id },
  //       },
  //       process.env.JWT_SECRET,
  //       { expiresIn: '1h' }
  //     );

  //     return res.status(200).json({
  //       token: token,
  //       userId: userFound._id,
  //       userRole: userFound.role,
  //       expiresIn: 3600,
  //     });
  //   });

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found. Create an account!');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      {
        data: { email: email, userId: user._id },
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    if (!token) {
      throw new Error('Token creation failed');
    }

    return res.status(200).json({
      token: token,
      userId: user._id,
      userRole: user.role,
      expiresIn: 3600,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  const JWT = req.headers.authorization;

  try {
    let decoded = null;

    if (!JWT) {
      return res.status(401).json({ message: 'No JTW provided' });
    }

    jwt.verify(JWT, process.env.JWT_SECRET, function (err, decodedToken) {
      if (err) {
        return res.status(401).json({ message: err.message });
      } else {
        decoded = decodedToken.data;
      }
    });

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findOne({ email: decoded.email });

    if (user) {
      return res.status(200).json({ message: 'User found', data: user });
    } else {
      return res.status(404).json({ message: 'No user found' });
    }
  } catch (err) {
    return res.status(404).json({ message: 'No user found' });
  }
};

export const updateUserDetails = async (req, res) => {
  const { email, username, newEmail } = req.body;
  const image = req.file || null;
  let imageUrl = null;

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (image) {
        const url = await uploadImage(image);
        if (!url) {
          return res.status(400).json({ message: 'Image upload failed' });
        }
        imageUrl = url;
      }

      user.email = newEmail || email;
      user.username = username || user.username;
      user.image = imageUrl || user.image;

      await user.save();

      const token = jwt.sign(
        {
          data: { email: email, userId: user._id },
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res
        .status(200)
        .json({ message: 'User updated successfully', token });
    } else {
      return res.status(404).json({ message: 'No user found' });
    }
  } catch (err) {
    return res.status(404).json({ message: 'Error updating user' });
  }
};
