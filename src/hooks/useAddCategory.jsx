import { addCategory, updateCategory } from "@/services/categoryService";
import { useMutation } from "@tanstack/react-query";

export const useAddCategory = () =>
  useMutation({
    mutationFn: addCategory,
  });

export const useUpdateCategory = () =>
  useMutation({
    mutationFn: updateCategory,
  });
