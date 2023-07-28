import React from "react";
import { useScheduleBiweeklyData } from "../Hooks/useScheduleData";
import Loading from "../../Utils/Loading";
import { formatAndSortData } from "../../Utils/checkData";
import AddUpdateSchedule from "../Feature/AddUpdateSchedule";
import RemoveSchedule from "../Feature/RemoveSchedule";

const WeekSchedule = ({ id }) => {
  const { isLoading, isError, error, data } = useScheduleBiweeklyData(id);
  if (isLoading) return <Loading count={5} />;

  if (isError) {
    alert(error.message);
    return;
  }
  const s = data?.data?.data;
  const schedule = formatAndSortData(s);

  //HTMl
  return (
    <div className="component-container">
      <span className="component-container-header">
        <p className="heading">Week Schedule</p>
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
                  {shift.day + " "}
                  {shift.expired ? (
                    <></>
                  ) : (
                    <>
                      {shift.scheduleId != -1 ? (
                        <AddUpdateSchedule
                          shift={shift}
                          employeeId={id}
                          update={true}
                        />
                      ) : (
                        <AddUpdateSchedule
                          shift={shift}
                          employeeId={id}
                          update={false}
                        />
                      )}
                    </>
                  )}
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
                    {shift.expired ? (
                      <>
                        <center className="mb-3">
                          Hours: {shift.totalHour}
                        </center>
                      </>
                    ) : (
                      <>
                        <center className="mb-3">
                          Hours: {shift.totalHour}
                        </center>
                        <hr />
                        <center>
                          <RemoveSchedule shift={shift} employeeId={id} />
                        </center>
                      </>
                    )}
                  </>
                ) : (
                  <center className=" mb-3"> No Shift available</center>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekSchedule;
