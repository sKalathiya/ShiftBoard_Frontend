import React from "react";
import { useScheduleDataFromEmployeeId } from "../Hooks/useEmployeeData";
import Loading from "../../Utils/Loading";
import AvailabilityInfo from "./AvailabilityInfo";
const ScheduleInfo = ({ id }) => {
  var date = new Date(new Date().valueOf() - 86400000)
    .toISOString()
    .substring(0, 10);
  const { isLoading, isError, error, data } = useScheduleDataFromEmployeeId(id);
  if (isLoading) return <Loading count={5} />;

  if (isError) {
    alert(error.message);
    return;
  }

  if (typeof data === "undefined") return <Error />;

  //getting Employee from data
  const s = data?.data.data;

  return (
    <div className="component-container">
      <span className="component-container-header">
        <p className="heading">Schedule</p>

        <button className="btn p-0 end" title="View Schedule">
          <i className="fas fa-external-link  fa-xl"></i>
        </button>
      </span>

      <div className="component-container-body">
        <div className="grid-container-col7 border p-4">
          {Object.keys(s).map((key, index) => {
            return (
              <div className="border p-4" key={index}>
                <center className="center">{key}</center>
                <hr />

                {s[key] !== null ? (
                  <>
                    <center className="grid-container-col1">
                      {s[key].startTime} <i className="far fa-clock"></i>{" "}
                      {s[key].endTime}
                    </center>
                    <hr />
                    <center>Hours: {s[key].totalHour}</center>
                  </>
                ) : (
                  <center className="py-2"> No Shift available</center>
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
