import { connectToDB } from "./database";
import { Task } from "@/models/tasks";

export const fetchTasks = async () => {
  try {
    await connectToDB();

    const tasks = await Task.find({}).sort({
      status: -1,
      date: 1,
    });
    return tasks;
  } catch (err) {
    throw new Error("Failed to fetch tasks!");
  }
};
