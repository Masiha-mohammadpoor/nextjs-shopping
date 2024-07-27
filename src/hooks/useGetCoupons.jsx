import { getAllCoupons } from "@/services/couponService";
import { useQuery } from "@tanstack/react-query";


export const useGetCoupons = () => {
  
  const {data , error , isLoading} = useQuery({
    queryKey : ["get-coupons"],
    queryFn : getAllCoupons,
    retry : false,
    refetchOnWindowFocus : true,
  });

  return {data , isLoading}

}
