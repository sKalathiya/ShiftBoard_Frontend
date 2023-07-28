import React, { useState } from "react";
import { checkRestrictionWithFilter } from "../../Utils/checkData";
import ListRestriction from "../List/ListRestriction";

const SearchRestriction = ({ restrictions }) => {
  const [restrictionList, setRestrictionList] = useState([...restrictions]);
  const [formData, setFormData] = useState({
    employeeId: "",
  });
  //handle change of the update
  const handleChange = (event) => {
    const { name, value } = event.target;

    let tmp = restrictions.filter((r) =>
      checkRestrictionWithFilter(r, { employeeId: value })
    );

    setRestrictionList([...tmp]);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //HTMl
  return (
    <>
      <div className="grid-container-col2">
        <input
          type="text"
          id="employeeId"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          placeholder="Search By employeeId"
        />
      </div>
      <ListRestriction restrictions={restrictionList} key={restrictionList} />
    </>
  );
};

export default SearchRestriction;
