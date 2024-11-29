import express from 'express';
import { signupUser, signInUser, getUserDetails } from '../controllers/Auth.js';
import { checkAuth } from '../middlewares/mw.js';
const router = express.Router();

router.post('/sign-up', signupUser);
router.post('/sign-in', signInUser);
// TODO: Fix this route - middleware is not working
// router.post("/userfind", checkAuth, getUserDetails)

router.post('/userfind', getUserDetails);

export default router;
