import { getProducts, getSingleProduct } from "@/services/productService";
import AddToCart from "./AddToCart";

export const dynamic = "force-static";
export const dynamicParams = true;


export async function generateStaticParams() {
  const {products} = await getProducts();
 
  return products.map((product) => ({
    slug: product.slug,
  }))
}

const ProductPage = async ({params}) => {  
  const {slug} = params;
  const {product} = await getSingleProduct(slug);

  return (
    <section>
      <p className="text--white">{product?.title}</p>
      <AddToCart product={product}/>
    </section>
  );
}

 
export default ProductPage;