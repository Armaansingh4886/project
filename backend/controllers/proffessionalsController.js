import Proffessional from "../models/proffessional.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register 


export const register = async (req, res) => {
  try {
    
    //hashing passwords
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
console.log(req.body.username)
    const newUser = new Proffessional({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
      location: req.body.location,
      phno: req.body.phno,
      proffession: req.body.proffession,
      experience: req.body.experience,
      exp_photo: req.body.exp_photo,
      min_charges: req.body.min_charges,
      discription: req.body.discription,

      
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

// login

export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await Proffessional.findOne({ email });
    console.log(user);
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

    console.log(user);


    // create jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
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
      .json({ success: false, message: "failed to login", });
  }
};


//get proffesionals by search
export const getProffessionalBySearch = async(req,res)=>{
 

    //here 'i' means case sensitive
    const City = new RegExp(req.query.city, 'i')
    const Proffession = parseInt(req.query.proffession)
  
    try {
      // gte means greater than or equal
      const proffessional = await Proffession.find({ location:City ,  proffession:Proffession}).populate("reviews");
  
      res.status(200).json({ sucess: true, message: "Successful", data: proffessional });
    } catch (error) {
      res.status(404).json({ sucess: false, message: "Not found" }); 
    } 
  }

//get proffessionals by proffessions

