import { getProductById, getProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

const useGetProducts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
};

export const useGetProductById = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-product", id],
    queryFn: () => getProductById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
};

export default useGetProducts;
