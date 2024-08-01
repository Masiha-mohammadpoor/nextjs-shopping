"use client";
import useGetUser from "@/hooks/useAuth";
import { IoMenu } from "react-icons/io5";
import useProfileMenu from "@/hooks/useProfileMenu";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Loading from "@/components/Loading";

const Navigation = () => {
  const { data, isLoading } = useGetUser();
  const { cart } = data || {};
  const { showMenu, setShowMenu } = useProfileMenu();

  return (
    <nav className="shadow-lg w-full p-3 py-4 sm:px-20 text--white glassmorphism flex items-center justify-between sticky top-0 z-50">
      <div>
        <div className="block lg:hidden">
          <button onClick={() => setShowMenu(!showMenu)}>
            <IoMenu size={25} />
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loading size={10} />
      ) : (
        <div className="flex items-center gap-x-2 sm:gap-x-8 p-0 z-50">
          <Link href="/cart">
            <button className="w-10 h-7 pt-1 relative flex justify-center">
              <MdOutlineShoppingCart size={23} />
              <span className="absolute badge--error -top-1.5 -right-1.5">
                {toPersianDigits(cart?.productDetail?.length)}
              </span>
            </button>
          </Link>
          <Link href="/profile">
            <button className="w-10 h-7 pt-1 flex justify-center items-center">
              <FiUser size={25} />
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
