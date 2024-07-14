import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import { getCategories } from "@/services/categoryService";

const Products = async () => {
  const {products} = await getProducts();
  const {categories} = await getCategories();
  return (
    <section className="grid grid-cols-4">
      <CategorySidebar categories={categories}/>
      <article className="col-span-3 bg-red-400">products</article>
    </section>
  );
}
 
export default Products;