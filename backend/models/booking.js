import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user"
    },
    proffessionalId: {
        type: mongoose.Types.ObjectId,
        ref: "proffessional"
      },
    date_of_service: {
      type: Date,
    },
    time_slot: {
      type: String
    },
    payment_method: {
      type: String
    },
    address: {
        type: String
      },
    approvel: {
        type: String
      },
      },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
