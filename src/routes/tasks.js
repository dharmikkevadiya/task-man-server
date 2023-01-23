const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { createTask, getTasks } = require("../controllers/tasks.js");

//@route    PUT /tasks
//@desc     Create task
//@access   PRIVATE
router.post("/tasks/", auth, createTask.controller);

//@route    GET /tasks
//@desc     Get tasks
//@access   PRIVATE
router.get("/tasks", auth, getTasks.controller);

module.exports = router;
