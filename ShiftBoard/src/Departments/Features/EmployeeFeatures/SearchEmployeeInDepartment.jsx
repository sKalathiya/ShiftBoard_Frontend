import { useState } from "react";

import "../department-features.css";
import ListEmployeeInCard from "./ListEmployeeInCard";

const SearchEmployeeInDepartment = ({ employees }) => {
  console.log("List rendered again");
  //formData state
  const [search, setSearch] = useState();

  //filterEMployee State
  const [filterEmployees, setFilterEmployees] = useState(employees);

  //Update form values
  const handleChange = (event) => {
    if (event.target.value === "") {
      setFilterEmployees(employees);
    }
    setSearch(event.target.value);

    let temp = employees.filter(
      (employee) => employee.id === parseInt(event.target.value, 10)
    );

    if (temp.length === 1) {
      setFilterEmployees(temp);
      return;
    }

    temp = employees.filter((employee) =>
      employee.firstName.includes(event.target.value)
    );

    setFilterEmployees(temp);
  };

  //To check if the filter returns no employee
  let checkEmpty = filterEmployees.length === 0 ? true : false;

  //HTML
  return (
    <>
      <div className="search-container">
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Search By Name or External Id"
          value={search}
          onChange={handleChange}
        />
        <span></span>
      </div>

      {!checkEmpty && <ListEmployeeInCard employees={filterEmployees} />}
      {checkEmpty && (
        <div className="empty-search">
          <i className="fad fa-file-search fa-2xl"></i>
          <p> No Employee Found!!</p>
        </div>
      )}
    </>
  );
};

export default SearchEmployeeInDepartment;
