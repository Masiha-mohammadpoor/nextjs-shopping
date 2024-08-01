"use client";

import { likeProduct } from "@/services/productService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useGetUser from "@/hooks/useAuth";

const LikeButton = ({ product }) => {
  const { data } = useGetUser();
  const { user } = data || {};
  const { mutateAsync } = useMutation({ mutationFn: likeProduct });
  const router = useRouter();

  const likeHandler = async () => {
    try {
      const { message } = await mutateAsync(product._id);
      router.refresh();
      toast.success(message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <div className="m-0 p-0">
      <button onClick={likeHandler}>
        {user && product.likes.includes(user._id) ? (
          <FaHeart className="text-xl text-error m-0 p-0" />
        ) : (
          <FaRegHeart className="text-xl text-error m-0 p-0" />
        )}
      </button>
    </div>
  );
};

export default LikeButton;
