import "./globals.css";
import vazirFont from "@/constants/localFonts";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";
export const metadata = {
  title: "Next Shop Panel",
  description: "Next.js Course Fronthooks Course",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <Header />
        <Providers>
          <main>{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
