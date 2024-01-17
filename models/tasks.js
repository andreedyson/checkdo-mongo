import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 30,
  },
  date: Date,
  tags: {
    type: String,
    min: 3,
    max: 20,
  },
  status: String,
});

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
