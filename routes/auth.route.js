// import express from "express";
// import { register, login, logout } from "../controllers/auth.controller.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);

// export default router;

import express from "express";
import {
  googleAuth,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

const router = express.Router();

//CREATE A USER
router.post("/logout", logout);

//SIGN IN
router.post("/login", login);

//REGISTER
router.post("/register", register);

//GOOGLE AUTH
router.post("/google", googleAuth);

export default router;
