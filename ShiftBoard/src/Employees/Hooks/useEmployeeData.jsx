import { fetch } from "../../Utils/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

//fetch all employee
const fetchAllEmployees = () => {
  return fetch({ url: "/api/v1/employees/admin" });
};

export const useAllEmployeesData = () => {
  return useQuery({
    queryKey: ["Employees"],
    queryFn: fetchAllEmployees,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

//fetch all employee By page
const fetchAllEmployeesByPage = (page) => {
  return fetch({ url: "/api/v1/employees/admin/" + page });
};

export const useAllEmployeesByPageData = (page) => {
  return useQuery({
    queryKey: ["Employees", "" + page],
    queryFn: () => fetchAllEmployeesByPage(page),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

//fetch employee by Id
const fetchEmployeeById = (id) => {
  return fetch({ url: `/api/v1/employees/${id}` });
};

export const useEmployeeData = (id) => {
  return useQuery({
    queryKey: ["Employee", "" + id, "Details"],
    queryFn: () => fetchEmployeeById(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

//Fetch schedule nby Eid
const fetchScheduleByEmployeeId = (id) => {
  return fetch({ url: `/api/v1/schedules/employee/${id}` });
};

export const useScheduleDataFromEmployeeId = (id) => {
  return useQuery({
    queryKey: ["Employee", "" + id, "Schedule"],
    queryFn: () => fetchScheduleByEmployeeId(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

////Fetch Department nby Eid
const fetchDepartmentByEmployeeId = (id) => {
  return fetch({ url: `/api/v1/departments/admin/employee/${id}` });
};

export const useDepartmentDataFromEmployeeId = (id) => {
  return useQuery({
    queryKey: ["Employee", "" + id, "Department"],
    queryFn: () => fetchDepartmentByEmployeeId(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

//Fetch Availability nby Eid
const fetchRestrictionByEmployeeId = (id) => {
  return fetch({ url: `/api/v1/availability/${id}` });
};

export const useRestrictionDataFromEmployeeId = (id) => {
  return useQuery({
    queryKey: ["Employee", "" + id, "Restriction"],
    queryFn: () => fetchRestrictionByEmployeeId(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

//Fetch Leave nby Eid
const fetchLeaveByEmployeeId = (id) => {
  return fetch({ url: `/api/v1/leaves/${id}` });
};

export const useLeaveDataFromEmployeeId = (id) => {
  return useQuery({
    queryKey: ["Employee", "" + id, "Leave"],
    queryFn: () => fetchLeaveByEmployeeId(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

//Update Employee by Id
const updateEmployeeById = (employee) => {
  return fetch({
    url: `api/v1/employees/update`,
    method: "PUT",
    data: employee,
  });
};

export const useUpdateEmployee = (id) => {
  const queryClient = useQueryClient();
  return useMutation(updateEmployeeById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Employee", "" + id, "Details"]);
      queryClient.invalidateQueries(["Employees"]);
    },
  });
};

//delete employee
const deleteEmployeeById = (id) => {
  return fetch({ url: `/api/v1/employees/admin/${id}`, method: "delete" });
};

export const useDeleteEmployee = (dId) => {
  const queryClient = useQueryClient();
  return useMutation(deleteEmployeeById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Department", "" + dId]);
      queryClient.invalidateQueries(["Employees"]);
    },
  });
};

//add employee
const addEmployee = (employee) => {
  console.log(employee);
  return fetch({
    url: "/api/v1/employees/admin",
    method: "post",
    data: employee,
  });
};

export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(addEmployee, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Employees"]);
      queryClient.invalidateQueries(["Departments"]);
    },
  });
};
