import { useAllLeavesData } from "../../Leaves/Hooks/useLeaveData";
import { useAllRestrictionsData } from "../../Restrictions/Hooks/useRestrictionData";
import { fetch } from "../../Utils/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useAllLeavesDataForDashboard = useAllLeavesData;
export const useAllRestrictionsDataForDashboard = useAllRestrictionsData;

//All Employees for today
const fetchAllEmployeesForToday = (date) => {
  return fetch({ url: "/api/v1/schedules/admin/day?dt=" + date });
};
export const useAllEmployeesForTodayData = (date) => {
  return useQuery({
    queryKey: ["ShiftForToday"],
    queryFn: () => fetchAllEmployeesForToday(date),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};
