import { addCategory } from "@/services/categoryService";
import { useMutation } from "@tanstack/react-query";

export const useAddCategory = () =>
  useMutation({
    mutationFn: addCategory,
  });

