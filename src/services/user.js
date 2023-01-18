const User = require("../models/user"); //Database Model
let { MSG, UserRole } = require("../helper/constant");
const StatusCodes = require("http-status");
const CustomErrorHandler = require("../helper/CustomErrorHandler");
const { FileStorage } = require("../helper/file_storage");
const fileStorage = new FileStorage();

class UserService {
  async getMe(user) {
    return user;
  }

  async getAllUsers() {
    const users = await User.find();
    if (!users.length) throw CustomErrorHandler.userNotFound();

    return users;
  }

  async getSingleUser(id) {
    const user = await User.findById(id);
    if (!user) throw CustomErrorHandler.userNotFound();

    return user;
  }

  async updateUser(id, body) {
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    if (!user) throw CustomErrorHandler.userNotFound();

    return user;
  }

  async uploadAvatar(id, file) {
    console.log("file::", file);
    let user = await User.findById(id);
    if (!user) throw CustomErrorHandler.userNotFound();

    // if avater is already uploaded then delete it
    if (user.avatar) fileStorage.remove(user.avatar);

    user.avatar = file.filename;
    user = await user.save();

    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw CustomErrorHandler.userNotFound();
    return user;
  }

  async followUser(id, user) {
    let userData = await User.findById(id);
    if (!userData) throw CustomErrorHandler.userNotFound();

    if (user.following.includes(id))
      throw CustomErrorHandler.badRequest("Already followd!");

    user.following.unshift(id);
    userData.followers.unshift(user._id);

    user = await user.save();
    await userData.save();
    return user;
  }

  async unfollowUser(id, user) {
    let userData = await User.findById(id);
    if (!userData) throw CustomErrorHandler.userNotFound();

    if (!user.following.includes(id))
      throw CustomErrorHandler.badRequest("User has not yet been followd!");

    user.following.splice(user.following.indexOf(id), 1);
    userData.followers.splice(userData.followers.indexOf(user._id), 1);

    user = await user.save();
    await userData.save();
    return user;
  }
}

module.exports = UserService;
