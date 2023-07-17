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

export const checkEmployeeUpdate = (employee) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let inputError = "";
  if (!re.test(employee.email)) {
    inputError = inputError + "Not a valid email.  ";
  }
  if (employee.contactNumber.length !== 12) {
    inputError = inputError + "Contact Number is not valid.  ";
  }
  if (employee.zip_code.length < 6) {
    inputError = inputError + "Zip Code is not valid.  ";
  }
  return inputError === "" ? "" : inputError;
};

export const CheckEmployeeWithFilter = (employee, filter) => {
  if (filter.department != 0) {
    if (employee.departmentId != filter.department) return false;
  }

  if (!employee.firstName.includes(filter.firstName)) return false;

  if (filter.email != "") if (employee.email != filter.email) return false;

  if (filter.eId != "") if (employee.id != filter.eId) return false;

  return true;
};

export const CheckDepartmentWithFilter = (department, filter) => {
  if (!department.name.includes(filter.name)) return false;

  if (filter.email != "") if (department.email != filter.email) return false;

  if (filter.dId != "") if (department.departmentId != filter.dId) return false;

  return true;
};
