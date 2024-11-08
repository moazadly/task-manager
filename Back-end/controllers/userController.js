const User = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email }).populate("tasks");
    if (userExists) {
      if (await bcrypt.compare(password, userExists.password)) {
        const token = jwt.sign({ id: userExists._id }, "secretKey", {
          expiresIn: "23h",
        });
        const data = {
          name: userExists.firstName + " " + userExists.lastName,
          id: userExists._id,
          tasks: userExists.tasks,
        };
        console.log(data);
        return res.status(200).json({
          message: "You have logged in successfuly",
          data,
          token,
        });
      } else {
        return res.status(404).json({ message: "Invalid email or password" });
      }
    } else
      return res.status(404).json({ message: "Invalid email or password" });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Bad request ", message: error.message });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      if (!firstName || !lastName) {
        return res.status(400).json({ message: "Enter your Name" });
      }
      if (!password) {
        return res.status(400).json({ message: "Enter your Password" });
      }
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });
      await newUser.save();
      return res.status(201).json({ message: "You are Signup successfully" });
    } else {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Bad request ", message: error.message });
  }
};
