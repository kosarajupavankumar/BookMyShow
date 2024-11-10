import BookingService from "../services/bookingService.js";
import ShowService from "../services/showService.js";

// make a payment
export const makePayment = async (req, res) => {
  try {
    req.body.user = req.userDetails._id;
    const booking = await BookingService.makePayment(req.body);

    // After making th payment , we need to update seat status to booked in the show
    const show = await ShowService.getShowById(req.body.show);

    // after getting the show, we need to make sure that the seats are updated to bookedSeats as present in schema
    const updatedShow = {
      ...show._doc,
      bookedSeats: [...show.bookedSeats, ...req.body.seats],
    };

    await ShowService.updateShow(req.body.show, updatedShow);

    res.status(201).json({
      success: true,
      data: booking,
      message: "New Booking done!!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a booking

export const createBooking = async (req, res) => {
  try {
    const booking = await BookingService.createBooking(req.body);
    res.status(201).json({
      success: true,
      data: booking,
      message: "Booking created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookings

export const getAllBookings = async (req, res) => {
  try {
    const filter = req.userDetails.isAdmin ? {} : { user: req.userDetails._id };
    const bookings = await BookingService.getAllBookings(filter);
    res.status(200).json({
      success: true,
      data: bookings,
      message: "Bookings fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
