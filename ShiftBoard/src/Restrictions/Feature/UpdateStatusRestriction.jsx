import React from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateRestrictionStatus } from "../Hooks/useRestrictionData";
import { notify } from "../../Utils/Notification/Notification";

const UpdateStatusRestriction = ({ employeeId, rId }) => {
  const navigate = useNavigate();

  const cursor = {
    cursor: "pointer",
  };

  //function for updating department
  const {
    isLoading,
    isError,
    error,
    data: status,
    mutate: updateRestrictionStatus,
    reset,
  } = useUpdateRestrictionStatus(employeeId);
  //handling states of the request

  if (isError) {
    reset();
    notify(error.message, "E");
  }
  if (status?.data?.operationStatus === "Success") {
    reset();
    notify("Status Changed!", "S");
  } else if (status?.data?.operationStatus === "Failure") {
    reset();
    notify(status?.data?.failureReason, "E");
  }

  //handleCLick
  const handleClick = (state) => {
    if (
      window.confirm("Change the status of the Restriction to " + state + " ?")
    ) {
      updateRestrictionStatus({ rId, state });
    }
  };
  return (
    <div className="btn-group" role="group">
      {isLoading ? (
        <button className="btn" id="blackBg" disabled>
          <i className="fas fa-circle-notch fa-spin"></i>
        </button>
      ) : (
        <button
          className="btn dropdown-toggle h-25"
          id="blackBg"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fa-solid fa-gear"></i> Pending
        </button>
      )}

      <div className="dropdown-menu">
        <span
          className="dropdown-item decline"
          style={cursor}
          name="DECLINED"
          onClick={() => handleClick("DECLINED")}
        >
          <i className="fa-solid fa-circle-xmark"></i> Decline
        </span>
        <span
          className="dropdown-item accept"
          style={cursor}
          name="APPROVED"
          onClick={() => handleClick("APPROVED")}
        >
          <i className="fa-solid fa-circle-check"></i> Approve
        </span>
      </div>
    </div>
  );
};

export default UpdateStatusRestriction;
