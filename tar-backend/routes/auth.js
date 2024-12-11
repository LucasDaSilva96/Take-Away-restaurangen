import express from 'express';
import {
  signupUser,
  signInUser,
  getUserDetails,
  updateUserDetails,
} from '../controllers/Auth.js';
import { checkAuth } from '../middlewares/mw.js';
import { uploadImageMiddleware } from '../utils/uploadImage.js';
const router = express.Router();

router.post(
  '/update',
  uploadImageMiddleware.single('image'),
  updateUserDetails
);
router.post('/sign-up', signupUser);
router.post('/sign-in', signInUser);
router.post('/userfind', checkAuth, getUserDetails);

export default router;
