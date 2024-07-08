import Link from "next/link";

const Header = () => {
  return (
    <section>
      <header className="flex justify-between p-4 px-20 glassmorphism text--white">
        <ul className="flex items-center justify-between w-32">
          <li><Link href="/">خانه</Link></li>
          <li><Link href="#">محصولات</Link></li>
        </ul>
        <div className="flex items-center justify-between w-24">
          <button><Link href="/auth">ورود</Link></button>
          <span> / </span>
          <button><Link href="/signup">ثبت نام</Link></button>
        </div>
      </header>
    </section>
  );
};

export default Header;
