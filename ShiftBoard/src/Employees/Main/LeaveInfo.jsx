import React from "react";
import Loading from "../../Utils/Loading";
import { useNavigate } from "react-router-dom";
import { useLeaveDataFromEmployeeId } from "../Hooks/useEmployeeData";

const LeaveInfo = ({ id: employeeId }) => {
  const navigate = useNavigate();
  let more = false;

  const { isLoading, isError, error, data } =
    useLeaveDataFromEmployeeId(employeeId);
  if (isLoading) return <Loading count={5} />;

  if (isError) {
    alert(error.message);
    return;
  }

  if (typeof data === "undefined") return <Error />;

  //getting Employee from data
  const d = data?.data.data;
  let leaves;
  if (d.length > 3) {
    more = true;
    leaves = [d[0], d[1], d[2]];
  } else {
    leaves = [...d];
  }

  let nothing = false;
  if (leaves.length == 0) {
    nothing = true;
  }

  return (
    <>
      <div className="component-container">
        <span className="component-container-header">
          <h4>Leaves</h4>
          <button
            className="btn p-0 end"
            title="View Department"
            onClick={() => navigate("/leaves/" + departmentId)}
          >
            <i className="fas fa-external-link  fa-xl"></i>
          </button>
        </span>

        <div className="component-container-body border p-4">
          <div className="grid-container-col4 border-bottom p-2" id="headList">
            <label htmlFor="date">Date</label>
            <label htmlFor="category">Category</label>
            <label htmlFor="Reason">Reason</label>
            <label htmlFor="Status">Status</label>
          </div>
          {leaves.map((leave) => {
            return (
              <div
                className="grid-container-col4 border-bottom data-list p-2"
                key={leave.id}
              >
                <h2 data-label="Date:">{leave.date}</h2>
                <h2 data-label="Category:">{leave.category}</h2>
                <h2 data-label="Reason:">{leave.reason}</h2>
                <h2 data-label="Status:">{leave.state}</h2>
              </div>
            );
          })}
          {nothing && (
            <div className="empty-search">
              <i class="fal fa-file-search fa-2xl"></i>
              <p className="mt-3"> No Leaves !!</p>
            </div>
          )}
          {more && (
            <button className="btn" id="whiteBg">
              View All <i className="fas fa-external-link  "></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaveInfo;
