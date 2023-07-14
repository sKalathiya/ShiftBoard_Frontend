import React from "react";
import "./employee-list.css";

const ListEmployee = ({ employees }) => {
  return (
    <>
      <div className="grid-container-col1 border p-4">
        <div className="grid-container-col5 head-list border-bottom p-2">
          <label htmlFor="employeeId">Employee Id</label>
          <label htmlFor="firstName">First Name</label>
          <label htmlFor="department">Department</label>
          <label htmlFor="email">Email</label>
          <label htmlFor="actions">Actions</label>
        </div>

        {employees.map((employee) => {
          return (
            <div className="grid-container-col5 border-bottom data-list p-2">
              <h2 data-label="Name:">{employee.id}</h2>

              <h2 data-label="Name:">{employee.firstName}</h2>

              <h2 data-label="Name:">{employee.departmentId}</h2>
              <h2 data-label="Name:">{employee.email}</h2>

              <span className="end inline-actions">
                <button className="btn h-50" id="blackBg">
                  <i className="fa-solid fa-eye"></i>
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListEmployee;
