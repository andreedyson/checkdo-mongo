import {
  HiSquares2X2,
  HiInbox,
  HiCalendarDays,
  HiPlusCircle,
} from "react-icons/hi2";

export const navLinks = [
  {
    title: "Overview",
    path: "/",
    icon: <HiSquares2X2 size={20} />,
  },
  {
    title: "Inbox",
    path: "/inbox",
    icon: <HiInbox size={20} />,
  },
  {
    title: "Today",
    path: "/today",
    icon: <HiCalendarDays size={20} />,
  },
];
