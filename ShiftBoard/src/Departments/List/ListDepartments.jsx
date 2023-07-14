import { useAllDepartmentsData } from "../Hooks/useDepartmentData";
import { Link, useNavigate } from "react-router-dom";
import "./department-list.css";

import view from "/eye.png";

import Loading from "../../Utils/Loading";
const ListDepartment = () => {
  const navigate = useNavigate();

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

  return (
    <div className="list">
      <div className="list-block head">
        <p>Name</p>
        <p>Email</p>
        <p>Total Employees</p>
        <p>Actions</p>
      </div>

      {data?.data?.data.map((department) => {
        return (
          <div className="list-block data " key={department.departmentId}>
            <p data-label="Name:">{department.name}</p>

            <p data-label="Email:">{department.email}</p>

            <p data-label="No Of Employees:">{department.noOfEmployees}</p>

            <img
              className="view-icon"
              onClick={() =>
                navigate("/departments/" + department.departmentId)
              }
              src={view}
              alt="View"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ListDepartment;
