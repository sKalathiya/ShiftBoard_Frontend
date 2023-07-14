import { useNavigate } from "react-router-dom";
import "./department-list.css";

const ListDepartment = ({ departments }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid-container-col1 border p-4">
        <div className="grid-container-col5 border-bottom p-2" id="head-list">
          <label htmlFor="departmentId">Department Id</label>
          <label htmlFor="name">Name</label>
          <label htmlFor="totalEmployees">Total Employees</label>
          <label htmlFor="email">Email</label>
          <label htmlFor="actions">Actions</label>
        </div>

        {departments.map((department) => {
          return (
            <div className="grid-container-col5 border-bottom data-list p-2">
              <h2 data-label="Department Id:">{department.departmentId}</h2>

              <h2 data-label="Name:">{department.name}</h2>

              <h2 data-label="Email:">{department.email}</h2>
              <h2 data-label="No Of Employees:">{department.noOfEmployees}</h2>

              <span className="end inline-actions">
                <button
                  className="btn"
                  id="blackBg"
                  onClick={() =>
                    navigate("/departments/" + department.departmentId)
                  }
                >
                  <i className="fa-solid fa-eye"></i>
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListDepartment;
