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
    <div className="col-span-1 bg-red-900">
      <h1>اطلاعات پرداخت</h1>
      <div className="w-full flex justify-between items-center">
        <span>جمع کل</span>
        <span>{toPersianNumberWithCommas(totalGrossPrice)}</span>
      </div>
      <div className="w-full flex justify-between items-center">
        <span>تخفیف</span>
        <span>{toPersianNumberWithCommas(totalOffAmount)}</span>
      </div>
      <div className="w-full flex justify-between items-center">
        <span>مبلغ قابل پرداخت</span>
        <span>{toPersianNumberWithCommas(totalPrice)}</span>
      </div>
      <div onClick={paymentHandler}>پرداخت</div>
    </div>
  );
};

export default CartSummary;
