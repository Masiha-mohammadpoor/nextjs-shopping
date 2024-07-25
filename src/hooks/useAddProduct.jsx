import { addProduct } from "@/services/productService";
import { useMutation } from "@tanstack/react-query";

export const useAddProduct = () =>
  useMutation({
    mutationFn: addProduct,
  });

