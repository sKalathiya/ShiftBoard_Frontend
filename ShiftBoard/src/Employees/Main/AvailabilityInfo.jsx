import React from "react";
import { useAvailabilityDataFromEmployeeId } from "../Hooks/useEmployeeData";
import Loading from "../../Utils/Loading";

const AvailabilityInfo = ({ id: employeeId }) => {
  const { isLoading, isError, error, data } =
    useAvailabilityDataFromEmployeeId(employeeId);
  if (isLoading) return <Loading count={5} />;

  if (isError) {
    alert(error.message);
    return;
  }

  if (typeof data === "undefined") return <Error />;

  //getting Employee from data
  const availabilities = data?.data?.data;
  let nothing = false;
  if (availabilities.length == 0) {
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
            onClick={() => navigate("/availabilities/" + employeeId)}
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
        {availabilities.map((availability) => {
          return (
            <div
              className="grid-container-col5 border-bottom data-list p-2"
              key={availability.day}
            >
              <h2 data-label="Day:">{availability.day}</h2>

              <h2 data-label="Start Time:">{availability.startTime}</h2>
              <h2 data-label="End Time:">{availability.endTime}</h2>
              <h2 data-label="Reason:">{availability.reason}</h2>
              {availability.state === "APPROVED" ? (
                <h2 data-label="Status:">
                  <i class="fa-solid fa-circle-check"></i> {availability.state}
                </h2>
              ) : (
                <h2 data-label="Status:">
                  <i class="fa-solid fa-circle-xmark"></i> {availability.state}
                </h2>
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

export default AvailabilityInfo;
