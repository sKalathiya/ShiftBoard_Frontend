import React, { useState } from "react";
import { useUpdateEmployee } from "../Hooks/useEmployeeData";
import { checkEmployeeUpdate } from "../../Utils/checkData";
import { notify } from "../../Utils/Notification/Notification";
const UpdateEmployee = ({ employee }) => {
  //Opening and closing
  const [isOpen, setIsOpen] = useState(false);
  //creating a state to store form data
  const [formData, setFormData] = useState({
    firstName: employee.firstName,
    email: employee.email,
    lastName: employee.lastName,
    contactNumber: employee.contactNumber,
    city: employee.address.city,
    street: employee.address.street,
    state: employee.address.state,
    country: employee.address.country,
    zip_code: employee.address.zipCode,
  });

  //function for updating employee
  const {
    isLoading,
    isError,
    error,
    data: status,
    mutate: updateEmployee,
    reset,
  } = useUpdateEmployee(employee.id);

  //handling states of the request
  console.log(status);

  if (isError) {
    reset();
    notify(error.message, "E");
  }
  if (status?.data?.operationStatus === "Success") {
    reset();
    notify("Employee Updated", "S");
    setIsOpen(false);
  } else if (status?.data?.operationStatus === "Failure") {
    reset();
    notify(status?.data?.failureReason, "E");
    setIsOpen(false);
  }

  //handle change in value of input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const input_Error = checkEmployeeUpdate(formData);
    console.log(input_Error);
    if (input_Error === "")
      updateEmployee({
        ...employee,

        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        address: {
          city: formData.city,
          street: formData.street,
          state: formData.state,
          country: formData.country,
          zipCode: formData.zip_code,
        },
      });
    else alert(input_Error);
  };

  //HTML
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn p-0 end"
        title="Update Employee"
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
                <h2>Update Employee</h2>

                <div className="grid-container-col2">
                  <span>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </span>
                  <span>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
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
                    />
                  </span>
                  <span>
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      required
                      value={formData.contactNumber}
                      onChange={handleChange}
                    />
                  </span>

                  <span>
                    <label htmlFor="street">Street:</label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleChange}
                    />
                  </span>
                  <span>
                    <label htmlFor="city">City:</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </span>
                  <span className="grid-container-col2">
                    <span>
                      <label htmlFor="country">Country:</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </span>
                    <span>
                      <label htmlFor="zip_code">Zip Code:</label>
                      <input
                        type="text"
                        id="zip_code"
                        name="zip_code"
                        required
                        value={formData.zip_code}
                        onChange={handleChange}
                      />
                    </span>
                  </span>
                  {isLoading ? (
                    <button className="btn" id="blackBg" disabled>
                      <i className="fas fa-circle-notch fa-spin"></i>
                    </button>
                  ) : (
                    <button className="btn my-4" id="blackBg" type="submit">
                      <i className="fas fa-edit  "></i> Update
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateEmployee;
