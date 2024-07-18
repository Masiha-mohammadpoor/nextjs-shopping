"use client";

import { likeProduct } from "@/services/productService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter , usePathname} from "next/navigation";

const LikeButton = ({ product }) => {

  const { mutateAsync } = useMutation({ mutationFn: likeProduct });
  const router = useRouter();
  const pathname = usePathname();


  const likeHandler = async () => {
    try {
      const { message } = await mutateAsync(product._id);
      router.refresh()
      toast.success(message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <div>
      <button onClick={likeHandler}>{product.isLiked ? "لایک شده" : "لایک کنید"}</button>
    </div>
  );
};

export default LikeButton;
