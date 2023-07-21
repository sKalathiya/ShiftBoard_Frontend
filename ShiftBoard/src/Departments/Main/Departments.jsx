import React, { useState } from "react";
import Loading from "../../Utils/Loading";
import SearchDepartment from "../Features/DepartmentFeatures/SearchDepartment";
import { useAllDepartmentsData } from "../Hooks/useDepartmentData";

const Departments = () => {
  const { isLoading, isError, error, data } = useAllDepartmentsData();

  if (isLoading) {
    return (
      <div className="list">
        <Loading count={5} />
      </div>
    );
  }

  if (isError) {
    alert(error.message);
    return;
  }

  //departments
  const departments = data?.data?.data;
  return (
    <section className="main-Container">
      <div className="component-container">
        <span className="component-container-header">
          <p className="page-heading">Departments</p>
        </span>

        <div className="component-container-body">
          <SearchDepartment departments={departments} />
        </div>
      </div>
    </section>
  );
};

export default Departments;
