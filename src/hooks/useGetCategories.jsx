import { getCategories } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

const useGetCategories = () => {
  
  const {data , error , isLoading} = useQuery({
    queryKey : ["get-categories"],
    queryFn : getCategories,
    retry : false,
    refetchOnWindowFocus : true,
  });

  return {data , isLoading}

}
 
export default useGetCategories;