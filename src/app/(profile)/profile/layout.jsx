import "../../globals.css";
import vazirFont from "@/constants/localFonts";
import { Toaster } from "react-hot-toast";
import Providers from "../../providers";
import SideBar from "./SideBar";
import Navigation from "./Navigation";
export const metadata = {
  title: "Next Shop Panel",
  description: "Next.js Course Fronthooks Course",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans overflow-hidden`}>
        <Providers>
          <main className="grid grid-cols-4 mb-0 overflow-hidden relative bottom-0">
            <SideBar />
            <section className="w-screen lg:w-full h-screen row-start-1 lg:row-start-auto col-span-4 lg:col-span-3 z-10 overflow-hidden">
              <Navigation />
              <div className="w-full pb-20 h-screen overflow-y-scroll md:px-10 px-5 py-7 sticky bottom-0 pt-24">
                {children}
              </div>
            </section>
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
