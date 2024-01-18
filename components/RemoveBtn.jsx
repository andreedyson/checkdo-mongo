"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/constants";

import { HiTrash } from "react-icons/hi2";

const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const removeTask = async () => {
    const confirmed = confirm("Are you sure you want to delete this task?");

    if (confirmed) {
      const res = await fetch(
        `${BASE_API_URL}/api/tasks?id=${id}`,
        {
          method: "DELETE",
        },
        { next: { revalidate: 0 } }
      );

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
