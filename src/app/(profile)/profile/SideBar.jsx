"use client"
import useGetUser from "@/hooks/useAuth";
import useProfileMenu from "@/hooks/useProfileMenu";
import { logoutUser } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";


const SideBar = () => {

  const {data} = useGetUser();
  const {user} = data || {}
  const {showMenu , setShowMenu} = useProfileMenu();
  const pathname = usePathname();

  const logoutHandler = async () => {
    try{
      await logoutUser();
      window.location.href = "/";
    }catch(err){
      toast.error(err?.response?.data?.message);
    }
  }
  return (
    <section className={`transition-all duration-300 fixed top-0 bottom-0 lg:right-0 ${showMenu ? "right-0" : "-right-80"} lg:static lg:col-span-1 col-span-4 row-start-1 w-[250px] lg:w-auto h-screen lg:row-start-auto z-50 pb-20`}>
    <article className="py-4 glassmorphism h-screen overflow-y-auto">
      <div className="px-6 flex items-center justify-between mb-10">
        <div className="flex items-center">
        <Image src="/icon.png" alt="فرانت شاپ" width={40} height={40} className="ml-3"/>
        <h1 className="text--white lg:text-2xl text-lg font-bold">فرانت شاپ</h1>
        </div>
        <button onClick={() => setShowMenu(!showMenu)} className="text--white lg:hidden"><IoClose size={25}/></button>
      </div>
      <ul className="pl-20">
      <Link href="/"><li className="rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 text--white hover:glassmorphism">صفحه اصلی</li></Link>
      <Link href="/profile"><li className={`${pathname === "/profile" ? "glassmorphism" : ""} rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 text--white hover:glassmorphism`}>داشبورد</li></Link>
      <Link href="/profile/me"><li className={`${pathname === "/profile/me" ? "glassmorphism" : ""} rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 text--white hover:glassmorphism`}>اطلاعات کاربری</li></Link>
      <Link href="/profile/payment"><li className={`${pathname === "/profile/payment" ? "glassmorphism" : ""} rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 text--white hover:glassmorphism`}>سفارشات من</li></Link>
      {user?.role === "ADMIN" && <Link href="/admin"><li className={`${pathname === "/admin" ? "glassmorphism" : ""} rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 text--white hover:glassmorphism`}>پنل ادمین</li></Link>}
      <li onClick={logoutHandler} className="cursor-pointer text-error rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 hover:glassmorphism">خروج</li>
      </ul>
    </article>
    </section>
  );
}
 
export default SideBar;