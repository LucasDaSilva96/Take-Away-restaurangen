import express from 'express';
import { signupUser, signInUser } from '../controllers/Auth.js';
const router = express.Router();

router.post('/sign-up', signupUser);
router.post('/sign-in', signInUser);

export default router;
