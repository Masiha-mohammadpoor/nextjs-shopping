import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import { getCategories } from "@/services/categoryService";
import queryString from "query-string";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";
import Image from "next/image";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";
export const dynamic = "force-dynamic";

const Products = async ({searchParams}) => {


  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore)
  const productsPromise = getProducts(queryString.stringify(searchParams) , strCookies);
  const categorisPromise = getCategories();

  const [{products} , {categories}] = await Promise.all([productsPromise , categorisPromise]);

  return (
    <section className="grid grid-cols-4">
      <CategorySidebar categories={categories}/>
      <article className="pt-10 pb-20 h-screen grid col-span-3 grid-cols-12 gap-5 gap-y-16 p-5 container overflow-y-scroll">
        {products.map(p => {
          return <div className="flex flex-col items-center col-span-4 glassmorphism rounded-xl px-3" key={p._id}>
            <div className="w-full -mt-5 py-3 flex justify-center items-center  rounded-xl bg-white overflow-hidden">
              <Image src={p.imageLink} alt={p.title} width={150} height={150}/>
            </div>
            <div className="mt-4 w-full text--white flex justify-start">
              <p>{p.title}</p>
            </div>
            <div className="mt-4 w-full flex justify-between items-center">
              <LikeButton product={p}/>
              <div className="badge--primary">{p.brand} / {p.category.title}</div>
            </div>
            <div className="my-6 w-full flex justify-between items-center">
              <Link href={`/products/${p.slug}`}><button className="transition-all duration-300 bg-blue-700 hover:bg-blue-800 text--white rounded-md px-3 py-1.5">مشاهده محصول</button></Link>
              <div>
                <div>{p.discount !== 0 && <div className="flex items-center justify-between">
                    <p className="line-through text--white text-xs">{toPersianNumberWithCommas(p.price)}</p>
                    <span className="inline-block badge--error">{toPersianDigits(p.discount)}%</span>
                  </div>}</div>
                <p className="text--white flex items-end gap-x-0.5 text-sm font-bold">{toPersianNumberWithCommas(p.offPrice)}
                  <span className="text-xs font-bold">تومان</span>
                </p>
              </div>
            </div>
          </div>
        })}
      </article>
    </section>
  );
}
 
export default Products;