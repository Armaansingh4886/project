import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const Admin = await Admin.findOne({ username });
    if (!Admin) {
      res.status(404).json({ success: false, message: "no admin found" });
    }
    const checkCorrectPassword = await bcrypt.compare(Admin.password, password);
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "incorrect username or password" });
    }
    const {  password, role, ...rest } = admin._doc;
    // create jwt

    const token = jwt.sign({ id: admin._id }, rocess.env.JWT_SECRETE_KEY, {
      expiresIn: "15d",
    });

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.exiresIn,
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successfully",
        token,
        data: { ...rest },
      });
  } catch (err) {
    res.status(500), json({ success: false, mesage: "failed to login" });
  }
};
