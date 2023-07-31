import React from "react";
import { useNavigate } from "react-router-dom";
import { useAllEmployeesForTodayData } from "../Hooks/useDashboardData";
import { formatDateToYYYYMMDD } from "../../Utils/checkData";
const WhosOn = () => {
  const navigate = useNavigate();
  const today = formatDateToYYYYMMDD(new Date());
  const { isLoading, data, error, isError } =
    useAllEmployeesForTodayData(today);

  const s = data?.data?.data;
  return (
    <>
      <p className="heading">Who's On {today}</p>
      <div className="grid-container-col1 border p-4">
        <div className="grid-container-col4 border-bottom p-2" id="headList">
          <label htmlFor="employeeId">Employee Id</label>

          <label htmlFor="startTime">Start Time</label>
          <label htmlFor="endTime">End Time</label>
          <label htmlFor="Hours">Hours</label>
        </div>
        {!isLoading &&
          Object.keys(s).map((key) => {
            return (
              <div
                className="grid-container-col4 border-bottom data-list p-2"
                key={key}
              >
                <h2
                  data-label="Employee Id:"
                  onClick={() => navigate("/employees/" + key)}
                >
                  <a className="link-primary view">{key}</a>
                </h2>

                <h2 data-label="Start Time:">{s[key].startTime}</h2>
                <h2 data-label="End Time:">{s[key].endTime}</h2>
                <h2 data-label="Hours:">{s[key].totalHour}</h2>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default WhosOn;
