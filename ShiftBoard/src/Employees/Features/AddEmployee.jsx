import { useState } from "react";
import { useAllDepartmentsData } from "../../Departments/Hooks/useDepartmentData";
import Loading from "../../Utils/Loading";

import { checkEmployeeData } from "../../Utils/checkData";
import { useAddEmployee } from "../Hooks/useEmployeeData";
import { notify } from "../../Utils/Notification/Notification";

const AddEmployee = () => {
  //Opening and closing
  const [isOpen, setIsOpen] = useState(false);

  //creating a state to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    lastName: "",
    contactNumber: "",
    externalId: "",
    departmentId: -1,
    city: "",
    street: "",
    state: "",
    country: "",
    zip_code: "",
  });

  //Adding employee
  const {
    data: status,
    mutate: addEmployee,
    isLoading: addLoading,
    isError: addIsError,
    error: addError,
    reset,
  } = useAddEmployee();

  //getting all departments
  const { isError, error, isLoading, data } = useAllDepartmentsData();

  //handling all state of the request adding
  if (addIsError) {
    alert(addError.message);
  }

  //if operation successful navigate
  if (status?.data?.operationStatus === "Success") {
    reset();
    notify("Employee Added", "S");
    setFormData({
      firstName: "",
      email: "",
      lastName: "",
      contactNumber: "",
      externalId: "",
      departmentId: -1,
      city: "",
      street: "",
      state: "",
      country: "",
      zip_code: "",
    });
    setIsOpen(false);
  } else if (status?.data?.operationStatus === "Failure") {
    reset();
    notify(status?.data?.failureReason, "E");
  }

  //handling all state of the request department
  if (isLoading) return <Loading count={3} />;
  if (isError) {
    alert(error.message);
  }

  //departments
  const departments = data?.data?.data;

  //handle change in value of input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //handle dropdown
  const handleDropdownChange = (e) => {
    setFormData({ ...formData, departmentId: e.target.value });
  };

  //creating a final data to send to Server
  const finalData = {
    firstName: formData.firstName,
    email: formData.email,
    lastName: formData.lastName,
    contactNumber: formData.contactNumber,
    id: formData.externalId,
    departmentId: formData.departmentId,
    address: {
      city: formData.city,
      street: formData.street,
      country: formData.country,
      state: formData.state,
      zipCode: formData.zip_code,
    },
  };

  //handle submit data
  const handleSubmit = (event) => {
    event.preventDefault();

    const input_Error = checkEmployeeData(formData);

    if (input_Error === "") addEmployee(finalData);
    else alert(input_Error);
  };

  //HTML
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn px-3 end"
        id="blackBg"
        title="Add Employee"
      >
        <i class="fas fa-plus-circle"></i> Add
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
            <p className="modal-heading">Add Employee</p>

            <div className="component-container-body modal-body">
              <form
                onSubmit={handleSubmit}
                className="grid-container-col1 form-outline "
              >
                <div className="grid-container-col2">
                  <span>
                    <label htmlFor="externalId">External Id:</label>
                    <input
                      type="text"
                      id="externalId"
                      name="externalId"
                      value={formData.externalId}
                      required
                      onChange={handleChange}
                    />
                  </span>
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
                    <label htmlFor="lastName">LastName:</label>
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
                    <label>Department:</label>

                    <select
                      value={formData.departmentId}
                      onChange={handleDropdownChange}
                      required
                    >
                      {departments.map((department) => {
                        return (
                          <option
                            key={department.departmentId}
                            value={department.departmentId}
                          >
                            {department.name}
                          </option>
                        );
                      })}
                    </select>
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
                  <span>
                    <label htmlFor="state">State:</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </span>
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
                </div>

                {addLoading ? (
                  <button className="btn" id="blackBg" disabled>
                    <i className="fas fa-circle-notch fa-spin"></i>
                  </button>
                ) : (
                  <button className="btn my-4" id="blackBg" type="submit">
                    <i class="fas fa-plus-circle"></i> Add Employee
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

export default AddEmployee;
