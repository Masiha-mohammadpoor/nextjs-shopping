import ProductsFilter from "./ProductsFilter";
import ProductSort from "./ProductsSort";

const CategorySidebar = ({ categories }) => {

  return (
    <article className="relative lg:static -right-96 lg:right-0 h-screen p-5 px-8 glassmorphism lg:col-span-1 w-[250px] lg:w-auto z-20">
      <h1 className="text-primary-900 font-bold text-xl">فیلترها</h1>
      <ProductsFilter categories={categories}/>
      <ProductSort/>
    </article>
  );
};

export default CategorySidebar;
