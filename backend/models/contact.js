import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        ph_no:{
            type:String
        },
        title:{
            type: String
        },
        message:{
            type: String
        }
    },
    {timestamps: true}
)

export default mongoose.model("Contact", contactSchema);