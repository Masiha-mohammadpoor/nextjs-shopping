"use client";
import useMenu from "@/hooks/useMenu";
import ProductsFilter from "./ProductsFilter";
import ProductSort from "./ProductsSort";
import { IoClose } from "react-icons/io5";

const CategorySidebar = ({ categories }) => {
  const { showMenu, setShowMenu } = useMenu();

  return (
    <article
      className={`transition-all duration-300 relative lg:static lg:right-0 ${
        showMenu ? "right-0" : "-right-96"
      } h-screen p-5 px-8 lg:glassmorphism bg-sky-700 lg:col-span-1 col-span-4 row-start-1 w-[250px] lg:w-auto z-50 overflow-y-scroll lg:overflow-auto pb-20`}
    >
      <h1 className="flex justify-between items-center lg:text-primary-900 text--white font-bold text-xl ">
        <span>فیلتر‌ها</span>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="lg:hidden inline-block text--white"
        >
          <IoClose size={25} />
        </button>
      </h1>
      <ProductsFilter categories={categories} />
      <ProductSort />
    </article>
  );
};

export default CategorySidebar;
