import { BASE_API_URL } from "@/constants";

export const fetchTasks = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/tasks`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return res.json();
  } catch (err) {
    console.log(error);
  }
};
