import vite from "/profile.avif";
import { renderPagination } from "../../../Utils/Pagination.jsx";
import { useNavigate } from "react-router-dom";
import DeleteEmployeeInDepartment from "./DeleteEmployeeInDepartment";
import TransferEmployee from "./TransferEmployee";
import { useState } from "react";

const ListEmployeeInCard = ({ employees }) => {
  const navigate = useNavigate();
  //pagination
  const [page, setPage] = useState(1);
  const noOfEmployees = employees.length;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(noOfEmployees / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, noOfEmployees);
  const list = employees.slice(startIndex, endIndex);

  return (
    <>
      <div className="grid-container-col1 border p-4">
        <div className="grid-container-col4 border-bottom p-2" id="headList">
          <label htmlFor="employeeId">Employee Id</label>
          <label htmlFor="firstName">First Name</label>
          <label htmlFor="email">Email</label>
          <label htmlFor="actions">Actions</label>
        </div>

        {list.map((employee) => {
          return (
            <div className="grid-container-col4 border-bottom data-list p-2">
              <h2 data-label="Id:">{employee.id}</h2>

              <h2 data-label="First Name:">{employee.firstName}</h2>
              <h2 data-label="Email:">{employee.email}</h2>

              <span className="end inline-actions">
                <TransferEmployee
                  employeeId={employee.id}
                  icon={true}
                  departmentId={employee.departmentId}
                />

                {employee.departmentId != -1 && (
                  <DeleteEmployeeInDepartment
                    employeeId={employee.id}
                    departmentId={employee.departmentId}
                    collection={false}
                  />
                )}
              </span>
            </div>
          );
        })}

        {employees.length == 0 ? (
          <div className="empty-search">
            <i class="fal fa-file-search fa-2xl"></i>
            <p className="mt-3"> No Such Employees Found !!</p>
          </div>
        ) : (
          <div className="pagination p-2 ">
            <div className="desc d-flex  align-items-center me-2">
              {startIndex + 1} - {endIndex} of {noOfEmployees}
            </div>
            {noOfEmployees > 10 &&
              renderPagination(page, totalPages, handlePageClick)}
          </div>
        )}
      </div>
    </>
  );
};

export default ListEmployeeInCard;
