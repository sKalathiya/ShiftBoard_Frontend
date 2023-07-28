import { fetch } from "../../Utils/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

//fetch employee by Id when click
const fetchEmployeeById = (id) => {
  return fetch({ url: `/api/v1/employees/${id}` });
};

export const useEmployeeDataOnClick = (id) => {
  return useQuery({
    queryKey: ["Schedule", "Employee Details"],
    queryFn: () => fetchEmployeeById(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: false,
  });
};

//fetch schedule for this week and next week

const fetchScheduleBiWeekly = (id) => {
  return fetch({ url: `/api/v1/schedules/week/${id}` });
};

export const useScheduleBiweeklyData = (id) => {
  return useQuery({
    queryKey: ["Schedule", id, "BiWeekly"],
    queryFn: () => fetchScheduleBiWeekly(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

// add schedule to employee

//add employee
const addSchedule = ({ employeeId, date, data }) => {
  return fetch({
    url: `/api/v1/schedules/admin/employee/${employeeId}?dt=` + date,
    method: "post",
    data: data,
  });
};

export const useAddSchedule = (employeeId) => {
  const queryClient = useQueryClient();
  return useMutation(addSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Schedule", "" + employeeId]);
      queryClient.invalidateQueries(["Employee", "" + employeeId, "Schedule"]);
    },
  });
};

//delete Schedule
const deleteSchedule = ({ employeeId, date }) => {
  return fetch({
    url: `/api/v1/schedules/admin/employee/${employeeId}?dt=` + date,
    method: "delete",
  });
};

export const useDeleteSchedule = (employeeId) => {
  const queryClient = useQueryClient();
  return useMutation(deleteSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Schedule", "" + employeeId]);
      queryClient.invalidateQueries(["Employee", "" + employeeId, "Schedule"]);
    },
  });
};

//Restriction for employee
//fetch schedule for this week and next week

const fetchRestrictionByEmployee = (id) => {
  return fetch({ url: `/api/v1/availability/${id}` });
};

export const useRestrictionByEmployeeData = (id) => {
  return useQuery({
    queryKey: ["Schedule", id, "Restriction"],
    queryFn: () => fetchRestrictionByEmployee(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
