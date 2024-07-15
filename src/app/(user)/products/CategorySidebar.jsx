import ProductsFilter from "./ProductsFilter";
import ProductSort from "./ProductsSort";

const CategorySidebar = ({ categories }) => {

  return (
    <article className="col-span-1">
      <ProductsFilter categories={categories}/>
      <ProductSort/>
    </article>
  );
};

export default CategorySidebar;
