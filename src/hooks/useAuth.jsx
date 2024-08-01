import { getUserProfile } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
};

export default useGetUser;
