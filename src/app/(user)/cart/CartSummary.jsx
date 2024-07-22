"use client";
import { createPayment } from "@/services/paymentService";
import { toPersianNumberWithCommas } from "@/utils/putCommaInNumber";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const CartSummary = ({ payDetail }) => {

  const router = useRouter();
  const {mutateAsync} = useMutation({
    mutationFn : createPayment
  })
  const queryClient = useQueryClient();
  const { totalGrossPrice, totalOffAmount, totalPrice } = payDetail;

  const paymentHandler = async () => {
    try {
      const { message } = await mutateAsync();
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }

  return (
    <div className="lg:col-span-1 font-bold col-span-3 py-4 glassmorphism rounded-md text--white p-3 flex flex-col gap-y-5">
      <h1 className="font-bold text-lg">اطلاعات پرداخت</h1>
      <div className="w-full flex justify-between items-center gap-x-3">
        <input type="text" className="w-3/4 glassmorphism p-2 rounded-md outline-none font-normal text-center"/>
        <button className="w-1/4 p-2 rounded-md transition-all duration-300 bg-blue-600 hover:bg-blue-700">اعمال</button>
      </div>
      <div className="w-full flex justify-between items-center">
        <span>جمع کل</span>
        <span>{toPersianNumberWithCommas(totalGrossPrice)}</span>
      </div>
      <div className="w-full flex justify-between items-center">
        <span>تخفیف</span>
        <span className="text-error">{toPersianNumberWithCommas(totalOffAmount)}-</span>
      </div>
      <div className="w-full flex justify-between items-center border-t pt-3 border-t-white">
        <span>مبلغ قابل پرداخت</span>
        <span>{toPersianNumberWithCommas(totalPrice)}</span>
      </div>
      <button className="transition-all duration-300 glassmorphism w-full rounded-md p-2 hover:bg-blue-700" onClick={paymentHandler}>پرداخت</button>
    </div>
  );
};

export default CartSummary;
