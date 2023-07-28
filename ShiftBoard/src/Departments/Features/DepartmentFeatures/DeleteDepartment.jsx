import { useNavigate } from "react-router-dom";
import { useDeleteDepartment } from "../../Hooks/useDepartmentData";
import { notify } from "../../../Utils/Notification/Notification";

import { useState, useEffect } from "react";

const DeleteDepartment = ({ id, departmentName }) => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [doNavigate, setDoNavigate] = useState(false);

  //After rendering
  useEffect(() => {
    if (doNavigate) navigate("/departments");
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
    mutate: deleteDepartment,
    data,
    reset,
  } = useDeleteDepartment();

  if (isError) {
    reset();
    notify(error.message, "E");
  }

  if (data?.data?.operationStatus === "Success") {
    reset();
    notify(`Department ${id} Deleted`, "S");
    setDoNavigate(true);
    setConfirmDelete(false);
  } else if (data?.data?.operationStatus === "Failure") {
    reset();
    notify(data?.data?.failureReason, "E");
  }

  //handle click for delete
  const handleDeleteClick = (e) => {
    e.preventDefault();
    if (inputData === departmentName) {
      deleteDepartment(id);
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
        title="Delete Department"
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
              <b>Are you sure you want to delete this Department?</b>
            </h4>
            <div className="component-container-body modal-body">
              <span>
                {isMatch && (
                  <div className="alert alert-danger p-1 my-2 " role="alert">
                    Department Name Does not Match
                  </div>
                )}
                <input
                  type="text"
                  required
                  placeholder="Enter the name of department"
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

export default DeleteDepartment;
