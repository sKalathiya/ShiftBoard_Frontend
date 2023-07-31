import React from "react";
import { useRestrictionDataFromEmployeeId } from "../Hooks/useEmployeeData";
import Loading from "../../Utils/Loading";

import { useNavigate } from "react-router-dom";
import UpdateStatusRestriction from "../../Restrictions/Feature/UpdateStatusRestriction";
import { formatTime } from "../../Utils/checkData";
const RestrictionInfo = ({ id: employeeId }) => {
  const navigate = useNavigate();
  const { isLoading, isError, error, data } =
    useRestrictionDataFromEmployeeId(employeeId);
  if (isLoading) return <Loading count={5} />;

  if (isError) {
    alert(error.message);
    return;
  }

  if (data?.data?.operationStatus === "Failure") return;

  //getting Employee from data
  const restrictions = data?.data?.data;
  let nothing = false;
  if (restrictions.length == 0) {
    nothing = true;
  }

  return (
    <>
      <span className="component-container-header mt-5">
        <p className="sub-heading">
          Restrictions{" "}
          <button
            className="btn p-0 end"
            title="View Restrictions"
            onClick={() => navigate("/restrictions")}
          >
            <i className="fas fa-external-link  "></i>
          </button>
        </p>
      </span>

      <div className="component-container-body border p-4">
        <div className="grid-container-col5 border-bottom p-2" id="headList">
          <label htmlFor="Day">Day</label>
          <label htmlFor="StartTime">Start Time</label>
          <label htmlFor="EndTime">End Time</label>
          <label htmlFor="Reason">Reason</label>
          <label htmlFor="Status">Status</label>
        </div>
        {restrictions.map((r) => {
          return (
            <div
              className="grid-container-col5 border-bottom data-list p-2"
              key={r.day}
            >
              <h2 data-label="Day:">{r.day}</h2>

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
        {nothing && (
          <div className="empty-search">
            <i class="fal fa-file-search fa-2xl"></i>
            <p className="mt-3"> No Restrictions !!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RestrictionInfo;
