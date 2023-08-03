import { useState } from "react";
import { renderPagination } from "../../Utils/Pagination.jsx";
import "./ListRestriction.css";

import { useNavigate } from "react-router-dom";
import UpdateStatusRestriction from "../Feature/UpdateStatusRestriction";
import { formatTime } from "../../Utils/checkData";

const ListRestriction = ({ restrictions }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("A");
  const aRestrictions = restrictions.filter((r) => r.state == "APPROVED");
  const dRestrictions = restrictions.filter((r) => r.state == "DECLINED");
  const pRestrictions = restrictions.filter((r) => r.state == "PENDING");
  const [selectedRestrictions, setSelectedRestrictions] = useState([
    ...aRestrictions,
  ]);

  //Handle Selected
  const handleSelected = (e) => {
    const name = e.target.name;

    if (selected == e.target.name) return;

    if (name == "A") {
      setSelectedRestrictions([...aRestrictions]);
      setSelected("A");
    }
    if (name == "D") {
      setSelectedRestrictions([...dRestrictions]);
      setSelected("D");
    }
    if (name == "P") {
      setSelectedRestrictions([...pRestrictions]);
      setSelected("P");
    }
  };

  //pagination
  const [page, setPage] = useState(1);
  const noOfRestrictions = selectedRestrictions.length;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(noOfRestrictions / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, noOfRestrictions);
  const list = selectedRestrictions.slice(startIndex, endIndex);

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
            <span className="badge bg-secondary">{aRestrictions.length}</span>
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
            <span className="badge bg-secondary">{dRestrictions.length}</span>
          </a>
          <a
            htmlFor="Pending"
            className={
              (selected == "P" ? "isActive " : "") + "border p-4 fw-bold "
            }
            name="P"
            onClick={handleSelected}
          >
            Pending{" "}
            <span className="badge bg-secondary">{pRestrictions.length}</span>
          </a>
        </div>
        <div
          className="grid-container-col6 border-bottom p-2 mx-4"
          id="headList"
        >
          <label htmlFor="Employee ID">Employee Id</label>
          <label htmlFor="Day">Day</label>
          <label htmlFor="StartTime">StartTime</label>
          <label htmlFor="EndTime">EndTime</label>
          <label htmlFor="Reason">Reason</label>
          <label htmlFor="State">State</label>
        </div>

        {selectedRestrictions.map((r) => {
          return (
            <div
              className="grid-container-col6 border-bottom data-list p-2 mx-4"
              key={r.availableId}
            >
              <h2
                onClick={() => navigate("/employees/" + r.employeeId)}
                data-label="Employee:"
              >
                <a className="link-primary view">{r.employeeId}</a>
              </h2>

              <h2 data-label="Date:">{r.day}</h2>
              <h2 data-label="Start Time:">{formatTime(r.startTime)}</h2>
              <h2 data-label="End Time:">{formatTime(r.endTime)}</h2>
              <h2 data-label="Reason:">{r.reason}</h2>

              {r.state === "APPROVED" && (
                <h2 data-label="Status:">
                  <span className="badge bg-success rounded-pill ">
                    <i className="fa-solid fa-circle-check"></i> {r.state}
                  </span>
                </h2>
              )}
              {r.state === "DECLINED" && (
                <h2 data-label="Status:">
                  <span className="badge bg-danger rounded-pill">
                    <i className="fa-solid fa-circle-xmark"></i> {r.state}
                  </span>
                </h2>
              )}
              {r.state == "PENDING" && (
                <UpdateStatusRestriction
                  rId={r.availableId}
                  employeeId={r.employeeId}
                />
              )}
            </div>
          );
        })}

        {selectedRestrictions.length == 0 ? (
          <div className="empty-search">
            <i className="fal fa-file-search fa-2xl"></i>
            <p className="mt-3"> No Such Restrictions Found !!</p>
          </div>
        ) : (
          <div className="pagination p-2 mx-4 ">
            <div className="desc d-flex  align-items-center me-2">
              {startIndex + 1} - {endIndex} of {noOfRestrictions}
            </div>
            {noOfRestrictions > 10 &&
              renderPagination(page, totalPages, handlePageClick)}
          </div>
        )}
      </div>
    </>
  );
};

export default ListRestriction;
