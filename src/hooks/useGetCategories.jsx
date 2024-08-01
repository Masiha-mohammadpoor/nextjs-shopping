import { getCategories, getCategoryById } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

const useGetCategories = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategories,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
};

export const useGetCategoryById = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-category", id],
    queryFn: () => getCategoryById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
};

export default useGetCategories;
