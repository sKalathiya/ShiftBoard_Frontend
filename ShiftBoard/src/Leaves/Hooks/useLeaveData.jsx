import { fetch } from "../../Utils/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

//All Departments
const fetchAllLeaves = () => {
  return fetch({ url: "/api/v1/leaves/admin" });
};
export const useAllLeavesData = () => {
  return useQuery({
    queryKey: ["Leaves"],
    queryFn: fetchAllLeaves,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};
