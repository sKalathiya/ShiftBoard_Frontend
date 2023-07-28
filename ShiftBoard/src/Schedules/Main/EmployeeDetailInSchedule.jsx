import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDetailInSchedule = ({ employee }) => {
  const navigate = useNavigate();
  return (
    <div className="component-container">
      <span className="component-container-header">
        <p className="heading">Employee</p>
      </span>

      <div className="component-container-body">
        <div className="grid-container-col2 details">
          <span>
            <label htmlFor="firstName">First Name</label>
            <h2>{employee.firstName}</h2>
          </span>
          <span>
            <label htmlFor="lastName">Last Name</label>
            <h2>{employee.lastName}</h2>
          </span>
          <span>
            <label htmlFor="Id">Employee Id</label>
            <h2 onClick={() => navigate("/employees/" + employee.id)}>
              <a className="link-primary view">{employee.id}</a>
            </h2>
          </span>
          <span>
            <label htmlFor="Id">Department Id</label>
            <h2
              onClick={() => navigate("/departments/" + employee.departmentId)}
            >
              <a className="link-primary view">{employee.departmentId}</a>
            </h2>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailInSchedule;
