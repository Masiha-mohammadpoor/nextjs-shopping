import { addCoupon, updateCoupon } from "@/services/couponService";
import { useMutation } from "@tanstack/react-query";

export const useAddCoupon = () =>
  useMutation({
    mutationFn: addCoupon,
  });

export const useUpdateCoupon = () =>
  useMutation({
    mutationFn: updateCoupon,
  });
