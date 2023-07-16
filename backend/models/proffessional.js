import mongoose from "mongoose";

const proffessionalsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
        type: String
    },
    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
    },

    profession: {
      type: String,
      required: true
    },
    phno:{
        type: Number
    },
    experience :{
        type : String,

    },
    exp_photo: {
        type: String
    },
    min_charges:{
        type: Number
    },
    role:{
      type:String,
      default: "proffessional"
    },
    discription:{
        type: String
    },
  
    rating:[
      {
        type: mongoose.Types.ObjectId
      }
    ]
},
  { timestamps: true }
);

export default mongoose.model("Proffessionals", proffessionalsSchema);
