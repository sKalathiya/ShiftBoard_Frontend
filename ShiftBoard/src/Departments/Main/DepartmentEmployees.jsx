import React from "react";
import { useNavigate } from "react-router-dom";
import { useEmployeeDataByDepartmentId } from "../Hooks/useDepartmentData";
import SearchEmployeeInDepartment from "../Features/EmployeeFeatures/SearchEmployeeInDepartment";
import Loading from "../../Utils/Loading";
import TransferEmployee from "../Features/EmployeeFeatures/TransferEmployee";
import DeleteEmployeeInDepartment from "../Features/EmployeeFeatures/DeleteEmployeeInDepartment";

const DepartmentEmployees = ({ id }) => {
  //Fetching data
  console.log(id);
  const { isLoading, isError, error, data } = useEmployeeDataByDepartmentId(id);
  if (isLoading) return <Loading count={5} />;

  if (isError) {
    alert(error.message);
    return;
  }

  //resolving data
  const employees = data?.data?.data;

  //HTML
  return (
    <>
      <div className="component-container">
        <span className="component-container-header">
          <p className="heading">Employees</p>
          <span className="end inline-actions">
            {employees.length != 0 ? (
              <>
                <TransferEmployee employees={employees} departmentId={id} />
                {id != -1 && (
                  <DeleteEmployeeInDepartment
                    employees={employees}
                    collection={true}
                    departmentId={id}
                  />
                )}
              </>
            ) : (
              <></>
            )}
          </span>
        </span>
        <div className="component-container-body">
          {employees.length == 0 ? (
            <div className="empty-search">
              <i className="fal fa-file-search fa-2xl"></i>
              <p className="mt-3">
                There are no Employees in this department. Please transfer the
                employees from <a href="/departments/-1">Inactive</a> or add new
                employee from <a href="/employees">here</a>.
              </p>
            </div>
          ) : (
            <SearchEmployeeInDepartment employees={employees} key={employees} />
          )}
        </div>
      </div>
    </>
  );
};

export default DepartmentEmployees;
