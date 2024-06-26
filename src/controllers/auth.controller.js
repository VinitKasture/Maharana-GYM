const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//Models
const User = require("../models/User");
const { createToken, validateToken } = require("../middleware/jwt");
const Bmi = require("../models/Bmi");

// Config
const { sendEmail } = require("../config/email");

const getUserProfile = async function (req, res, next) {
  try {
    const user = await User.findOne(
      { _id: req.user._id },
      {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        number: 1,
        address: 1,
        role: 1,
        gender: 1,
        profilePic: 1,
      }
    );
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async function (req, res, next) {
  try {
    const { userDetails } = req.body;
    const email = userDetails.email.toLowerCase();

    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: email,
        number: userDetails.number,
        address: userDetails.address,
        gender: userDetails.gender,
      }
    );
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

const updateUserProfilePic = async function (req, res, next) {
  try {
    const profilePic = req.body;

    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { profilePic: profilePic.profilePic }
    );
    res.status(200).json({ data: "Profile picture changed successfully!" });
  } catch (error) {
    next(error);
  }
};

const getBmiDetails = async function (req, res, next) {
  try {
    const bmi = await Bmi.findOne({ userId: req.user._id });

    res.status(200).json({ data: bmi });
  } catch (error) {
    next(error);
  }
};

const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email is not registered!");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Password is incorrect!");
      } else {
        const token = createToken(
          {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            bmiId: user.bmiId,
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
    next(error);
  }
};

const signup = async function (req, res, next) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      number,
      gender,
      role,
      address,
      membership,
    } = req.body;
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      throw new Error("This email is already registered");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        number: number,
        gender: gender,
        membership: {
          from: membership.from,
          to: membership.to,
        },
        role: role,
        address: address,
      });

      await newUser.save();

      const bmi = await new Bmi({ userId: newUser._id }).save();

      return res.status(200).json({
        user: { name: firstName + " " + lastName, email: email },
        message: "Signup successfull, please login!",
      });
    }
  } catch (error) {
    next(error);
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

module.exports = {
  login,
  signup,
  changePassword,
  verifyEmail,
  verifyOtp,
  getUserProfile,
  updateUserProfile,
  updateUserProfilePic,
  getBmiDetails,
};
