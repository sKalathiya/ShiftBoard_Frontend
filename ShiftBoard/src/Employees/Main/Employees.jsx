import React, { useState } from "react";
import SearchEmployee from "../Features/SearchEmployee";
import { useAllEmployeesData } from "../Hooks/useEmployeeData";
import Loading from "../../Utils/Loading";
import AddEmployee from "../Features/AddEmployee";

const Employees = () => {
  //getting all employees
  const { isError, error, isLoading, data } = useAllEmployeesData();
  //handling all state of the request employees
  if (isLoading) return <Loading count={3} />;
  if (isError) {
    alert(error.message);
  }

  //Employees
  const employees = data?.data?.data;
  return (
    <section className="main-Container">
      <div className="component-container">
        <span className="component-container-header">
          <p className="page-heading">Employees</p>
          <AddEmployee />
        </span>

        <div className="component-container-body">
          <SearchEmployee employees={employees} key={employees} />
        </div>
      </div>
    </section>
  );
};

export default Employees;
