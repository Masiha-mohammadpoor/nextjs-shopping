"use client"
import { logoutUser } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const SideBar = () => {

  const logoutHandler = async () => {
    try{
      await logoutUser();
      window.location.href = "/";
    }catch(err){
      toast.error(err?.response?.data?.message);
    }
  }
  return (
    <section className="transition-all duration-300 relative lg:right-0 -right-80 lg:static lg:col-span-1 col-span-4 row-start-1 w-[250px] lg:w-auto h-screen lg:row-start-auto z-50 pb-20">
    <article className="py-4 glassmorphism h-screen">
      <div className="px-6 flex items-center mb-10">
        <Image src="/icon.png" alt="فرانت شاپ" width={40} height={40} className="ml-3"/>
        <h1 className="text--white text-2xl font-bold">فرانت شاپ</h1>
      </div>
      <ul className="pl-20">
      <Link href="/"><li className="rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 text--white hover:glassmorphism">صفحه اصلی</li></Link>
      <Link href="/profile"><li className="rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 text--white hover:glassmorphism">داشبورد</li></Link>
      <Link href="/profile/me"><li className="rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 text--white hover:glassmorphism">اطلاعات کاربری</li></Link>
      <Link href="/profile/payment"><li className="rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 text--white hover:glassmorphism">سفارشات من</li></Link>
      <li onClick={logoutHandler} className="cursor-pointer text-error rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 hover:glassmorphism">خروج</li>
      </ul>
    </article>
    </section>
  );
}
 
export default SideBar;