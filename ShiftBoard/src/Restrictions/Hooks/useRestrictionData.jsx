import { fetch } from "../../Utils/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

//All Restrictions
const fetchAllRestrictions = () => {
  return fetch({ url: "/api/v1/availability/admin" });
};
export const useAllRestrictionsData = () => {
  return useQuery({
    queryKey: ["Availabilities"],
    queryFn: fetchAllRestrictions,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

// change the state of Restrictions
const updateRestrictionState = ({ rId, state }) => {
  return fetch({
    url: `api/v1/availability/admin/status/` + rId + "?state=" + state,
    method: "PUT",
  });
};

export const useUpdateRestrictionStatus = (employeeId) => {
  const queryClient = useQueryClient();
  return useMutation(updateRestrictionState, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "Employee",
        "" + employeeId,
        "Availability",
      ]);
      queryClient.invalidateQueries(["Employee", "" + employeeId, "Schedule"]);
      queryClient.invalidateQueries(["Availabilities"]);
      queryClient.invalidateQueries([
        "Schedule",
        "" + employeeId,
        "Restriction",
      ]);
      queryClient.invalidateQueries(["Schedule", "" + employeeId, "BiWeekly"]);
    },
  });
};
