import express from "express";
import {signupUser, signInUser} from "../controllers/Auth"
const router = express.Router();

router.post("/sign-up", signupUser)
router.post("/sign-in", signInUser)

module.exports = router;
