import TaskList from "@/components/TaskList";
import FloatingButton from "@/components/ui/FloatingButton";
import ModalButton from "@/components/ui/ModalButton";
import { BASE_API_URL } from "@/constants";

import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi2";

export default async function Home() {
  if (!BASE_API_URL) return null;
  return (
    <main className="page-container mb-[60px] lg:mb-0">
      <Link
        href={"/"}
        className="flex items-center justify-center gap-2 mb-8 text-orange-500"
      >
        <HiCheckCircle size={32} />
        <h1 className="text-2xl font-bold">CheckDo</h1>
      </Link>
      <div>
        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <h2 className="text-white page-heading">All Task</h2>
          <ModalButton btnName={"New Task"} />
          <FloatingButton />
          <div>
            <TaskList />
          </div>
        </div>
      </div>
    </main>
  );
}
