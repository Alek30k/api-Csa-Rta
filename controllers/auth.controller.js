// import User from "../models/user.model.js";

// export const register = async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).send("User has been created.");
//   } catch (error) {
//     res.status(500).send("Something went wrong!");
//   }
// };

// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) res.status(404).send("User not found!");

//     // const isCorrect = bcrypt.compareSync(req.body.password, user.password);
//     // if (!isCorrect)
//     //   return next(createError(400, "Wrong password or username!"));

//     const { ...info } = user._doc;
//     res
//       .cookie("accessToken", {
//         httpOnly: true,
//       })
//       .status(200)
//       .send(info);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const logout = async (req, res) => {
//   res
//     .clearCookie("accessToken", {
//       secure: true,
//       sameSite: "none",
//     })
//     .status(200)
//     .send("User has been logged out.");
// };

import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, "agsjdg7657HGDAJ67rjdhgadhkjf");
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, "agsjdg7657HGDAJ67rjdhgadhkjf");
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign(
        { id: savedUser._id },
        "agsjdg7657HGDAJ67rjdhgadhkjf"
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
