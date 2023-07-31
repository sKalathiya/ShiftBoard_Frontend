import React, { useState } from "react";
import { checkLeaveWithFilter } from "../../Utils/checkData";
import ListLeave from "../List/ListLeave";
const SearchLeaves = ({ leaves }) => {
  const [leaveList, setLeaveList] = useState([...leaves]);
  const [formData, setFormData] = useState({
    employeeId: "",
    category: "Select Category of Leave",
    state: "Select State of Leave",
    date: "",
  });
  //handle change of the update
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //Clear Filters
  const handleClearFilter = () => {
    setFormData({
      employeeId: "",
      category: "Select Category of Leave",
      state: "Select State of Leave",
      date: "",
    });
    setLeaveList([...leaves]);
  };

  //handle Filter
  const handleFilter = () => {
    let tmp = leaves.filter((leave) => checkLeaveWithFilter(leave, formData));
    setLeaveList([...tmp]);
  };
  return (
    <>
      <div className="grid-container-col3">
        <select
          value={formData.category}
          onChange={handleChange}
          name="category"
          required
        >
          <option value="Select Category of Leave">
            Select Category of Leave
          </option>
          <option value="SICK_LEAVE">SICK_LEAVE</option>
          <option value="RELIGION_LEAVE">RELIGION_LEAVE</option>
        </select>
        <input
          type="text"
          id="employeeId"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          placeholder="Search By employeeId"
        />
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Search By date"
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
      <span className="fw-bold h5"> {leaveList.length} Results</span>
      <ListLeave leaves={leaveList} key={leaveList} />
    </>
  );
};

export default SearchLeaves;
