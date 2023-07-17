import vite from "/profile.avif";
import { useNavigate } from "react-router-dom";
import DeleteEmployeeInDepartment from "./DeleteEmployeeInDepartment";
import TransferEmployee from "./TransferEmployee";

const ListEmployeeInCard = ({ employees }) => {
  const navigate = useNavigate();
  return (
    <div className="grid-container-col3">
      {employees.map((employee) => {
        return (
          <div className="card" key={employee.id}>
            <img src={vite} alt="Avatar" />
            <div className="container">
              <span>
                <label htmlFor="employeeId">Employee Id</label>
                <h2 onClick={() => navigate("/employees/" + employee.id)}>
                  <a className="link-primary">{employee.id}</a>
                </h2>
              </span>
              <span>
                <label htmlFor="Name">Name</label>
                <h2>{employee.firstName}</h2>
              </span>
              <span className="inline-actions">
                <TransferEmployee employeeId={employee.id} icon={true} />

                {employee.departmentId != -1 && (
                  <DeleteEmployeeInDepartment
                    employeeId={employee.id}
                    departmentId={employee.departmentId}
                    collection={false}
                  />
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListEmployeeInCard;
