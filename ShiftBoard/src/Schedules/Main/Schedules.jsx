import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEmployeeDataOnClick } from "../Hooks/useScheduleData";
import EmployeeDetailInSchedule from "../Main/EmployeeDetailInSchedule";
import Loading from "../../Utils/Loading";
import WeekSchedule from "./WeekSchedule";
import ApprovedRestriction from "./ApprovedRestriction";

const Schedules = () => {
  const id = useParams().id;
  const [first, setFirst] = useState(true);
  const [employeeId, setEmployeeId] = useState(id ? id : "");

  //getting employee details
  const { isLoading, isError, refetch, data, error } =
    useEmployeeDataOnClick(employeeId);

  if (isError) {
    alert(error.message);
    return;
  }

  //if id already present then fetch data
  if (id && first) {
    refetch();
    setFirst(false);
  }

  //handle change of the update
  const handleChange = (event) => {
    setEmployeeId(event.target.value);
  };
  const handleRefetch = () => {
    refetch();
  };

  let employee = data?.data?.data;

  //HTML
  return (
    <section className="main-Container">
      <div className="component-container">
        <span className="component-container-header">
          <p className="page-heading">Schedules</p>
        </span>

        <div className="component-container-body">
          <div className="grid-container-col2">
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={employeeId}
              onChange={handleChange}
              placeholder="Search By employeeId"
            />
            <button
              className="btn ms-1 px-4 w-50"
              id="blackBg"
              onClick={handleRefetch}
            >
              <i className="fa-solid fa-magnifying-glass fa-l"></i> Search
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading count={5} />
      ) : (
        <>
          {employee == undefined ? (
            <></>
          ) : (
            <>
              <EmployeeDetailInSchedule employee={employee} />
              <WeekSchedule id={employee.id} />
              <ApprovedRestriction id={employee.id} />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Schedules;
