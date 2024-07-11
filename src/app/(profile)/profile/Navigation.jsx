"use client"
import { MoonLoader } from "react-spinners";
import useGetUser from "@/hooks/useAuth";
import { toLoacalDate } from "@/utils/localDate";

const Navigation = () => {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  return (
    <nav className="w-full top-0 p-3 text--white glassmorphism">
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
      <div></div>
    </nav>
  );
};

export default Navigation;
