import DeleteDepartment from "../Features/DepartmentFeatures/DeleteDepartment";
import UpdateDepartment from "../Features/DepartmentFeatures/UpdateDepartment";
import Loading from "../../Utils/Loading";
import { useDepartmentData } from "../Hooks/useDepartmentData";
import Error from "../../Error/Error";

const Details = ({ id }) => {
  //fetching data
  const { isLoading, isError, error, data } = useDepartmentData(id);
  if (isLoading) return <Loading count={5} />;

  if (isError) {
    alert(error.message);
    return;
  }

  if (typeof data === "undefined") return <Error />;

  //getting department from data
  const department = data?.data.data;
  const {
    departmentId,
    name: departmentName,
    noOfEmployees,
    email,
  } = department;

  //HTML
  return (
    <>
      <div className="component-container">
        <span className="component-container-header">
          <p className="page-heading">{departmentName}</p>
          <UpdateDepartment department={department} />
        </span>

        <div className="component-container-body">
          <div className="grid-container-col2 details">
            <span>
              <label htmlFor="Id">Department ID</label>
              <h2>{departmentId}</h2>
            </span>
            <span>
              <label htmlFor="head">Head</label>
              <h2>Sahil</h2>
            </span>

            <span>
              <label htmlFor="noOfEmployees">Number Of Employees</label>
              <h2>{noOfEmployees}</h2>
            </span>
            <span>
              <label htmlFor="Email">Email</label>
              <h2>{email}</h2>
            </span>
            <span></span>
            <span>
              <DeleteDepartment
                id={departmentId}
                departmentName={departmentName}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
