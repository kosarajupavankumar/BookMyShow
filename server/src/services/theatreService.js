import TheatreModel from "../models/theatreModel.js";

class TheatreService {
  static async addTheatre(theatreData) {
    try {
      const theatre = new TheatreModel(theatreData);
      await theatre.save();
      return theatre;
    } catch (error) {
      throw new Error("Error creating theatre: " + error.message);
    }
  }

  static async getAllTheatres() {
    try {
      const theatres = await TheatreModel.find({}).populate("owner");
      return theatres;
    } catch (error) {
      throw new Error("Error retrieving theatres: " + error.message);
    }
  }

  static async getTheatreById(theatreId) {
    try {
      const theatre = await TheatreModel.findById(theatreId);
      if (!theatre) {
        throw new Error("Theatre not found");
      }
      return theatre;
    } catch (error) {
      throw new Error("Error retrieving theatre: " + error.message);
    }
  }

  static async updateTheatre(theatreId, updateData) {
    try {
      const theatre = await TheatreModel.findByIdAndUpdate(
        theatreId,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!theatre) {
        return null;
      }
      return theatre;
    } catch (error) {
      throw new Error("Error updating theatre: " + error.message);
    }
  }

  static async deleteTheatre(theatreId) {
    try {
      const theatre = await TheatreModel.findByIdAndDelete(theatreId);
      if (!theatre) {
        throw new Error("Theatre not found");
      }
      return theatre;
    } catch (error) {
      throw new Error("Error deleting theatre: " + error.message);
    }
  }

  static async getAllTheatresByOwner(ownerId) {
    try {
      const theatres = await TheatreModel.find({ owner: ownerId });
      return theatres;
    } catch (error) {
      throw new Error("Error retrieving theatres: " + error.message);
    }
  }
}

export default TheatreService;
