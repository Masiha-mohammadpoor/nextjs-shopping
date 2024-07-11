"use client"
import ClipLoader from "react-spinners/ClipLoader";
import useGetUser from "@/hooks/useAuth";
import { toLoacalDate } from "@/utils/localDate";

const Profile = () => {

  const { data, isLoading } = useGetUser();

  const { user, cart } = data || {};
  console.log(user)

  return (
    <article>
      <nav className="w-full top-0 p-3 text--white glassmorphism">
        <div>
          {isLoading ? <ClipLoader
        color={"white"}
        loading={isLoading}
        size={30}
      /> : <>
        <p className="text--white text-sm">سلام {user?.name} خوش اومدی 🥰</p>
        <p className="text--white text-sm">تاریخ پیوستن : {toLoacalDate(user.createdAt)}</p>
        </>}
        </div>
        <div></div>
      </nav>
      <div className="p-3">
      </div>
    </article>
  );
}
 
export default Profile;