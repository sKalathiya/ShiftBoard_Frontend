import React, { useState } from "react";
import { notify } from "../../../Utils/Notification/Notification";
import { useAddDepartment } from "../../Hooks/useDepartmentData";
import { checkDepartmentData } from "../../../Utils/checkData";

const AddDepartment = () => {
  //Opening and closing
  const [isOpen, setIsOpen] = useState(false);

  //creating a state to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    head: "",
    employeesId: [],
  });

  //Adding department
  const {
    data: status,
    mutate: addDepartment,
    isLoading,
    isError,
    error,
    reset,
  } = useAddDepartment();

  //handling all state of the request adding
  if (isError) {
    alert(error.message);
  }
  //if operation successful navigate
  if (status?.data?.operationStatus === "Success") {
    reset();
    notify("Department Added", "S");
    setFormData({
      name: "",
      email: "",
      head: "",
      employeesId: [],
    });
    setIsOpen(false);
  } else if (status?.data?.operationStatus === "Failure") {
    reset();
    notify(status?.data?.failureReason, "E");
  }

  //handle change in value of input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //handle submit data
  const handleSubmit = (event) => {
    event.preventDefault();

    const input_Error = checkDepartmentData(formData);

    if (input_Error === "") addDepartment(formData);
    else alert(input_Error);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn px-3 end"
        id="blackBg"
        title="Add Department"
      >
        <i className="fas fa-plus-circle"></i> Add
      </button>
      {isOpen && (
        <div className="modal-container">
          <div className="modal-main component-container ">
            <div className="component-container-header ">
              <span></span>
              <button
                type="button"
                className="btn-close end"
                onClick={() => setIsOpen(false)}
              ></button>
            </div>
            <p className="modal-heading">Add Department</p>

            <div className="component-container-body modal-body">
              <form
                onSubmit={handleSubmit}
                className="grid-container-col1 form-outline "
              >
                <div className="grid-container-col2">
                  <span>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter the Name of Department."
                    />
                  </span>

                  <span>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      id="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter the Email of Department."
                    />
                  </span>

                  <span>
                    <label htmlFor="head">Head:</label>
                    <input
                      type="text"
                      id="head"
                      name="head"
                      required
                      value={formData.head}
                      onChange={handleChange}
                      placeholder="Enter the Head of Department."
                    />
                  </span>
                </div>

                {isLoading ? (
                  <button className="btn" id="blackBg" disabled>
                    <i className="fas fa-circle-notch fa-spin"></i>
                  </button>
                ) : (
                  <button className="btn my-4" id="blackBg" type="submit">
                    <i className="fas fa-plus-circle"></i> Add Department
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddDepartment;
