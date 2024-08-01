import { getProducts, getSingleProduct } from "@/services/productService";
import AddToCart from "./AddToCart";
import Image from "next/image";
import { TbClockStar } from "react-icons/tb";
import LikeButton from "./LikeButton";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Rating from "./Rating";
import Price from "@/components/Price";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  const { products } = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

const ProductPage = async ({ params }) => {
  const { slug } = params;
  const { product } = await getSingleProduct(slug);

  const {
    title,
    imageLink,
    brand,
    category,
    likes,
    rating,
    price,
    discount,
    offPrice,
  } = product || {};

  return (
    <section className="h-screen md:h-auto grid grid-cols-3 w-screen sm:px-20 px-5 pt-10 justify-between overflow-y-scroll">
      <article className="flex flex-col md:flex-row gap-x-10 gap-y-4 col-span-3 md:col-span-2">
        <div className="p-10 bg-white rounded-md flex justify-center items-center">
          <Image src={imageLink} alt={title} width={250} height={250} />
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-y-3">
            <p className="text--white text-xl">{title}</p>
            <div className="w-fit badge--primary">
              {brand} / {category.title}
            </div>
            <p className="flex items-center text-warning">
              <TbClockStar /> به همراه ضمانت
            </p>
            <div className="flex items-end gap-x-2 w-fit h-6 p-0 mt-5">
              <span className="text-error text-2xl">
                {toPersianDigits(likes?.length)}
              </span>
              <LikeButton product={product} />
            </div>
            <div>
              <Rating rating={rating} />
            </div>
          </div>
        </div>
      </article>
      <article className="pb-20 md:pb-0 col-span-3 md:col-span-1 flex flex-col gap-y-5 justify-end items-end">
        <div>
          <Price price={price} discount={discount} offPrice={offPrice} />
        </div>
        <div className="w-full">
          <AddToCart product={product} />
        </div>
      </article>
    </section>
  );
};

export default ProductPage;