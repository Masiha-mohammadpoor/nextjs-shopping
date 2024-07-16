"use client";
import useGetUser from "@/hooks/useAuth";
import { addToCart } from "@/services/cartService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddToCart = ({product}) => {

  const router = useRouter();
  const {data} = useGetUser();
  const {isPending , mutateAsync} = useMutation({
    mutationFn : addToCart
  })
  const {user , cart} = data || {};
  console.log(cart)

  const addToCartHandler = async () => {
    if(!user){
      toast.error("لطفا ابتدا وارد شوید");
      router.push("/auth")
    }else {
      try{
        const {message} = await mutateAsync(product._id);
        toast.success(message);
      }catch(err){
        toast.error(err?.response?.data?.message);
      }
    }
  }

  return (
    <div>
      <button onClick={addToCartHandler}>افزودن به سبد خرید</button>
    </div>
  );

}
 
export default AddToCart;