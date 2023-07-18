import { useNavigate } from "react-router-dom";
import "./department-list.css";

const ListDepartment = ({ departments }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid-container-col1 border p-4">
        <div className="grid-container-col5 border-bottom p-2" id="headList">
          <label htmlFor="departmentId">Department Id</label>
          <label htmlFor="name">Name</label>
          <label htmlFor="totalEmployees">Total Employees</label>
          <label htmlFor="email">Email</label>
          <label htmlFor="actions">Actions</label>
        </div>

        {departments.map((department) => {
          return (
            <div className="grid-container-col5 border-bottom data-list p-2">
              <h2 data-label="Id:">{department.departmentId}</h2>

              <h2 data-label="Name:">{department.name}</h2>

              <h2 data-label="Email:">{department.email}</h2>
              <h2 data-label="No Of Employees:">{department.noOfEmployees}</h2>

              <span className="end inline-actions">
                <button
                  className="btn px-3"
                  id="blackBg"
                  onClick={() =>
                    navigate("/departments/" + department.departmentId)
                  }
                >
                  <i className="fas fa-eye"></i>
                </button>
                <button className="btn px-3 mx-1" id="redBg">
                  <i className="fas fa-trash-alt"></i>
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