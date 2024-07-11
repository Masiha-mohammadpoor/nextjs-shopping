import "../../globals.css";
import vazirFont from "@/constants/localFonts";
import Header from "../../../components/Header";
import { Toaster } from "react-hot-toast";
import Providers from "../../providers";
import SideBar from "./SideBar";
export const metadata = {
  title: "Next Shop Panel",
  description: "Next.js Course Fronthooks Course",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <main className="grid grid-cols-4 h-screen">
          <section className="overflow-y-auto col-span-1"><SideBar/></section>
          <section className="overflow-y-auto col-span-3">{children}</section>
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
