import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import { getCategories } from "@/services/categoryService";
import queryString from "query-string";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";
import Image from "next/image";
import Price from "@/components/Price";
import AddToCart from "./[slug]/AddToCart";
export const dynamic = "force-dynamic";

const Products = async ({ searchParams }) => {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);
  const productsPromise = getProducts(
    queryString.stringify(searchParams),
    strCookies
  );
  const categorisPromise = getCategories();

  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categorisPromise,
  ]);

  return (
    <section className="grid grid-cols-4">
      <CategorySidebar categories={categories} />
      <article className="w-screen lg:w-[100%] h-screen row-start-1 lg:row-start-auto pt-10 md:pt-14 pb-28 md:pb-20 grid grid-cols-12 col-span-4 lg:col-span-3 gap-5 gap-y-16 md:p-5 overflow-y-scroll">
        {products.map((p) => {
          return (
            <div
              className="max-w-[350px] min-w-[270px] md:min-w-[240px] lg:min-w-[240px] xl:min-w-[280px] flex flex-col items-center col-span-12 sm:col-span-6 md:col-span-4 glassmorphism rounded-xl px-3 max-h-[350px] mx-auto"
              key={p._id}
            >
              <div className="w-full -mt-5 py-3 flex justify-center items-center  rounded-xl bg-white overflow-hidden">
                <Image
                  src={p.imageLink}
                  alt={p.title}
                  width={135}
                  height={135}
                />
              </div>
              <div className="mt-4 w-full text--white text-sm flex justify-start">
                <p>{p.title}</p>
              </div>
              <div className="mt-4 w-full flex justify-between items-center">
                <LikeButton product={p} />
                <div className="badge--primary">
                  {p.brand} / {p.category.title}
                </div>
              </div>
              <div className="mt-6 mb-3 w-full flex justify-between items-center">
                <Link href={`/products/${p.slug}`}>
                  <button className="transition-all duration-300 bg-blue-700 hover:bg-blue-800 text--white rounded-md px-3 py-1.5">
                    مشاهده
                  </button>
                </Link>
                <Price
                  discount={p.discount}
                  price={p.price}
                  offPrice={p.offPrice}
                />
              </div>
              <div className="w-full mb-3">
                <AddToCart product={p} />
              </div>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default Products;
