import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// register

export const register = async (req, res) => {
  try {
    
    //hashing passwords
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
console.log(req.body.username)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      ph_no: req.body.ph_no,
    });

    
    console.log(newUser);
    await newUser.save();

console.log("e")
    res.status(200).json({ success: true, message: "successfully created" });
  } catch(err) {
    res
      .status(500)
      .json({ success: false, message: "failed to register"});
  }
};

//login

export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ sucess: false, message: "No user found" });
    }
    const checkCorrectPassword =await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }
    const { passsword, role, ...rest } = user._doc;

    
    // create jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRETE_KEY,
      { expiresIn: "15d" }
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        success: true,
        message: "successfully login",
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "failed to login"+err, });
  }
};

// get user count