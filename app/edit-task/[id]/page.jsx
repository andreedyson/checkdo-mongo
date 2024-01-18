import React from "react";
import EditTaskForm from "@/components/EditTaskForm";
import { BASE_API_URL } from "@/constants";

const getTaskById = async (id) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/tasks/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch task");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const EditTaskPage = async ({ params }) => {
  const { id } = params;

  const { task } = await getTaskById(id);

  const { title, date, tags, status } = task;

  return (
    <EditTaskForm
      id={id}
      title={title}
      date={date}
      tags={tags}
      status={status}
    />
  );
};

export default EditTaskPage;
