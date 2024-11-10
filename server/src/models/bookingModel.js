import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shows",
      required: true,
    },
    seats: {
      type: Array,
      required: true,
      of: Number,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("bookings", bookingSchema);

export default BookingModel;
