import "./globals.css";
import vazirFont from "@/constants/localFonts";
import Header from "../components/Header";

export const metadata = {
  title: "Next Shop Panel",
  description: "Next.js Course Fronthooks Course",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
