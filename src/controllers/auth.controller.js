const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//Models
const User = require("../models/User");
const { createToken, validateToken } = require("../middleware/jwt");

// Config
const { sendEmail } = require("../config/email");

const login = async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ error: "Email is not registered!" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(403).json({ error: "Password is incorrect!" });
      } else {
        const token = createToken(
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            role: user.role,
          },
          "30d"
        );
        res.status(200).json({
          token,
          user: {
            name: user.firstName + " " + user.lastName,
            email: user.email,
          },
          message: "Login Successfull!",
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const signup = async function (req, res) {
  try {
    const { firstName, lastName, email, password, gender, role } = req.body;
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: "This email is already registered" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        gender: gender,
        role: role,
      });

      const token = createToken(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          gender: gender,
          role: role,
        },
        "30d"
      );

      await newUser.save();
      return res.status(200).json({
        token,
        user: { name: firstName + " " + lastName, email: email },
        message: "Signup Successfull!",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const changePassword = async function (req, res) {
  try {
    const { password } = req.body;
    const token = req.params.token;

    const validToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = validToken.userId;

    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    console.error("Error changing password:", error.message);
    res
      .status(400)
      .json({ message: "Unable to change password. Please try again." });
  }
};

const verifyEmail = async function (req, res) {
  try {
    const email = req.body.email;
    const subject = "Email Verification!";
    const OTP = Math.floor(100000 + (999999 - 100000) * Math.random());
    sendEmail(
      email,
      subject,
      `Please Verify Your Email! 
      </br> 
      ${OTP}`
    );
    await User.findOneAndUpdate({ email: email }, { otp: OTP });
    res.status(200).json({ message: "OTP Sent Successfully!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const verifyOtp = async function (req, res) {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email: email });

    if (parseInt(req.body.otp) === user.otp) {
      const data = {
        userId: user._id.toString(),
        email: user.email,
      };
      const changePasswordToken = createToken(data, "5m");
      res.status(200).json({ changePasswordToken });
    } else {
      res.status(400).json({ message: "Invalid OTP!" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = { login, signup, changePassword, verifyEmail, verifyOtp };
