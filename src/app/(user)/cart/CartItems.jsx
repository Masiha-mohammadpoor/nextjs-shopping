"use client";
import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const CartItems = ({ cart }) => {

  const { mutateAsync: increment } = useAddToCart();
  const { mutateAsync: decrement } = useDecrementFromCart();
  const queryClient = useQueryClient();

  const incrementHandler = async (id) => {
    try {
      const { message } = await increment(id);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const decrementHandler = async (id) => {
    try {
      const { message } = await decrement(id);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="col-span-2 bg-red-400">
      {cart?.productDetail.map((p) => {
        return (
          <div
            className="w-full bg-blue-400 mb-2 flex justify-between items-center"
            key={p._id}
          >
            <div>
              <p>{p.title}</p>
              <p>{toPersianNumberWithCommas(p.price)}</p>
              <p>{p.quantity} تعداد</p>
            </div>
            <div>
              <button onClick={() => incrementHandler(p._id)}>
                <FaPlus />
              </button>
              <button onClick={() => decrementHandler(p._id)}>
                <FaMinus />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
