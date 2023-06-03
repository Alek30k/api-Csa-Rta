// import express from "express";
// import { register, login, logout } from "../controllers/auth.controller.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);

// export default router;

import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup);

//SIGN IN
router.post("/signin", signin);

//GOOGLE AUTH
router.post("/google", googleAuth);

export default router;
