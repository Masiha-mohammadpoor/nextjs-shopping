"use client";
import useMenu from "@/hooks/useMenu";
import ProductsFilter from "./ProductsFilter";
import ProductSort from "./ProductsSort";

const CategorySidebar = ({ categories }) => {

  const {showMenu} = useMenu();

  console.log(showMenu)

  return (
    <article className={`transition-all duration-300 relative lg:static lg:right-0 ${showMenu ? "right-0" : "-right-96"} h-screen p-5 px-8 lg:glassmorphism bg-sky-700 lg:col-span-1 col-span-4 row-start-1 w-[250px] lg:w-auto z-50 overflow-y-scroll lg:overflow-hidden pb-20`}>
      <h1 className="lg:text-primary-900 text--white font-bold text-xl">فیلترها</h1>
      <ProductsFilter categories={categories}/>
      <ProductSort/>
    </article>
  );
};

export default CategorySidebar;
