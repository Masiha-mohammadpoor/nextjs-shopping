"use client";
import AddToCart from "./AddToCart";
import Image from "next/image";
import { TbClockStar } from "react-icons/tb";
import LikeButton from "./LikeButton";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Rating from "./Rating";
import Price from "@/components/Price";
import { useParams } from "next/navigation";
import { useGetProductBySlug } from "@/hooks/useGetProducts";
import Loading from "@/components/Loading";

const ProductPage = () => {
  const params = useParams();
  const { data } = useGetProductBySlug(params.slug);
  const { product } = data || {};


  if (product) return (
      <section className="h-screen md:h-auto grid grid-cols-3 w-screen sm:px-20 px-5 pt-10 justify-between overflow-y-scroll pb-20 md:pb-0">
        <article className="flex flex-col md:flex-row gap-x-10 gap-y-4 col-span-3 md:col-span-2">
          <div className="p-10 bg-white rounded-md flex justify-center items-center">
            <Image
              src={product?.imageLink}
              alt={product?.title}
              width={250}
              height={250}
            />
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-3">
              <p className="text--white text-xl">{product?.title}</p>
              <div className="w-fit badge--primary">
                {product?.brand} / {product?.category?.title}
              </div>
              <p className="flex items-center text-warning">
                <TbClockStar /> به همراه ضمانت
              </p>
              <div className="flex items-end gap-x-2 w-fit h-6 p-0 mt-5">
                <span className="text-error text-2xl">
                  {toPersianDigits(product?.likes?.length)}
                </span>
                <LikeButton product={product} />
              </div>
              <div>
                <Rating rating={product?.rating} />
              </div>
            </div>
          </div>
        </article>
        <article className="pb-20 md:pb-0 col-span-3 md:col-span-1 flex flex-col gap-y-5 justify-end items-end">
          <div>
            <Price
              price={product?.price}
              discount={product?.discount}
              offPrice={product?.offPrice}
            />
          </div>
          <div className="w-full">
            <AddToCart product={product} />
          </div>
        </article>
      </section>
    );
    else
    return (
      <div className="flex justify-center mt-16">
        <Loading size={15} />
      </div>
    );

};

export default ProductPage;
