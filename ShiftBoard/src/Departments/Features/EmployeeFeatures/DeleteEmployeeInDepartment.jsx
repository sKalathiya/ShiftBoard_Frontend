import React, { useState } from "react";
import Loading from "../../../Utils/Loading";
import { useDeleteEmployeeInDepartment } from "../../Hooks/useDepartmentData";
import { notify } from "../../../Utils/Notification/Notification";
import Select from "../../../Utils/Select/Select";

const DeleteEmployeeInDepartment = ({
  employeeId,
  departmentId,
  collection,
  employees,
}) => {
  const [employeesId, setEmployeesId] = useState([]);
  //Opening and closing
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  //Deleting employee
  const {
    isLoading,
    isError,
    error,
    mutate: removeEmployee,
    data,
    reset,
  } = useDeleteEmployeeInDepartment(departmentId, employeeId, collection);

  if (isError) {
    notify(error.message, "E");
    reset();
  }

  if (data?.data?.operationStatus === "Success") {
    notify("Employee Removed", "S");
    reset();
    setIsRemoveOpen(false);
  } else if (data?.data?.operationStatus === "Failure") {
    notify("Please try again", "E");
    reset();
  }

  const handleDeleteClick = () => {
    if (collection) {
      removeEmployee({ employeesId, departmentId });
      setEmployeesId([]);
    } else {
      if (window.confirm("Remove the employee from this department?")) {
        removeEmployee({ employeesId: [employeeId], departmentId });
        setEmployeesId([]);
      }
    }
  };

  return (
    <>
      {collection ? (
        <button
          className="btn px-4 ms-1"
          id="redBg"
          onClick={() => setIsRemoveOpen(true)}
          title="Remove Employee"
        >
          <i className="fas fa-trash-alt"></i> Remove
        </button>
      ) : (
        <>
          {isLoading ? (
            <button className="btn  px-4 ms-1" id="redBg" disabled>
              <i className="fas fa-circle-notch fa-spin"></i>
            </button>
          ) : (
            <button
              className="btn px-4 ms-1"
              id="redBg"
              onClick={() => handleDeleteClick()}
              title="Remove Employee"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          )}
        </>
      )}

      {isRemoveOpen && (
        <div className="modal-container">
          <div className="modal-main component-container ">
            <div className="component-container-header">
              <span></span>
              <button
                type="button"
                className="btn-close end"
                onClick={() => {
                  setIsRemoveOpen(false);
                  setEmployeesId([]);
                }}
              ></button>
            </div>
            <div className="component-container-body">
              <div className="grid-container-col1 form-outline">
                <h3>Remove Employees</h3>
                <span>
                  <Select
                    dataList={employees.map((e) => e.id)}
                    typeOfList={"Employee"}
                    selectedList={employeesId}
                    setSelectedList={setEmployeesId}
                  />
                </span>
                {isLoading ? (
                  <button className="btn  px-4 ms-1" id="redBg" disabled>
                    <i className="fas fa-circle-notch fa-spin"></i>
                  </button>
                ) : (
                  <button
                    className="btn px-4 ms-1"
                    id="redBg"
                    onClick={() => handleDeleteClick()}
                    title="Remove Employee"
                  >
                    <i className="fas fa-trash-alt"></i> Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEmployeeInDepartment;
