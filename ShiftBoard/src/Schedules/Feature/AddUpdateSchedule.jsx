import React, { useState } from "react";
import { useAddSchedule } from "../Hooks/useScheduleData";
import { checkScheduleData } from "../../Utils/checkData";
import { notify } from "../../Utils/Notification/Notification";
const AddUpdateSchedule = ({ shift, employeeId, update }) => {
  //State for add
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
  });

  //Opening and closing
  const [isOpen, setIsOpen] = useState(false);

  //function for updating department
  const {
    isLoading,
    isError,
    error,
    data: status,
    mutate: addSchedule,
    reset,
  } = useAddSchedule(employeeId);

  //handling states of the request

  if (isError) {
    reset();
    notify(error.message, "E");
  }
  if (status?.data?.operationStatus === "Success") {
    reset();
    if (update) notify("Shift Updated", "S");
    else notify("Shift Added", "S");
    setIsOpen(false);
  } else if (status?.data?.operationStatus === "Failure") {
    reset();
    notify(status?.data?.failureReason, "E");
  }

  //handle change of the update
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const input_Error = checkScheduleData(formData);

    if (input_Error === "")
      addSchedule({
        employeeId,
        date: shift.date,
        data: {
          ...formData,
        },
      });
    else alert(input_Error);
  };
  return (
    <>
      {!update ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn p-0 mx-1 accept "
          title="Add Shift"
        >
          <i className="fa-solid fa-circle-plus fa-lg"></i>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="btn p-0 mx-1"
          title="Update Shift"
        >
          <i className="fas fa-edit  fa-lg"></i>
        </button>
      )}
      {isOpen && (
        <div className="modal-container">
          <div className="modal-main component-container ">
            <div className="component-container-header">
              <span></span>
              <button
                type="button"
                className="btn-close end"
                onClick={() => setIsOpen(false)}
              ></button>
            </div>
            {update ? (
              <p className="modal-heading">Update Shift</p>
            ) : (
              <p className="modal-heading">Add Shift</p>
            )}

            <div className="component-container-body modal-body">
              <form
                onSubmit={handleSubmit}
                className="grid-container-col2 form-outline"
              >
                <span>
                  <label htmlFor="date">Date:</label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    required
                    value={shift.date}
                    disabled
                  />
                </span>
                <span>
                  <label htmlFor="day">Day:</label>
                  <input
                    type="text"
                    id="day"
                    name="day"
                    required
                    value={shift.day}
                    disabled
                  />
                </span>
                <span>
                  <label htmlFor="startTime">Start Time:</label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    step="1"
                    value={FormData.startTime}
                    onChange={handleChange}
                    required
                  />
                </span>
                <span>
                  <label htmlFor="endTime">End Time:</label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    step="1"
                    value={FormData.endTime}
                    onChange={handleChange}
                    required
                  />
                </span>

                {isLoading ? (
                  <button className="btn" id="blackBg" disabled>
                    <i className="fas fa-circle-notch fa-spin"></i>
                  </button>
                ) : (
                  <>
                    {update ? (
                      <button className="btn" id="blackBg" type="submit">
                        <i className="fas fa-edit "></i> Update Shift
                      </button>
                    ) : (
                      <button className="btn" id="blackBg" type="submit">
                        <i className="fa-solid fa-circle-plus cursor"></i> Add
                        Shift
                      </button>
                    )}
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUpdateSchedule;
