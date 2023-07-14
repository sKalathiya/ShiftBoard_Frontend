import { fetch } from "../../Utils/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchAllEmployees = () => {
  return fetch({ url: "/api/v1/departments/admin" });
};

export const useAllEmployeesData = () => {
  return useQuery({
    queryKey: ["Employees"],
    queryFn: fetchAllEmployees,
  });
};

const fetchEmployeeById = (id) => {
  return fetch({ url: `/api/v1/departments/admin/${id}` });
};

export const useEmployeeData = (id) => {
  return useQuery({
    queryKey: ["Employee", id],
    queryFn: () => fetchEmployeeById(id),
  });
};

const addEmployee = (employee) => {
  console.log(employee);
  return fetch({
    url: "/api/v1/employees/admin",
    method: "post",
    data: employee,
  });
};

export const useAddEmployee = (id) => {
  const queryClient = useQueryClient();
  return useMutation(addEmployee, {
    onSuccess: () => {
      queryClient.invalidateQueries(["EmployeesByDepartmentId", id]);
    },
  });
};
