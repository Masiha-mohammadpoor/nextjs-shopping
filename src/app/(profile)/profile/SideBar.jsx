import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  return (
    <article className="glassmorphism h-full py-4">
      <div className="px-6 flex items-center mb-10">
        <Image src="/icon.png" alt="فرانت شاپ" width={40} height={40} className="ml-3"/>
        <h1 className="text--white text-2xl font-bold">فرانت شاپ</h1>
      </div>
      <ul className="pl-20">
        <Link href="/profile"><li className="rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 text--white hover:glassmorphism">صفحه اصلی</li></Link>
        <Link href="/profile/me"><li className="rounded-l-full py-2 mb-3 pr-5 w-full transition-all duration-300 text--white hover:glassmorphism">اطلاعات کاربری</li></Link>
      </ul>
    </article>
  );
}
 
export default SideBar;