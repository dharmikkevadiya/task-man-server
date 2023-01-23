const User = require("../models/user"); //Database Model
const Task = require("../models/task");
let { MSG } = require("../helper/constant");
const StatusCodes = require("http-status");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

class TaskService {
  async createTask(userId, body) {
    const { title, createdBy, note } = body;
    const obj = {
      title,
      createdBy: userId,
      note,
    };
    const newTask = await new Task(obj).save();

    return newTask;
  }

  async getTasks(params) {
    let tasks;
    let query = {};

    if (params.forUser) query.user = params.forUser;

    tasks = await Task.find(query);
    if (!tasks.length) throw CustomErrorHandler.notFound("Tasks not found!");
    return tasks;
  }
}

module.exports = TaskService;
