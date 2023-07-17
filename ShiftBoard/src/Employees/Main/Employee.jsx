import React from "react";
import { useParams } from "react-router-dom";
import EmployeeInfo from "./EmployeeInfo";
import DepartmentInfo from "./DepartmentInfo";
import ScheduleInfo from "./ScheduleInfo";
import LeaveInfo from "./LeaveInfo";

const Employee = () => {
  //getting id of employee
  const id = useParams().id;

  return (
    <section className="main-Container">
      <EmployeeInfo employeeId={id} />
      <DepartmentInfo id={id} />
      <ScheduleInfo id={id} />
      <LeaveInfo id={id} />
    </section>
  );
};

export default Employee;
