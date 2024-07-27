import {
  addCouponToCart,
  addToCart,
  decrementFromCart,
} from "@/services/cartService";
import { useMutation } from "@tanstack/react-query";

export const useAddToCart = () =>
  useMutation({
    mutationFn: addToCart,
  });

export const useDecrementFromCart = () =>
  useMutation({
    mutationFn: decrementFromCart,
  });

export const useAddCouponToCart = () =>
  useMutation({
    mutationFn: addCouponToCart,
  });
