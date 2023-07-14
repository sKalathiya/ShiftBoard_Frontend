export const checkEmployeeData = (employee) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let inputError = "";

  if (!re.test(employee.email)) {
    inputError = inputError + "Not a valid email.  ";
  }
  if (isNaN(+employee.id)) {
    inputError = inputError + "Id should always be numbers.  ";
  }

  if (isNaN(+employee.contactNumber) || employee.contactNumber.length !== 11) {
    inputError = inputError + "Contact Number is not valid.  ";
  }
  console.log("In");
  return inputError === "" ? "" : inputError;
};

export const checkDepartmentUpdate = (department) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let inputError = "";
  if (!re.test(department.email)) {
    inputError = inputError + "Not a valid email.  ";
  }
  return inputError === "" ? "" : inputError;
};
