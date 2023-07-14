import "./employee-list.css";
import vite from "/profile.avif";
import DeleteEmployeeInDepartment from "../../Departments/Features/EmployeeFeatures/DeleteEmployeeInDepartment";
import TransferEmployee from "../../Departments/Features/EmployeeFeatures/TransferEmployee";
import { useState } from "react";

const ListEmployee = ({ employees }) => {
  return (
    <div className="grid-container-col3">
      {employees.map((employee) => {
        return (
          <div className="card" key={employee.id}>
            <img src={vite} alt="Avatar" />
            <div className="container">
              <span>
                <label htmlFor="employeeId">Employee Id</label>
                <h2>{employee.id}</h2>
              </span>
              <span>
                <label htmlFor="Name">Name</label>
                <h2>{employee.firstName}</h2>
              </span>
              <span className="inline-actions">
                <button className="btn px-4" id="blackBg" role="button">
                  <i className="fas fa-eye"></i>
                </button>

                <TransferEmployee employeeId={employee.id} icon={true} />

                <DeleteEmployeeInDepartment
                  employeeId={employee.id}
                  departmentId={employee.departmentId}
                  collection={false}
                />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListEmployee;
