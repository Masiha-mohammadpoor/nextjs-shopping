"use client";
import useGetUser from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
import { addToCart } from "@/services/cartService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddToCart = ({ product }) => {

  const queryClient = useQueryClient()
  const router = useRouter();
  const { data } = useGetUser();
  const { isPending, mutateAsync } = useAddToCart();
  const { user , cart} = data || {};
  console.log(cart)

  const addToCartHandler = async () => {
    if (!user) {
      toast.error("لطفا ابتدا وارد شوید");
      router.push("/auth");
    } else {
      try {
        const { message } = await mutateAsync(product._id);
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
        toast.success(message);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    }
  };

  const isInCart = (user , product) => {
    if(!user) return false;
    return user?.cart?.products.some((p) => p.productId === product._id)
  }

  console.log(isInCart(user , product))

  return (
    <div>
      {!isInCart(user , product) ? <button onClick={addToCartHandler}>افزودن به سبد خرید</button> : <Link href="/cart">ادامه سفارش</Link>}
    </div>
  );
};

export default AddToCart;
