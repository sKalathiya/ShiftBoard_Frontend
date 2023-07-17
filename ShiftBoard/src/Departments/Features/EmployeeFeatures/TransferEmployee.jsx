import React, { useState } from "react";
import { notify } from "../../../Utils/Notification/Notification";
import {
  useTransferEmployees,
  useAllDepartmentsDataForForm,
} from "../../Hooks/useDepartmentData";
import Loading from "../../../Utils/Loading";
import Select from "../../../Utils/Select/Select";

const TransferEmployee = ({ employees, employeeId, icon }) => {
  //form data
  const [newDepartment, setNewDepartment] = useState("-1");
  const [employeesId, setEmployeesId] = useState([]);
  //Opening and closing
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  //transfer employee
  const {
    data: transferConfirm,
    mutate: transferEmployee,
    isLoading: transferLoading,
    isError: transferIsError,
    error: transferError,
    reset,
  } = useTransferEmployees(employeeId);

  //getting all departments
  const { isError, error, isLoading, data } = useAllDepartmentsDataForForm();

  //handling all state of the request transfer
  if (transferIsError) {
    reset();
    notify(transferError.message, "E");
  }

  //if operation successful
  if (transferConfirm?.data?.operationStatus === "Success") {
    reset();
    if (transferConfirm?.data?.warning !== "") {
      console.log("HER !!  E");
      notify(transferConfirm?.data?.warning + " Cannot be transferred", "S");
    } else notify("Transfer Complete", "S");

    setIsTransferOpen(false);
  } else if (transferConfirm?.data?.operationStatus === "Failure") {
    reset();
    notify(transferConfirm?.data?.failureReason, "E");
  }

  //handling all state of the request department
  if (isLoading) return <Loading count={3} />;
  if (isError) {
    alert(error.message);
  }

  //departments
  const departments = data?.data?.data;

  //handle dropdown
  const handleDropdownChange = (e) => {
    setNewDepartment(e.target.value);
  };

  //handle submit data
  const handleSubmit = (event) => {
    event.preventDefault();

    if (employeeId) {
      transferEmployee({ employeesId: [employeeId], newDepartment });
    } else {
      if (employeesId.length !== 0) {
        transferEmployee({ employeesId, newDepartment });
        setEmployeesId([]);
        setNewDepartment("-1");
      } else alert("No employee Selected");
    }
  };

  //HTML
  return (
    <>
      {icon ? (
        <button
          onClick={() => {
            setIsTransferOpen(true);
          }}
          className="btn ms-1 px-4"
          title="Transfer Employee"
          id="blackBg"
        >
          <i className="fas fa-exchange"></i>
        </button>
      ) : (
        <button
          onClick={() => {
            setIsTransferOpen(true);
          }}
          className="btn ms-1 px-4"
          title="Transfer Employee"
          id="blackBg"
        >
          <i className="fas fa-exchange"></i> Transfer
        </button>
      )}

      {isTransferOpen && (
        <div className="modal-container">
          <div className="modal-main component-container ">
            <div className="component-container-header">
              <span></span>
              <button
                type="button"
                className="btn-close end"
                onClick={() => {
                  setIsTransferOpen(false);
                  setEmployeesId([]);
                }}
              ></button>
            </div>
            <div className="component-container-body">
              <div className="grid-container-col1 form-outline">
                <h3>Transfer Employees</h3>
                <span>
                  {employeeId ? (
                    <>
                      <label>Employee for transfer:</label>
                      <input type="text" disabled value={employeeId} />
                    </>
                  ) : (
                    <>
                      <Select
                        dataList={employees.map((e) => e.id)}
                        typeOfList={"Employee"}
                        selectedList={employeesId}
                        setSelectedList={setEmployeesId}
                      />
                    </>
                  )}
                </span>
                <span>
                  <label>To Department:</label>

                  <select
                    value={newDepartment}
                    onChange={handleDropdownChange}
                    required
                  >
                    {departments.map((department) => {
                      return (
                        <option
                          key={department.departmentId}
                          value={department.departmentId}
                          id={department.departmentId}
                        >
                          {department.name}
                        </option>
                      );
                    })}
                  </select>
                </span>
                {transferLoading ? (
                  <button className="btn" id="blackBg" disabled>
                    <i className="fas fa-circle-notch fa-spin"></i>
                  </button>
                ) : (
                  <button
                    className="btn"
                    id="blackBg"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <i className="fas fa-exchange"></i> Transfer
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
export default TransferEmployee;
