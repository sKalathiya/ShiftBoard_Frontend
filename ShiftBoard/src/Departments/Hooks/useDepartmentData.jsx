import { fetch } from "../../Utils/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

//All Departments
const fetchAllDepartments = () => {
  return fetch({ url: "/api/v1/departments/admin" });
};
export const useAllDepartmentsData = () => {
  return useQuery({
    queryKey: ["Departments"],
    queryFn: fetchAllDepartments,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

//Department By ID
const fetchDepartmentById = (id) => {
  return fetch({ url: `/api/v1/departments/admin/${id}` });
};

export const useDepartmentData = (id) => {
  return useQuery({
    queryKey: ["Department", id, "Details"],
    queryFn: () => fetchDepartmentById(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

//Employees of Department
const fetchEmployeesByPageAndDepartmentId = (id) => {
  return fetch({
    url: `api/v1/departments/admin/employees/${id}`,
  });
};

export const useEmployeeDataByDepartmentId = (id) => {
  return useQuery({
    queryKey: ["Department", id, "Employees"],
    queryFn: () => fetchEmployeesByPageAndDepartmentId(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

//delete Department by ID
const deleteDepartmentById = (id) => {
  return fetch({ url: `/api/v1/departments/admin/${id}`, method: "delete" });
};

export const useDeleteDepartment = () => {
  return useMutation(deleteDepartmentById);
};

//Update Department by Id
const updateDepartmentById = (department) => {
  return fetch({
    url: `/api/v1/departments/admin`,
    method: "put",
    data: department,
  });
};

export const useUpdateDepartment = (id) => {
  const queryClient = useQueryClient();
  return useMutation(updateDepartmentById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Department", "" + id, "Details"]);
    },
  });
};

//Delete Employee in department
const deleteEmployeeById = (data) => {
  return fetch({
    url: `/api/v1/departments/admin/remove-employee`,
    data: data,
    method: "delete",
  });
};

export const useDeleteEmployeeInDepartment = (departmentId) => {
  const queryClient = useQueryClient();
  return useMutation(deleteEmployeeById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Department", "" + departmentId]);
    },
  });
};

//Transfer Employees in Department

const transferEmployees = (data) => {
  return fetch({
    url: `/api/v1/employees/admin/transfer`,
    method: "put",
    data: data,
  });
};

export const useTransferEmployees = () => {
  const queryClient = useQueryClient();
  return useMutation(transferEmployees, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Department"]);
    },
  });
};

//All Departments for forms
export const useAllDepartmentsDataForForm = () => {
  return useQuery({
    queryKey: ["DepartmentsForForm"],
    queryFn: fetchAllDepartments,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
