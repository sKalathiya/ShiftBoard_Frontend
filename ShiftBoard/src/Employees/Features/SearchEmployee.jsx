import React, { useState } from "react";
import Loading from "../../Utils/Loading";
import { useAllDepartmentsDataForForm } from "../../Departments/Hooks/useDepartmentData";
import { CheckEmployeeWithFilter } from "../../Utils/checkData";
import ListEmployee from "../List/ListEmployee";

const SearchEmployee = ({ employees }) => {
  const [employeeList, setEmployeeList] = useState(employees);
  const [formData, setFormData] = useState({
    department: 0,
    firstName: "",
    lastName: "",
    eId: "",
    email: "",
  });
  //getting all departments
  const { isError, error, isLoading, data } = useAllDepartmentsDataForForm();
  //handling all state of the request department
  if (isLoading) return <Loading count={3} />;
  if (isError) {
    alert(error.message);
  }

  //departments
  const departments = data?.data?.data;

  //handle dropdown
  const handleDropdownChange = (e) => {
    setFormData({ ...formData, department: e.target.value });
  };

  //handle change of the update
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //Clear Filters
  const handleClearFilter = () => {
    setFormData({
      department: 0,
      firstName: "",
      eId: "",
      email: "",
    });
    setEmployeeList([...employees]);
  };

  //handle Filter
  const handleFilter = () => {
    let tmp = employees.filter((employee) =>
      CheckEmployeeWithFilter(employee, formData)
    );
    console.log(tmp.length);
    setEmployeeList([...tmp]);
  };

  //HTML
  return (
    <>
      <div className="grid-container-col3">
        <select
          value={formData.department}
          onChange={handleDropdownChange}
          required
        >
          <option key={0} value={0} id="0">
            All Departments
          </option>
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

        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Search By FirstName"
        />

        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Search By Email"
        />
        <input
          type="text"
          id="eId"
          name="eId"
          value={formData.eId}
          onChange={handleChange}
          placeholder="Search By Id"
        />
        <span className="end inline-actions">
          <button className="btn ms-1 px-4" id="blackBg" onClick={handleFilter}>
            Filter
          </button>
          <button
            className="btn ms-1 px-4"
            onClick={handleClearFilter}
            id="whiteBg"
          >
            Clear Filters
          </button>
        </span>
      </div>

      <span className="fw-bold h5"> {employeeList.length} Results</span>
      <ListEmployee employees={employeeList} />
    </>
  );
};

export default SearchEmployee;
