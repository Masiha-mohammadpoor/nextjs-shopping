import {
  addProduct,
  removeProduct,
  updateProduct,
} from "@/services/productService";
import { useMutation } from "@tanstack/react-query";

export const useAddProduct = () =>
  useMutation({
    mutationFn: addProduct,
  });

export const useUpdateProduct = () =>
  useMutation({
    mutationFn: updateProduct,
  });

export const useRemoveProduct = () =>
  useMutation({
    mutationFn: removeProduct,
  });
