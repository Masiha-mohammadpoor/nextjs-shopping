import { getAllCoupons, getOneCoupon } from "@/services/couponService";
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


export const useGetOneCoupon = (id) => {
  
  const {data , error , isLoading} = useQuery({
    queryKey : ["get-coupon" , id],
    queryFn : () => getOneCoupon(id),
    retry : false,
    refetchOnWindowFocus : true,
  });

  return {data , isLoading}

}
