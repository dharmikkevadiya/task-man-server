const AuthService = require("../services/auth");
const service = new AuthService();
let { MSG } = require("../helper/constant");
let { Response } = require("../helper/helper");

module.exports.signup = {
  // validator: celebrate({ body: userSchema.signup }),
  controller: async function signup(req, res, next) {
    try {
      let result = await service.signup(req.body);

      res.json(Response(MSG.SIGNUP_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.login = {
  // validator: celebrate({ body: userSchema.login }),
  controller: async function login(req, res, next) {
    try {
      let result = await service.login(req.body);

      res.json(Response(MSG.LOGIN_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};
