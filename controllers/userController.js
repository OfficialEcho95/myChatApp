const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const {
  hashPassword,
  isPassMatched,
  generateToken,
} = require("../util/helpers");

exports.createuser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    //Check if email exists
    const emailFound = await User.findOne({ email });
    if (emailFound) {
      return res.status(404).json({
        status: "Error",
        message: "Email address exists",
      });
    }
    //Check if username exists
    const usernameFound = await User.findOne({ username });
    if (usernameFound) {
      return res.status(404).json({
        status: "Error",
        message: "Username already taken",
      });
    }

    const user = await User.create({
      username: username,
      name: name,
      email: email,
      password: await hashPassword(password), //Hash password
    });


    res.status(201).json({
      status: "success",
      data: user,
      message: "User profile created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Invalid login credential");
    }

    const passwordMatch = await isPassMatched(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid login credentials" });
    } else {
      const token = generateToken(user._id);
      req.session.token = token;

      return res.status(200).json({
        data: token,
        message: "User logged in successfully",
        redirect: "/dashboard",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.logoutUser = async (req, res) => {
  delete req.session.token;
  res.status(200).json({ message: "logged out" });
};

exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.session.token);

    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    console.log(err.message);
  }
};
