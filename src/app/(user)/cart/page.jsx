"use client";
import useGetUser from "@/hooks/useAuth";
import Link from "next/link";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import Loading from "@/components/Loading";

const Cart = () => {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  const renderCartPage = () => {
    if (isLoading && !data) {
      return (
        <div className="col-span-3 flex items-center justify-center pt-7">
          <Loading size={15} />
        </div>
      );
    }
    if (!user || !data) {
      return (
        <div className="col-span-3 flex flex-col items-center justify-center">
          <p className="text--white font-bold text-lg mb-4">
            لطفا ابتدا وارد شوید
          </p>
          <Link href="/auth" className="text-sky-500">
            رفتن به صفحه لاگین ؟
          </Link>
        </div>
      );
    }
    if (user?.cart?.products.length === 0) {
      return (
        <div className="col-span-3 flex flex-col items-center justify-center">
          <p className="text--white font-bold text-lg mb-4">
            چیزی در سبد خرید نیست
          </p>
          <Link href="/products" className="text-sky-500">
            رفتن به صفحه محصولات ؟
          </Link>
        </div>
      );
    }
    return (
      <>
        <CartItems cart={cart} />
        <CartSummary payDetail={cart?.payDetail} />
      </>
    );
  };

  return (
    <section className="h-screen overflow-y-auto pb-20">
      <h1 className="sm:px-20 px-5 font-bold text-2xl text-white pt-10">
        سبد خرید
      </h1>
      <article className="sm:px-20 px-5 pt-5 grid grid-cols-3 gap-5 w-auto">
        {renderCartPage()}
      </article>
    </section>
  );
};

export default Cart;
