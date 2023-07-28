import React from "react";
import Loading from "../../Utils/Loading";
import { useNavigate } from "react-router-dom";
import AvailabilityInfo from "./AvailabilityInfo";
import { formatAndSortData } from "../../Utils/checkData";
import { useScheduleBiweeklyData } from "../../Schedules/Hooks/useScheduleData";
const ScheduleInfo = ({ id }) => {
  const navigate = useNavigate();
  const { isLoading, isError, error, data } = useScheduleBiweeklyData(id);
  if (isLoading) return <Loading count={5} />;

  if (isError) {
    alert(error.message);
    return;
  }
  const s = data?.data?.data;
  const schedule = formatAndSortData(s).slice(0, 7);

  return (
    <div className="component-container">
      <span className="component-container-header">
        <p className="heading">Schedule</p>

        <button
          className="btn p-0 end"
          title="View Schedule"
          onClick={() => navigate("/schedules/" + id)}
        >
          <i className="fas fa-external-link  fa-xl"></i>
        </button>
      </span>
      <div className="component-container-body">
        {" "}
        <div className="grid-container-col7 border p-4">
          {schedule.map((shift) => {
            return (
              <div
                className={
                  "border " + (!shift.expired ? "shift" : "past-content")
                }
                key={shift.date}
              >
                <span className="center mt-3 d-flex justify-content-center  fw-bold ">
                  {shift.day}
                </span>
                <hr />
                <center className="center">{shift.date}</center>
                <hr />
                {shift.scheduleId != -1 ? (
                  <>
                    <center className="grid-container-col1">
                      {shift.startTime} <i className="far fa-clock"></i>{" "}
                      {shift.endTime}
                    </center>
                    <hr />
                    <center className="mb-3">Hours: {shift.totalHour}</center>
                  </>
                ) : (
                  <center className=" mb-3"> No Shift available</center>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <AvailabilityInfo id={id} />
    </div>
  );
};

export default ScheduleInfo;
