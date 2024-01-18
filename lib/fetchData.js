export const revalidate = 0;

import { connectToDB } from "./database";
import { Task } from "@/models/tasks";

export const fetchTasks = async () => {
  try {
    await connectToDB();

    const tasks = await Task.find({ status: { $ne: "Completed" } }).sort({
      status: -1,
      date: 1,
    });
    return tasks;
  } catch (err) {
    throw new Error("Failed to fetch tasks!");
  }
};

export const fetchCompleted = async () => {
  try {
    await connectToDB();

    const tasks = await Task.find({ status: "Completed" }).sort({
      status: -1,
      date: 1,
    });
    return tasks;
  } catch (err) {
    throw new Error("Failed to fetch tasks!");
  }
};
