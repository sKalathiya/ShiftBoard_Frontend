import React from "react";
import Loading from "../../Utils/Loading";
import { useNavigate } from "react-router-dom";
import TransferEmployee from "../../Departments/Features/EmployeeFeatures/TransferEmployee";
import { useDepartmentDataFromEmployeeId } from "../Hooks/useEmployeeData";
import DeleteEmployeeInDepartment from "../../Departments/Features/EmployeeFeatures/DeleteEmployeeInDepartment";

const DepartmentInfo = ({ id: employeeId }) => {
  const navigate = useNavigate();

  const { isLoading, isError, error, data } =
    useDepartmentDataFromEmployeeId(employeeId);
  if (isLoading) return <Loading count={5} />;

  if (isError) {
    alert(error.message);
    return;
  }

  if (typeof data === "undefined") return <Error />;

  //getting Employee from data
  const department = data?.data.data;

  const { departmentId, name: departmentName } = department;

  return (
    <>
      <div className="component-container">
        <span className="component-container-header">
          <h4>Department</h4>
          <button
            className="btn p-0 end"
            title="View Department"
            onClick={() => navigate("/departments/" + departmentId)}
          >
            <i className="fas fa-external-link  fa-xl"></i>
          </button>
        </span>

        <div className="component-container-body">
          <div className="grid-container-col2 details">
            <span>
              <label htmlFor="Id">Department Id</label>
              <h2>{departmentId}</h2>
            </span>
            <span>
              <label htmlFor="name">Department Name</label>
              <h2>{departmentName}</h2>
            </span>
            <span>
              <TransferEmployee employeeId={employeeId} />
              {departmentId != -1 && (
                <DeleteEmployeeInDepartment
                  employeeId={employeeId}
                  departmentId={departmentId}
                  collection={false}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentInfo;
