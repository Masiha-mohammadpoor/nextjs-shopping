"use client";
import useGetUser from "@/hooks/useAuth";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { TiArrowSortedDown } from "react-icons/ti";
import useComponentVisible from "@/hooks/useComponentVisible";
import { IoMenu } from "react-icons/io5";
import useMenu from "@/hooks/useMenu";

const Header = () => {

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};
  const {showMenu,setShowMenu} = useMenu();

  return (
      <header className="flex z-40 justify-between p-4 px-20 glassmorphism text--white">
        <ul className="flex items-center justify-between w-32">
          <li>
            <button onClick={() => setShowMenu(!showMenu)}><IoMenu/></button>
          </li>
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
            <button ref={ref} onClick={() => setIsComponentVisible(!isComponentVisible)} className="relative flex rounded-md items-center">
              <span>
                <TiArrowSortedDown className="text--white" size={15} />
              </span>
              <span>
                <FiUser className="text--white" size={25} />
              </span>
            <div  ref={ref} className={`${isComponentVisible ? "flex" : "hidden"} flex-col items-center rounded-lg overflow-hidden z-40 absolute top-8 left-8 glassmorphism w-56 p-3`}>
              <div className="w-full flex justify-start mb-3">
                <div className="ml-3 text--white bg-blue-600 rounded-full w-14 h-14 flex justify-center items-center text-2xl">{user?.name?.charAt(0)}</div>
                <div className="flex flex-col items-start justify-between py-1">
                  <p className="text-base">{user?.name}</p>
                  <p className="text-sm">{toPersianDigits(user?.phoneNumber)}</p>
                </div>
              </div>
              <div className="w-full mx-2 h-[1px] bg-slate-200 mb-3"></div>
              <ul className=" w-full flex flex-col items-start gap-y-2">
              <Link href="/profile" className="w-full flex justify-start transition-all duration-500 rounded-full hover:glassmorphism p-2 px-3"><li>حساب کاربری</li></Link>
              <Link href="/profile/payment" className="w-full flex justify-start transition-all duration-500 rounded-full hover:glassmorphism p-2 px-3"><li>سفارش های من</li></Link>
              </ul>
            </div>
          </button>
        ) : (
          <div></div>
        )}
      </header>
  );
};

export default Header;
