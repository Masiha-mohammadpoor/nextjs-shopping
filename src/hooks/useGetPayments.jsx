import { getAllPayments } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";

export const useGetPayments = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-payments"],
    queryFn: getAllPayments,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
};
