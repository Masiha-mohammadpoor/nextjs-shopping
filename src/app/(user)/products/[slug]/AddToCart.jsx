"use client";
import useGetUser from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddToCart = ({ product }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useGetUser();
  const { isPending, mutateAsync } = useAddToCart();
  const { user, cart } = data || {};

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

  const isInCart = (user, product) => {
    if (!user) return false;
    return user?.cart?.products.some((p) => p.productId === product._id);
  };

  return (
    <div>
      {!isInCart(user, product) ? (
        <button
          onClick={addToCartHandler}
          className="w-full rounded-md glassmorphism p-2 text--white transition-all duration-300 hover:bg-blue-700"
        >
          افزودن به سبد خرید
        </button>
      ) : (
        <Link href="/cart">
          <button className="w-full rounded-md p-2 text--white border-2 border-white transition-all duration-300 hover:bg-white hover:text-blue-700">
            ادامه سفارش
          </button>
        </Link>
      )}
    </div>
  );
};

export default AddToCart;
