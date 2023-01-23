const TaskService = require("../services/tasks");
const service = new TaskService();
let { MSG } = require("../helper/constant");
const StatusCodes = require("http-status");
let { Response } = require("../helper/helper");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

module.exports.createTask = {
  controller: async function createTask(req, res, next) {
    try {
      const userId = req.user._id;

      let result = await service.createTask(userId, req.body);
      return res.json(Response(MSG.CREATE_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getTasks = {
  controller: async function getTasks(req, res, next) {
    try {
      let result = await service.getTasks(req.query);
      return res.json(Response(MSG.FOUND_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};
