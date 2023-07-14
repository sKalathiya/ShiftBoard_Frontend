import { useState } from "react";

import { useUpdateDepartment } from "../../Hooks/useDepartmentData";
import { checkDepartmentUpdate } from "../../../Utils/checkData";
import { notify } from "../../../Utils/Notification/Notification";

const UpdateDepartment = ({ department }) => {
  //Opening and closing
  const [isOpen, setIsOpen] = useState(false);

  //State for update
  const [formData, setFormData] = useState({
    head: "Sahil",
    email: department.email,
    departmentName: department.name,
  });

  //function for updating department
  const {
    isLoading,
    isError,
    error,
    data: status,
    mutate: updateDepartment,
    reset,
  } = useUpdateDepartment(department.departmentId);

  //handling states of the request

  if (isError) {
    reset();
    notify(error.message, "E");
  }
  if (status?.data?.operationStatus === "Success") {
    reset();
    notify("Department Updated", "S");
    setIsOpen(false);
  } else if (status?.data?.operationStatus === "Failure") {
    reset();
    notify(status?.data?.failureReason, "E");
    setIsOpen(false);
  }

  //handle change of the update
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const input_Error = checkDepartmentUpdate(formData);
    console.log(input_Error);
    if (input_Error === "")
      updateDepartment({
        ...department,

        email: formData.email,
        name: formData.departmentName,
      });
    else alert(input_Error);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn p-0 end"
        title="Update Department"
      >
        <i className="fas fa-edit fa-xl "></i>
      </button>
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

            <div className="component-container-body">
              <form
                onSubmit={handleSubmit}
                className="grid-container-col1 form-outline"
              >
                <h2>Update Department</h2>

                <span>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="departmentName"
                    name="departmentName"
                    required
                    value={formData.departmentName}
                    onChange={handleChange}
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
                  />
                </span>
                <span>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </span>

                {isLoading ? (
                  <button className="btn" id="blackBg" disabled>
                    <i className="fas fa-circle-notch fa-spin"></i>
                  </button>
                ) : (
                  <button className="btn" id="blackBg" type="submit">
                    <i className="fas fa-edit  "></i> Update
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

export default UpdateDepartment;
