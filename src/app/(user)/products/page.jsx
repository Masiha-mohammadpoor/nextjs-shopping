import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import { getCategories } from "@/services/categoryService";
import queryString from "query-string";

export const dynamic = "force-dynamic";

const Products = async ({searchParams}) => {
  
  const productsPromise = getProducts(queryString.stringify(searchParams));
  const categorisPromise = getCategories();

  const [{products} , {categories}] = await Promise.all([productsPromise , categorisPromise]);

  return (
    <section className="grid grid-cols-4">
      <CategorySidebar categories={categories}/>
      <article className="grid col-span-3 grid-cols-12 gap-3">
        {products.map(p => {
          return <div className="col-span-4 bg-white" key={p._id}>{p.title}</div>
        })}
      </article>
    </section>
  );
}
 
export default Products;