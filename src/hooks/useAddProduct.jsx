import { addProduct, updateProduct } from "@/services/productService";
import { useMutation } from "@tanstack/react-query";

export const useAddProduct = () =>
  useMutation({
    mutationFn: addProduct,
  });

export const useUpdateProduct = () =>
  useMutation({
    mutationFn: updateProduct,
  });
