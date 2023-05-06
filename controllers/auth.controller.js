import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.email });

    if (!user) res.status(404).send("User not found!");

    // const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    // if (!isCorrect)
    //   return next(createError(400, "Wrong password or username!"));

    const { ...info } = user._doc;
    res
      .cookie("accessToken", {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .send("User has been logged out.");
};
