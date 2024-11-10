import BookingModel from "../models/bookingModel.js";

class BookingService {
  static async makePayment(paymentData) {
    try {
      const booking = new BookingModel(paymentData);
      await booking.save();
      return booking;
    } catch (error) {
      throw new Error("Error making payment: " + error.message);
    }
  }

  static async createBooking(bookingData) {
    try {
      const booking = new BookingModel(bookingData);
      await booking.save();
      return booking;
    } catch (error) {
      throw new Error("Error creating booking: " + error.message);
    }
  }

  static async getAllBookings(filter) {
    try {
      const bookings = await BookingModel.find(filter)
        .populate("show")
        .populate("user");
      return bookings;
    } catch (error) {
      throw new Error("Error getting bookings: " + error.message);
    }
  }
}

export default BookingService;
