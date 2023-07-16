import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Types.ObjectId,
            ref:"user"
        },
        proffessionalId:{
            type: mongoose.Types.ObjectId,
            ref:"proffesional"
        },
        rating:{
            type: Number,
            required:true,
            min:0,
            max:5,
            default:0
        },
        review:{
            type: String,
            required:true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Rating", ratingSchema)