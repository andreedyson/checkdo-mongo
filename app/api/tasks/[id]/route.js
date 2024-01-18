import { connectToDB } from "@/lib/database";
import { Task } from "@/models/tasks";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newDate: date,
    newTags: tags,
    newStatus: status,
  } = await req.json();

  await connectToDB();

  await Task.findByIdAndUpdate(id, { title, date, tags, status });
  return NextResponse.json({ message: "Task Updated" }, { status: 200 });
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectToDB();
  const task = await Task.findOne({ _id: id });
  return NextResponse.json({ task });
}
