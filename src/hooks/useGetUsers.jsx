import { getAllUser } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

const useGetUsers = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-users"],
    queryFn: getAllUser,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
};

export default useGetUsers;
