import BookingModel from "../models/bookingModel.js";
import stripe from "stripe";
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

class BookingService {
  static async makePayment(paymentData) {
    try {
      const { token, amount } = paymentData;

      // Payment gateway integration code will go here using stripe
      // For now, we are assuming that payment is successful

      const customer = await stripeInstance.customers.create({
        email: token.email,
        source: token.id,
      });

      // Create a payment intent
      const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: amount * 100, // amount in cents
        currency: "usd",
        payment_method: token.id,
        confirm: true,
      });

      const booking = await BookingService.createBooking({
        user: token.email,
        amount: amount,
        transactionId: paymentIntent.id,
        description: "Movie Ticket Booking",
        receipt_email: token.email,
      });

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
