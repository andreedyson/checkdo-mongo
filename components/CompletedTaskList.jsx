import React from "react";
import { fetchCompleted } from "@/lib/fetchData";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";

import { HiMiniPencilSquare } from "react-icons/hi2";

const CompletedTaskList = async () => {
  const tasks = await fetchCompleted();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-y-3 lg:justify-start gap-x-4 lg:gap-y-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col p-4 text-white bg-[#39e15d] rounded-lg w-[300px]"
          >
            <div className="space-y-2">
              <p className="text-base font-bold lg:text-lg">{task.title}</p>
              <p className="hidden px-2 py-1 text-xs font-semibold text-white bg-blue-400 rounded-full sm:inline-block">
                {task.tags}
              </p>
              <p className="text-sm font-semibold">
                {task.date
                  .toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  .slice(0, 16)}
              </p>
              <div className="flex justify-between">
                <p
                  className={`text-sm font-semibold ${
                    task.status === "Inbox"
                      ? "text-gray-500"
                      : task.status === "In Progress"
                      ? "text-sky-500"
                      : task.status === "Completed"
                      ? "text-green-800"
                      : ""
                  }`}
                >
                  {task.status}
                </p>
                <div className="flex items-center gap-4">
                  <RemoveBtn id={task._id} />
                  <Link href={`/edit-task/${task._id}`}>
                    <HiMiniPencilSquare size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedTaskList;
