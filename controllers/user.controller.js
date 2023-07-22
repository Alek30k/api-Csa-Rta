import User from "../models/user.model.js";

export const deleteUser = async (req, res, next) => {
  // const user = await User.findById(req.params.id);

  // if (req.userId !== user._id.toString()) {
  //   res.status(400).json("You can delete only your account!");
  // }
  // await User.findByIdAndDelete(req.params.id);
  // res.status(200).send("deleted.");

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};
