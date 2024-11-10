import userModel from "../models/userModel.js";
import TheatreService from "../services/theatreService.js";

// Add a theatre
export const addTheatre = async (req, res) => {
  try {
    console.log(`req.body.owner`, req.body.owner);
    const isOwnerValid = await userModel.findOne({ _id: req.body.owner });

    if (isOwnerValid === null) {
      return res.status(400).json({ message: "Invalid owner ID" });
    }

    const theatre = await TheatreService.addTheatre(req.body);
    res.status(201).json(theatre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all theatres
export const getTheatres = async (req, res) => {
  try {
    const userDetails = req.userDetails;
    let theatres;

    if (userDetails.isAdmin) {
      theatres = await TheatreService.getAllTheatres();
    } else {
      theatres = await TheatreService.getAllTheatresByOwner(userDetails._id);
    }

    res.status(200).json(theatres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a theatre by ID
export const getTheatreById = async (req, res) => {
  try {
    const theatre = await TheatreService.getTheatreById(req.params.id);
    res.status(200).json(theatre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a theatre
export const updateTheatre = async (req, res) => {
  try {
    const theatre = await TheatreService.updateTheatre(req.params.id, req.body);
    res.status(200).json(theatre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a theatre
export const deleteTheatre = async (req, res) => {
  try {
    await TheatreService.deleteTheatre(req.params.id);
    res.status(204).send({
      success: true,
      message: "Theatre deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
