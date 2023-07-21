import React from "react";
import { useNavigate } from "react-router-dom";
import "./employee-list.css";

const ListEmployee = ({ employees }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid-container-col1 border p-4">
        <div className="grid-container-col5 border-bottom p-2" id="headList">
          <label htmlFor="employeeId">Employee Id</label>
          <label htmlFor="firstName">First Name</label>
          <label htmlFor="department">Department</label>
          <label htmlFor="email">Email</label>
          <label htmlFor="actions">Actions</label>
        </div>

        {employees.map((employee) => {
          return (
            <div className="grid-container-col5 border-bottom data-list p-2">
              <h2 data-label="Id:">{employee.id}</h2>

              <h2 data-label="Name:">{employee.firstName}</h2>

              <h2
                data-label="Department Id:"
                onClick={() =>
                  navigate("/departments/" + employee.departmentId)
                }
              >
                <a className="link-primary">{employee.departmentId}</a>
              </h2>
              <h2 data-label="Name:">{employee.email}</h2>
              <span className="end inline-actions">
                <button
                  className="btn px-3"
                  id="blackBg"
                  onClick={() => navigate("/employees/" + employee.id)}
                >
                  <i className="fas fa-eye"></i>
                </button>
              </span>
            </div>
          );
        })}

        {employees.length == 0 && (
          <div className="empty-search">
            <i class="fal fa-file-search fa-2xl"></i>
            <p className="mt-3"> No Such Employees Found !!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ListEmployee;
