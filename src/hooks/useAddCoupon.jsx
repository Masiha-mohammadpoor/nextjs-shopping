import { addCoupon } from "@/services/couponService";
import { useMutation } from "@tanstack/react-query";

export const useAddCoupon = () =>
  useMutation({
    mutationFn: addCoupon,
  });
