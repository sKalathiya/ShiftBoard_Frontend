import React from "react";

const Pagination = ({ noOfEmployees }) => {
  //pagination
  const [employeePage, setEmployeePage] = useState(1);
  const minIndex = 9 * (employeePage - 1) + 1;
  const maxIndex = Math.min(9 * (employeePage - 1) + 9, noOfEmployees);

  //creating numbers depending upon the no Of employees
  let pages = null;
  if (noOfEmployees <= 9) {
    pages = [...new Array(0)];
  } else {
    const size = Math.ceil(noOfEmployees / 9);
    console.log(size);
    pages = [...new Array(size)];
  }

  return (
    <div className="pagination">
      <span className="desc">
        {minIndex} - {maxIndex} of {noOfEmployees}
      </span>
      {pages.map((_each, index) => {
        return (
          <button
            className={employeePage === index + 1 ? "active" : ""}
            onClick={() => setEmployeePage(index + 1)}
            key={index + 1}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
