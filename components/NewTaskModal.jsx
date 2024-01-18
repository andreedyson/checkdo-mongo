"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/constants";

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

const NewTaskModal = ({ isVisible, onClose }) => {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [tags, setTags] = useState();
  const [status, setStatus] = useState();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date || !tags || !status) {
      alert("Please enter task information");
      return;
    }

    try {
      const res = await fetch(
        `${BASE_API_URL}/api/tasks`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ title, date, tags, status }),
        },
        { cache: "no-store" }
      );

      if (res.ok) {
        onClose();
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isVisible) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className={`fixed inset-0 flex flex-col items-center justify-center w-full h-screen`}
    >
      <div
        className={`fixed inset-0 w-full h-screen bg-black/25 -z-10`}
        onClick={() => onClose()}
      />
      <div className="p-6 bg-white rounded-xl">
        <h2 className="mb-6 text-2xl font-bold text-center">
          Create a New Task
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 w-[280px]">
            <label htmlFor="task">Task Name</label>
            <div>
              <input
                type="text"
                name="task"
                id="task"
                placeholder="Enter task name..."
                className="w-full px-4 py-2 rounded-md ring-2 ring-slate-200"
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value)}
                value={title || ""}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-[280px]">
            <label>Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  value={date}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-2 w-[280px]">
            <label htmlFor="tags">Tags</label>
            <div>
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="Enter a tag..."
                className="w-full px-4 py-2 rounded-md ring-2 ring-slate-200"
                autoComplete="off"
                onChange={(e) => setTags(e.target.value)}
                value={tags || ""}
              />
            </div>
          </div>
          <div>
            <label>Status</label>
            <Select onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a status" />
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
      </div>
    </form>
  );
};

export default NewTaskModal;
