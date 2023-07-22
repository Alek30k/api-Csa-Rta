import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);

export default router;
