import React from "react";
import Loading from "../../Utils/Loading";
import { useEmployeeData } from "../Hooks/useEmployeeData";

import UpdateEmployee from "../Features/UpdateEmployee";
import DeleteEmployee from "../Features/DeleteEmployee";

const EmployeeInfo = ({ employeeId }) => {
  const { isLoading, isError, error, data } = useEmployeeData(employeeId);
  if (isLoading) return <Loading count={5} />;

  if (isError) {
    alert(error.message);
    return;
  }

  if (typeof data === "undefined") return <Error />;

  //getting Employee from data
  const employee = data?.data.data;
  const {
    id,
    firstName,
    lastName,
    contactNumber,
    departmentId,
    email,
    address,
    schedule,
  } = employee;

  return (
    <>
      <div className="component-container">
        <span className="component-container-header">
          <p className="page-heading">
            {firstName} {lastName}
          </p>
          <UpdateEmployee employee={employee} />
        </span>

        <div className="component-container-body">
          <div className="grid-container-col2 details">
            <span>
              <label htmlFor="Id">Employee Id</label>
              <h2>{id}</h2>
            </span>
            <span>
              <label htmlFor="email">Email</label>
              <h2>{email}</h2>
            </span>
            <span>
              <label htmlFor="contactNumber">Contact Number</label>
              <h2>{contactNumber}</h2>
            </span>

            <span>
              <label htmlFor="Email">Address</label>
              <h2>
                {address.street} {address.city} {address.state}{" "}
                {address.country} {address.zipCode}
              </h2>
            </span>
            <span></span>
            <span>
              <DeleteEmployee id={employeeId} departmentId={departmentId} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeInfo;
