"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditTaskForm = ({ id, title, date, tags, status }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDate, setNewDate] = useState(date);
  const [newTags, setNewTags] = useState(tags);
  const [newStatus, setNewStatus] = useState(status);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ newTitle, newDate, newTags, newStatus }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to edit task");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full h-screen p-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-white">Edit your task</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-[280px]">
          <label htmlFor="task" className="text-white">
            Task Name
          </label>
          <div>
            <input
              type="text"
              name="task"
              id="task"
              placeholder="Edit task name..."
              className="w-full px-4 py-2 rounded-md ring-2 ring-slate-200"
              autoComplete="off"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              min={3}
              max={30}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[280px]">
          <label className="text-white">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !newDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                {newDate ? format(newDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={setNewDate}
                value={newDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2 w-[280px]">
          <label htmlFor="tags" className="text-white">
            Tags
          </label>
          <div>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Edit task's tag..."
              className="w-full px-4 py-2 rounded-md ring-2 ring-slate-200"
              autoComplete="off"
              onChange={(e) => setNewTags(e.target.value)}
              value={newTags || ""}
            />
          </div>
        </div>
        <div>
          <label className="text-white">Status</label>
          <Select
            onValueChange={(value) => setNewStatus(value)}
            value={newStatus}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Edit task's status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="Inbox">Inbox</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-[280px] mt-6">
        <button
          type="submit"
          className="w-full p-2 font-semibold duration-200 rounded-md bg-slate-200 hover:bg-slate-300 -z-10"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
