import { useNavigate } from "react-router-dom";
import { notify } from "../../Utils/Notification/Notification";
import { useDeleteEmployee } from "../Hooks/useEmployeeData";
import { useState, useEffect } from "react";
import Loading from "../../Utils/Loading";

const DeleteEmployee = ({ id, departmentId }) => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [doNavigate, setDoNavigate] = useState(false);

  //After rendering
  useEffect(() => {
    if (doNavigate) navigate("/employees");
  }, [doNavigate]);

  //Form Handling
  const [inputData, setInputData] = useState("");
  const handleInputText = (e) => {
    setInputData(e.target.value);
  };

  //delete
  const {
    isLoading,
    isError,
    error,
    mutate: deleteEmployee,
    data,
    reset,
  } = useDeleteEmployee(departmentId);

  if (isError) {
    reset();
    notify(error.message, "E");
  }

  if (data?.data?.operationStatus === "Success") {
    reset();
    notify(`Employee ${id} Deleted`, "S");
    setDoNavigate(true);
    setConfirmDelete(false);
  } else if (data?.data?.operationStatus === "Failure") {
    reset();
    notify(data?.data?.failureReason, "E");
    setConfirmDelete(false);
  }

  //handle click for delete
  const handleDeleteClick = (e) => {
    e.preventDefault();
    if (inputData === id) {
      deleteEmployee(id);
    } else {
      setIsMatch(true);
    }
  };

  //HTML
  return (
    <>
      <button
        className="btn px-4"
        id="redBg"
        onClick={() => setConfirmDelete(true)}
        title="Delete Employee"
      >
        <i className="fas fa-trash-alt"></i>
      </button>
      {confirmDelete && (
        <div className="modal-container">
          <div className="modal-main component-container ">
            <div className="component-container-header">
              <span></span>
              <button
                type="button"
                className="btn-close end"
                onClick={() => setConfirmDelete(false)}
              ></button>
            </div>
            <h4>
              <b>Are you sure you want to delete this Employee?</b>
            </h4>
            <div className="component-container-body modal-body">
              <span>
                {isMatch && (
                  <div className="alert alert-danger p-1 my-2 " role="alert">
                    Employee ID Does not Match
                  </div>
                )}
                <input
                  type="text"
                  required
                  placeholder="Enter the id of the employee"
                  value={inputData}
                  onChange={handleInputText}
                />
              </span>

              {isLoading ? (
                <button className="btn" id="redBg" disabled>
                  <i className="fas fa-circle-notch fa-spin"></i>
                </button>
              ) : (
                <button
                  className="btn "
                  id="redBg"
                  role="button"
                  name="yes"
                  onClick={handleDeleteClick}
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEmployee;
