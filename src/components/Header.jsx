"use client"
import useGetUser from "@/hooks/useAuth";
import Link from "next/link";

const Header = () => {

  const {data , isLoading} = useGetUser();

  const {user , cart} = data || {};


  return (
    <section>
      <header className="flex justify-between p-4 px-20 glassmorphism text--white">
        <ul className="flex items-center justify-between w-32">
          <li><Link href="/">خانه</Link></li>
          <li><Link href="#">محصولات</Link></li>
        </ul>
        {!user && !isLoading ? <div className="flex items-center justify-between w-24">
          <button><Link href="/auth">ورود / ثبت نام</Link></button>
        </div> : user ? <div>{user.name}</div> : <div></div>}
      </header>
    </section>
  );
};

export default Header;
