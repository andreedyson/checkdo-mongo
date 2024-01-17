import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "CheckDo - MongoDB CRUD",
  description: "A MongoDB based CRUD To-Do Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col lg:flex-row max-w-[1920px] mx-auto ${montserrat.className}`}
      >
        {children}
      </body>
    </html>
  );
}
