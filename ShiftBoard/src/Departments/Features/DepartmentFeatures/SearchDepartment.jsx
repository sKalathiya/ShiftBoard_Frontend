import React, { useState } from "react";
import ListDepartment from "../../List/ListDepartment";
import { CheckDepartmentWithFilter } from "../../../Utils/checkData";

const SearchDepartment = ({ departments }) => {
  const [departmentList, setDepartmentList] = useState(departments);
  const [formData, setFormData] = useState({
    name: "",
    dId: "",
    email: "",
  });

  //handle change of the update
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //Clear Filters
  const handleClearFilter = () => {
    setFormData({
      name: "",
      dId: "",
      email: "",
    });
    setDepartmentList([...departments]);
  };

  //handle Filter
  const handleFilter = () => {
    let tmp = departments.filter((department) =>
      CheckDepartmentWithFilter(department, formData)
    );
    setDepartmentList([...tmp]);
  };
  //HTML
  return (
    <>
      <div className="grid-container-col3">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Search By Name"
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
          id="dId"
          name="dId"
          value={formData.dId}
          onChange={handleChange}
          placeholder="Search By Id"
        />
        <span className="end inline-actions">
          <button className="btn ms-1 px-4" id="blackBg" onClick={handleFilter}>
            <i className="fa-solid fa-filter"></i> Filter
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

      <ListDepartment departments={departmentList} key={departments} />
    </>
  );
};

export default SearchDepartment;
