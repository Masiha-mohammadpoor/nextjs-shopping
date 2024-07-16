import { getProducts, getSingleProduct } from "@/services/productService";

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
    </section>
  );
}

 
export default ProductPage;