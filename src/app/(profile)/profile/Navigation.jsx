"use client"
import { MoonLoader } from "react-spinners";
import useGetUser from "@/hooks/useAuth";
import { toLoacalDate } from "@/utils/localDate";
import { IoMenu } from "react-icons/io5";
import useProfileMenu from "@/hooks/useProfileMenu";


const Navigation = () => {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};
  const {showMenu , setShowMenu} = useProfileMenu();

  return (
    <nav className="shadow-lg w-full top-0 p-3 text--white glassmorphism flex items-center gap-x-4">
      <div className="block lg:hidden">
        <button onClick={() => setShowMenu(!showMenu)}><IoMenu size={25}/></button>
      </div>
      <div>
        {isLoading ? (
          <MoonLoader color={"white"} loading={isLoading} size={30} />
        ) : (
          <>
            <p className="text--white text-sm">
              سلام {user?.name} خوش اومدی 🥰
            </p>
            <p className="text--white text-sm">
              تاریخ پیوستن : {toLoacalDate(user.createdAt)}
            </p>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
