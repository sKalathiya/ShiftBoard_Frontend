import React, { useState } from "react";
import Loading from "../../Utils/Loading";
import { useNavigate } from "react-router-dom";
import { useRestrictionByEmployeeData } from "../Hooks/useScheduleData";

const ApprovedRestriction = ({ id }) => {
  const navigate = useNavigate();
  const { isLoading, isError, error, data } = useRestrictionByEmployeeData(id);

  if (isLoading) {
    return (
      <div className="list">
        <Loading count={5} />
      </div>
    );
  }

  if (isError) {
    alert(error.message);
    return;
  }

  //data
  const aRestrictions = data?.data?.data.filter((r) => r.state == "APPROVED");

  //HTML
  return (
    <div className="component-container">
      <span className="component-container-header">
        <p className="heading">Approved Restriction</p>
        <button
          className="btn p-0 end"
          title="View Restrictions"
          onClick={() => navigate("/restrictions")}
        >
          <i className="fas fa-external-link fa-xl  "></i>
        </button>
      </span>

      <div className="component-container-body">
        <div className="grid-container-col1 pb-4 border">
          <div
            className="grid-container-col5 border-bottom p-2 mx-4"
            id="headList"
          >
            <label htmlFor="Day">Day</label>
            <label htmlFor="StartTime">StartTime</label>
            <label htmlFor="EndTime">EndTime</label>
            <label htmlFor="Reason">Reason</label>
            <label htmlFor="State">State</label>
          </div>

          {aRestrictions.map((r) => {
            return (
              <div
                className="grid-container-col5 border-bottom data-list p-2 mx-4"
                key={r.availableId}
              >
                <h2 data-label="Date:">{r.day}</h2>
                <h2 data-label="Start Time:">{r.startTime}</h2>
                <h2 data-label="End Time:">{r.endTime}</h2>
                <h2 data-label="Reason:">{r.reason}</h2>

                <h2 data-label="Status:" className="accept">
                  <i className="fa-solid fa-circle-check"></i> {r.state}
                </h2>
              </div>
            );
          })}

          {aRestrictions.length == 0 && (
            <div className="empty-search">
              <i className="fal fa-file-search fa-2xl"></i>
              <p className="mt-3"> No Approved Restrictions Found !!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovedRestriction;
