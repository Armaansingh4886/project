import  express from "express";
import { createBooking,getBooking,getAllBooking, getBookingByUserId, getBookingByProffessionalId} from "../controllers/bookingController.js";
import {verifyUser,verifyAdmin, verifyProffessional} from "../utils/verifyToken.js"
const router = express.Router()

router.post('/book/:id',verifyUser,createBooking )
router.get('/',verifyUser,getBooking )

router.get('/',verifyProffessional, getAllBooking)
// router.get('/',verifyAdmin, getAllBooking)
 
// router.get('/:id',verifyAdmin, getBookingByUserId)

export default router