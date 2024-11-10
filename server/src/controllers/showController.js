import ShowService from "../services/showService.js";

// Add a show
export const addShow = async (req, res) => {
  try {
    const show = await ShowService.addShow(req.body);
    res.status(201).json({
      sucess: true,
      data: show,
      message: "New Show added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all shows
export const getShows = async (req, res) => {
  try {
    const { movieId, theatreId } = req.query;
    const shows = await ShowService.getAllShows({ movieId, theatreId });
    res.status(200).json({
      success: true,
      data: shows,
      message: "Shows fetched successfully",
    });
    console.log(`shows`, shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a show by ID
export const getShowById = async (req, res) => {
  try {
    const show = await ShowService.getShowById(req.params.id);
    if (show) {
      res.status(200).json({
        success: true,
        data: show,
        message: "Show fetched successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a show
export const updateShow = async (req, res) => {
  try {
    const show = await ShowService.updateShow(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: show,
      message: "Show updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a show

export const deleteShow = async (req, res) => {
  try {
    const show = await ShowService.deleteShow(req.params.id);
    if (show) {
      res.status(200).json({
        success: true,
        message: "Show deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
