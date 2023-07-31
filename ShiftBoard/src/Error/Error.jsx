import React from "react";

const Error = ({ message }) => {
  return (
    <center>
      <i className="fa-solid fa-triangle-exclamation fa-xl mb-3"></i> {message}{" "}
      Please Try again!
    </center>
  );
};

export default Error;
