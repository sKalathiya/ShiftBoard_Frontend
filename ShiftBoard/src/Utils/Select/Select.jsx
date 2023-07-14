import React, { useState } from "react";

const Select = ({ dataList, typeOfList, selectedList, setSelectedList }) => {
  const [isInputError, setIsInputError] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);

  const [search, setSearch] = useState("");

  //handle change of the update
  const handleChange = (e) => {
    if (e.target.value.length === 4) {
      if (isNaN(+e.target.value)) {
        setIsInputError(true);
        setSearch(e.target.value);
      } else {
        setIsInputError(false);
        let temp = dataList.filter((id) => id === parseInt(e.target.value, 10));
        if (temp.length === 1) {
          setIsSearchError(false);
          if (!selectedList.includes(e.target.value)) {
            setSelectedList([...selectedList, e.target.value]);
          }
          setSearch("");
        } else {
          setIsSearchError(true);
          setSearch(e.target.value);
        }
      }
    } else {
      setSearch(e.target.value);
    }
  };

  //handle select remove
  const handleRemoveSelect = (id) => {
    let tmp = [...selectedList];

    const index = tmp.indexOf("" + id);
    if (index > -1) {
      tmp.splice(index, 1);
    }

    setSelectedList([...tmp]);
  };

  return (
    <>
      <label className="m-0">{`Selected ${typeOfList}:`}</label>
      <div className=" my-2">
        {selectedList.map((id) => {
          return (
            <span className="badge bg-secondary me-1 h-50" key={id}>
              {id}
              <i
                className="fas fa-times ms-2"
                role="button"
                onClick={() => handleRemoveSelect(id)}
              ></i>
            </span>
          );
        })}
      </div>
      <input
        type="text"
        id="search"
        value={search}
        name="search"
        list="ids"
        autoComplete="off"
        placeholder={`Search ${typeOfList}`}
        onChange={handleChange}
      />
      <datalist id="ids">
        {dataList.map((e) => {
          return <option value={e} key={e} role="button"></option>;
        })}
      </datalist>
      {isInputError && (
        <div className="alert alert-danger p-1 my-2 " role="alert">
          Id should be numbers
        </div>
      )}
      {isSearchError && (
        <div className="alert alert-danger p-1 my-2 " role="alert">
          {`No such ${typeOfList} found!`}
        </div>
      )}
    </>
  );
};

export default Select;
