import React, { useState } from "react";
import { useDeleteSchedule } from "../Hooks/useScheduleData";
import { notify } from "../../Utils/Notification/Notification";
const RemoveSchedule = ({ shift, employeeId }) => {
  //function for updating department
  const {
    isLoading,
    isError,
    error,
    data: status,
    mutate: deleteSchedule,
    reset,
  } = useDeleteSchedule(employeeId);

  //handling states of the request

  if (isError) {
    reset();
    notify(error.message, "E");
  }
  if (status?.data?.operationStatus === "Success") {
    reset();
    notify("Shift Removed", "S");
    setIsOpen(false);
  } else if (status?.data?.operationStatus === "Failure") {
    reset();
    notify(status?.data?.failureReason, "E");
  }

  const handleDelete = (event) => {
    if (window.confirm("Remove the Shift from " + shift.date + " ?")) {
      deleteSchedule({ employeeId, date: shift.date });
    }
  };
  return (
    <>
      {isLoading ? (
        <button className="btn p-0 mb-3" disabled>
          <i className="fas fa-circle-notch fa-spin"></i>
        </button>
      ) : (
        <button
          onClick={handleDelete}
          className="btn p-0 mb-3 decline"
          title="Remove Shift"
        >
          <i className="fa-solid fa-circle-minus fa-lg"></i>
        </button>
      )}
    </>
  );
};

export default RemoveSchedule;
