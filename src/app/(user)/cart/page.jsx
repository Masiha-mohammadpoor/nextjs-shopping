"use client";
import useGetUser from "@/hooks/useAuth";
import Link from "next/link";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

const Cart = () => {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  const renderCartPage = () => {
    if(isLoading && !data) {
      return <p>loading ...</p>
    }
    if(!user || !data) {
      return <div>
        <p>لطفا ابتدا وارد شوید</p>
        <Link href="/auth">رفتن به صفحه لاگین ؟</Link>
      </div>
    }
    if(user?.cart?.products.length === 0) {
      return <div>
        <p>چیزی در سبد خرید نیست</p>
        <Link href="/products">رفتن به صفحه محصولات</Link>
      </div>
    }
    return (
      <>
      <CartItems cart={cart}/>
      <CartSummary payDetail={cart?.payDetail}/>
      </>
    );
  };

  return (
    <section className="h-screen overflow-y-auto pb-20">
      <h1 className="sm:px-20 px-5 font-bold text-2xl text-white pt-10">سبد خرید</h1>
      <article className="sm:px-20 px-5 pt-5 grid grid-cols-3 gap-5">
      {renderCartPage()}
      </article>
    </section>
  );
};

export default Cart;
