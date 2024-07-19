import ProductsFilter from "./ProductsFilter";
import ProductSort from "./ProductsSort";

const CategorySidebar = ({ categories }) => {

  return (
    <article className="h-screen p-5 px-8 glassmorphism col-span-1">
      <h1 className="text-primary-900 font-bold text-xl">فیلتر و مرتب‌سازی</h1>
      <ProductsFilter categories={categories}/>
      <ProductSort/>
    </article>
  );
};

export default CategorySidebar;
