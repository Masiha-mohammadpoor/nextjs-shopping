"use client";
import Price from "@/components/Price";
import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { TbClockStar } from "react-icons/tb";
import { FaTrashAlt } from "react-icons/fa";


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
    <div className="lg:col-span-2 col-span-3">
      {cart?.productDetail.map((p) => {
        console.log(p)
        return (
          <div
            className="w-full text--white glassmorphism rounded-md mb-2 sm:p-3 p-1.5 md:pl-4 flex flex-col md:flex-row  justify-between items-center gap-y-4"
            key={p._id}
          >
            <div className="w-full h-full flex gap-6">
              <div className="bg-white w-fit rounded-md p-2">
                <Image src={p.imageLink} alt={p.title} width={70} height={70}/>
              </div>
              <div className="w-full flex flex-col justify-between items-start">
              <p className="text-sm">{p.title}</p>
              <p className="flex text-sm items-center gap-2 text-warning"><TbClockStar size={14} className="text-warning"/> به همراه ضمانت</p>
              </div>
            </div>
            <div className="w-full md:w-auto flex md:flex-col items-center justify-between md:gap-y-6 px-3 pb-2 md:p-0">
              <Price price={p.price} discount={p.discount} offPrice={p.offPrice}/>
              <div className="flex items-center gap-x-4">
                <button onClick={() => incrementHandler(p._id)} className="glassmorphism rounded-md p-1"><FaPlus/></button>
                <span>{toPersianDigits(p.quantity)}</span>
                <button onClick={() => decrementHandler(p._id)} className="glassmorphism rounded-md p-1">{p.quantity>1 ? <FaMinus/>:<FaTrashAlt className="text-error"/>}</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
