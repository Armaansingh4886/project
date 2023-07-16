import Proffessional from "../models/proffessional.js";
import Rating from "../models/rating.js";

export const createReview = async (req,res)=>{
    const proffessionalId = req.params.id
    const newRating = new Rating({
        userId: req.user.id,
        proffessionalId: req.params.id,
        rating: req.body.rating,
        review: req.body.review
    })

    try {
        const savedReview = await newRating.save()

        await Proffessional.findByIdAndUpdate(proffessionalId,{
            $push : {rating: savedReview._id}
        })

       return  res.status(200).json({success:true,message:"review saved successfully",data:savedReview})
    } catch (err) {
       return  res.status(500).jason({success:false,message:"Failed to submit"})
        
    }

}