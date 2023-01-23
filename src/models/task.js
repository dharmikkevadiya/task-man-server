const { model, Schema } = require("mongoose");
const { TaskStatus } = require("../helper/constant");
const TaskSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.CREATED,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
      index: true,
    },
    assignedAt: { type: Date },
    startAt: { type: Date },
    completeAt: { type: Date },
    note: { type: String },
  },
  { timestamps: true }
);

let Task = new model("Task", TaskSchema);
module.exports = Task;
