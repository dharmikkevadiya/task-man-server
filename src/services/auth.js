const User = require("../models/user"); //Database Model
let { checkPassword } = require("../helper/helper");
const { MSG } = require("../helper/constant");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

class AuthService {
  async signup(body) {
    console.log("body::", body);
    const { firstName, lastName, phone, email, password } = body;

    // check user already exist
    const isUserExist = await User.findOne({ email });
    if (isUserExist) throw CustomErrorHandler.alreadyExist(MSG.EMAIL_TAKEN);

    // create user
    const newUser = await User.register({
      firstName,
      lastName,
      phone,
      email,
      password,
    });

    return newUser;
  }

  async login(body) {
    const { email, password } = body;

    let user = await User.findOne({ email }).select("+password");

    // chack email
    if (!user) if (!user) throw CustomErrorHandler.wrongCredentials();

    // check password
    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) throw CustomErrorHandler.wrongCredentials();

    const token = await user.generateAuthToken();

    user = JSON.parse(JSON.stringify(user));
    delete user.password;
    user.token = token;

    return user;
  }
}

module.exports = AuthService;
