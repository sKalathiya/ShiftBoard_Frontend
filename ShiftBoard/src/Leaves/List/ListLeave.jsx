import { useState } from "react";
import { renderPagination } from "../../Utils/Pagination.jsx";
import "./ListLeave.css";
import UpdateStatusLeave from "../Feature/UpdateStatusLeave";
import { useNavigate } from "react-router-dom";

const ListLeave = ({ leaves }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("A");
  const aLeaves = leaves.filter((leave) => leave.state == "APPROVED");
  const dLeaves = leaves.filter((leave) => leave.state == "DECLINED");
  const pLeaves = leaves.filter((leave) => leave.state == "PENDING");
  const [selectedLeaves, setSelectedLeaves] = useState([...aLeaves]);

  //Handle Selected
  const handleSelected = (e) => {
    const name = e.target.name;

    if (selected == e.target.name) return;

    if (name == "A") {
      setSelectedLeaves([...aLeaves]);
      setSelected("A");
    }
    if (name == "D") {
      setSelectedLeaves([...dLeaves]);
      setSelected("D");
    }
    if (name == "P") {
      setSelectedLeaves([...pLeaves]);
      setSelected("P");
    }
  };

  //pagination
  const [page, setPage] = useState(1);
  const noOfLeaves = selectedLeaves.length;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(noOfLeaves / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, noOfLeaves);
  const list = selectedLeaves.slice(startIndex, endIndex);

  return (
    <>
      <div className="grid-container-col1 pb-4 border">
        <div className="grid-container-col3 border-bottom  sections">
          <a
            htmlFor="Approved"
            className={
              (selected == "A" ? "isActive " : "") + "border p-4 fw-bold "
            }
            name="A"
            onClick={handleSelected}
          >
            <i className="fa-solid fa-circle-check"></i> Approved{" "}
            <span className="badge bg-secondary">{aLeaves.length}</span>
          </a>
          <a
            htmlFor="Declined"
            className={
              (selected == "D" ? "isActive " : "") + "border p-4 fw-bold "
            }
            name="D"
            onClick={handleSelected}
          >
            <i className="fa-solid fa-circle-xmark"></i> Declined{" "}
            <span className="badge bg-secondary">{dLeaves.length}</span>
          </a>
          <a
            htmlFor="Pending"
            className={
              (selected == "P" ? "isActive " : "") + "border p-4 fw-bold "
            }
            name="P"
            onClick={handleSelected}
          >
            Pending <span className="badge bg-secondary">{pLeaves.length}</span>
          </a>
        </div>
        <div
          className="grid-container-col5 border-bottom p-2 mx-4"
          id="headList"
        >
          <label htmlFor="Employee ID">Employee Id</label>
          <label htmlFor="Date">Date</label>
          <label htmlFor="Reason">Reason</label>
          <label htmlFor="Category">Category</label>
          <label htmlFor="State">State</label>
        </div>

        {list.map((leave) => {
          return (
            <div
              className="grid-container-col5 border-bottom data-list p-2 mx-4"
              key={leave.leaveId}
            >
              <h2
                onClick={() => navigate("/employees/" + leave.employeeId)}
                data-label="Employee:"
              >
                <a className="link-primary view">{leave.employeeId}</a>
              </h2>

              <h2 data-label="Date:">{leave.date}</h2>
              <h2 data-label="Reason:">{leave.reason}</h2>
              <h2 data-label="Category:">{leave.category}</h2>
              {leave.state === "APPROVED" && (
                <h2 data-label="Status:" className="accept">
                  <span className="badge bg-success rounded-pill ">
                    <i className="fa-solid fa-circle-check"></i> {leave.state}
                  </span>
                </h2>
              )}
              {leave.state === "DECLINED" && (
                <h2 data-label="Status:">
                  <span className="badge bg-danger rounded-pill ">
                    <i className="fa-solid fa-circle-xmark"></i> {leave.state}
                  </span>
                </h2>
              )}

              {leave.state == "PENDING" && (
                <UpdateStatusLeave
                  leaveId={leave.leaveId}
                  employeeId={leave.employeeId}
                />
              )}
            </div>
          );
        })}

        {selectedLeaves.length == 0 ? (
          <div className="empty-search">
            <i className="fal fa-file-search fa-2xl"></i>
            <p className="mt-3"> No Such Leaves Found !!</p>
          </div>
        ) : (
          <div className="pagination p-2 mx-4 ">
            <div className="desc d-flex  align-items-center me-2">
              {startIndex + 1} - {endIndex} of {noOfLeaves}
            </div>
            {noOfLeaves > 10 &&
              renderPagination(page, totalPages, handlePageClick)}
          </div>
        )}
      </div>
    </>
  );
};

export default ListLeave;
