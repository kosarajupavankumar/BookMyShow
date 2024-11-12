import userModel from "../models/userModel.js";

class UserService {
  static async userLogin(userData) {
    try {
      const user = await userModel.find(userData);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error logging in user: " + error.message);
    }
  }

  static async userRegister(userData) {
    try {
      const user = new userModel(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error("Error registering user: " + error.message);
    }
  }

  static async findById(userId) {
    try {
      const user = await userModel.findById(userId);
      return user;
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  }

}

export default UserService;
