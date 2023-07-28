import { fetch } from "../../Utils/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

//All Leaves
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

// change the state of Leave
const updateLeaveState = ({ leaveId, state }) => {
  return fetch({
    url: `api/v1/leaves/admin/status/` + leaveId + "?state=" + state,
    method: "PUT",
  });
};

export const useUpdateLeaveStatus = (employeeId) => {
  const queryClient = useQueryClient();
  return useMutation(updateLeaveState, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Employee", "" + employeeId, "Leave"]);
      queryClient.invalidateQueries(["Leaves"]);
    },
  });
};
