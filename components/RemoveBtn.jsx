"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { HiTrash } from "react-icons/hi2";

const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const removeTask = async () => {
    const confirmed = confirm("Are you sure you want to delete this task?");

    if (confirmed) {
      const res = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <button onClick={removeTask}>
      <HiTrash size={20} />
    </button>
  );
};

export default RemoveBtn;
