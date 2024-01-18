import { connectToDB } from "@/lib/database";
import { Task } from "@/models/tasks";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, date, tags, status } = await req.json();

  await connectToDB();

  await Task.create({ title, date, tags, status });

  return NextResponse.json({ message: "Task Created" }, { status: 201 });
}

export async function GET() {
  await connectToDB();

  const tasks = await Task.find();

  return NextResponse.json({ tasks }, { status: 200 });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");

  await connectToDB();

  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
}
