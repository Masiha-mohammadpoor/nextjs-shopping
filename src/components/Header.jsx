"use client";
import useGetUser from "@/hooks/useAuth";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import useMenu from "@/hooks/useMenu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { usePathname } from "next/navigation";



const Header = () => {

  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};
  const {showMenu,setShowMenu} = useMenu();
  const pathname = usePathname();

  return (
      <header className="flex shadow-lg justify-between py-4 px-2 sm:p-4 sm:px-20 glassmorphism text--white">
        <ul className="flex items-center justify-between gap-x-3 sm:gap-x-7">
          {pathname === "/products" && <li className="flex lg:hidden items-center">
            <button onClick={() => setShowMenu(!showMenu)}><IoMenu size={25}/></button>
          </li>}
          <li>
            <Link href="/">خانه</Link>
          </li>
          <li>
            <Link href="/products">محصولات</Link>
          </li>
        </ul>
        {!user && !isLoading ? (
          <div className="flex items-center justify-between w-24">
            <button>
              <Link href="/auth">ورود / ثبت نام</Link>
            </button>
          </div>
        ) : user ? (
          <div className="flex items-center gap-x-2 sm:gap-x-8 p-0 z-50">
            <Link href="/cart"><button className="w-10 h-7 pt-1 relative flex justify-center"><MdOutlineShoppingCart size={23}/><span className="absolute badge--error -top-1.5 -right-1.5">{toPersianDigits(cart?.productDetail?.length)}</span></button></Link>
            <Link href="/profile"><button className="w-10 h-7 pt-1 flex justify-center items-center"><FiUser size={25} /></button></Link>
          </div>
        ) : (
          <div></div>
        )}
      </header>
  );
};

export default Header;
