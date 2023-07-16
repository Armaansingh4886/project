import Booking from '../models/Booking.js'
import proffessional from '../models/proffessional.js';
import user from '../models/user.js'


export const createBooking = async (req,res,next)=>{

  
    const newBooking = new Booking({
        userId: req.user.id,
        proffessionalId: req.params.id,
        date_of_service: req.body.dos,
        time_slot: req.body.ts,
        payment_method: req.body.payment_method,
        address: req.body.address
    })
    try {
        const savedBooking = await newBooking.save()

        
        res.status(200).json({success:true, message:'Your apointment is booked',
    data:savedBooking})
    } catch (err) {
        res.status(500).json({success:false, message:'internal server error',error:err})
        
    }
}

export const getBooking = async(req,res)=>{
    const id = req.user.id
console.log(id)
    try {
        const book = await Booking.find({"userId":id})

        res.status(200).json({success:true,message:"successful",data: book})
    } catch (err) {
        res.status(404).json({success:false, message: "not found",err})
    }
}

export const getAllBooking = async(req,res)=>{
    const id = req.user.id

    try {
        const books = await Booking.find({"proffessionalId": id})

        res.status(200).json({success:true,message:"successful",data: books})
    } catch (err) {
        res.status(500).json({success:false, message: "internal server error"})
    }
}

export const getBookingByUserId = async(req,res)=>{
    const id = req.params.id
    try {
        const books = await Booking.find({userId: id})

        res.status(200).json({success:true,message:"successfull",data:books})
    } catch (err) {
        res.status(500).json({success:false, message: "internal server error"})
    }
}


export const getBookingByProffessionalId = async(req,res)=>{
    const id = req.params.id
    try {
        const books = await Booking.find({userId: id})

        res.status(200).json({success:true,message:"successfull",data:books})
    } catch (err) {
        res.status(500).json({success:false, message: "internal server error"})
    }
}